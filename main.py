from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import redis
import json
import torch
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer
from pydantic import BaseModel
from typing import List, Dict, Optional
import re
from datetime import datetime

# Initialize FastAPI
app = FastAPI()

# MongoDB Connection
MONGO_URI = "mongodb+srv://digicraftone:nJ9NLFEck3ARsG1K@cluster0.gkzmb.mongodb.net/Data"
client = MongoClient(MONGO_URI)
db = client["Data"]
students_col = db["studentdatas"]

# Redis Cache Setup
redis_client = redis.Redis(
    host='redis-19338.c11.us-east-1-2.ec2.redns.redis-cloud.com',
    port=19338,
    db=0,
    password='vCLw68YuODaTyF9hdSZTjnT5GINsXRxT'
)

# Load Sentence Transformer for embeddings
embedding_model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

# Load FAISS for vector search
vector_dim = 768  # MPNet dimension
index = faiss.IndexFlatL2(vector_dim)
student_vectors = []
student_data = []

# Load a more suitable model for education domain
model_name = "google/flan-t5-large"  # Better for Q&A tasks
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
qa_pipeline = pipeline(
    "text2text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=512,
    temperature=0.7
)

# Branch codes mapping
BRANCH_CODES = {
    "CS": "COMPUTER SCIENCE AND ENGINEERING",
    "EC": "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "EE": "ELECTRICAL ENGINEERING",
    "ME": "MECHANICAL ENGINEERING",
    # Add more branch codes as needed
}

# Query type classification
QUERY_TYPES = {
    "academic": ["sgpa", "cgpa", "grade", "marks", "score", "semester", "result", "performance", "subject", "course"],
    "personal": ["name", "father", "branch", "roll", "details", "information"],
    "comparison": ["compare", "better", "highest", "lowest", "top", "bottom", "rank", "versus", "vs", "between"],
    "temporal": ["improvement", "progress", "trend", "history", "change", "growth", "decline"],
    "subject_specific": ["failed", "pass", "backlog", "attendance", "project", "lab", "theory"],
    "statistical": ["average", "mean", "median", "distribution", "percentage", "percentile"]
}

# Add after QUERY_TYPES dictionary
RANKING_KEYWORDS = ["top", "best", "highest", "rankers", "rank"]

class QueryRequest(BaseModel):
    user_query: str
    reg_no: Optional[str] = None
    context: Optional[Dict] = None

class QueryContext:
    def __init__(self):
        self.history: List[Dict] = []
        self.max_history = 5
    
    def add_query(self, query: str, reg_no: str, response: str):
        self.history.append({
            "timestamp": datetime.now(),
            "query": query,
            "reg_no": reg_no,
            "response": response
        })
        if len(self.history) > self.max_history:
            self.history.pop(0)
    
    def get_context(self, reg_no: str) -> List[Dict]:
        return [h for h in self.history if h["reg_no"] == reg_no]

query_context = QueryContext()

def classify_query(query: str) -> List[str]:
    query = query.lower()
    query_types = []
    
    # Check for complex patterns
    if re.search(r"(?:how|what).*(?:perform|do).*(?:semester|sem)", query):
        query_types.append("academic")
    if re.search(r"(?:better|worse).*than", query):
        query_types.append("comparison")
    if re.search(r"(?:improve|change).*(?:over|since|from)", query):
        query_types.append("temporal")
        
    # Keyword based classification
    for qtype, keywords in QUERY_TYPES.items():
        if any(keyword in query for keyword in keywords):
            query_types.append(qtype)
            
    return list(set(query_types)) or ["general"]

def parse_roll_number(roll_no: str) -> Dict[str, str]:
    if not roll_no or len(roll_no) != 10:
        return None
    
    try:
        return {
            "batch": roll_no[:4],
            "program": roll_no[4:6],
            "branch": roll_no[6:8],
            "number": roll_no[8:]
        }
    except:
        return None

def get_semester_data(student_data: Dict, semester: str = None) -> Dict:
    if not semester:
        return student_data.get("marksData", {})
    return student_data.get("marksData", {}).get(semester, [])

def get_top_students(semester: str, branch: str = None, limit: int = 5) -> List[Dict]:
    query = {}
    if branch:
        query["Branch"] = BRANCH_CODES.get(branch.upper(), branch.upper())
    
    # Create the semester key for resultData
    sem_key = f"Sem {semester}" if not semester.startswith("Sem") else semester
    
    # Project only necessary fields
    projection = {
        "Roll No": 1,
        "Name": 1,
        "Branch": 1,
        f"resultData.{sem_key}": 1
    }
    
    # Fetch all matching students
    students = list(students_col.find(query, projection))
    
    # Filter students who have the required semester data and sort by SGPA
    valid_students = []
    for student in students:
        if "resultData" in student and sem_key in student["resultData"]:
            sgpa = float(student["resultData"][sem_key]["SGPA"])
            valid_students.append({
                "Roll No": student["Roll No"],
                "Name": student["Name"],
                "Branch": student["Branch"],
                "SGPA": sgpa
            })
    
    # Sort by SGPA in descending order and get top N
    ranked_students = sorted(valid_students, key=lambda x: x["SGPA"], reverse=True)[:limit]
    return ranked_students

def parse_ranking_query(query: str) -> Dict:
    """Parse ranking related queries to extract parameters."""
    query = query.lower()
    
    # Extract number of results
    limit = 5  # default
    number_match = re.search(r"top\s+(\d+)", query)
    if number_match:
        limit = int(number_match.group(1))
    
    # Extract semester
    semester = "1"  # default
    sem_match = re.search(r"(\d+)(?:st|nd|rd|th)?\s*sem(?:ester)?", query)
    if sem_match:
        semester = sem_match.group(1)
    
    # Extract branch
    branch = None
    for code in BRANCH_CODES.keys():
        if code.lower() in query:
            branch = code
            break
    
    return {
        "limit": limit,
        "semester": semester,
        "branch": branch
    }

def generate_structured_response(data: Dict, query_types: List[str], user_query: str) -> str:
    if not data:
        return "I couldn't find the requested information."
    
    response_parts = []
    
    # Handle comparison queries
    if "comparison" in query_types:
        params = parse_ranking_query(user_query)
        ranked_students = get_top_students(
            semester=params["semester"],
            branch=params["branch"],
            limit=params["limit"]
        )
        
        if ranked_students:
            response_parts.append(f"\nTop {params['limit']} students in Semester {params['semester']}" + 
                               (f" ({BRANCH_CODES[params['branch']]})" if params['branch'] else ""))
            for idx, student in enumerate(ranked_students, 1):
                response_parts.append(f"\n{idx}. {student['Name']} (Roll No: {student['Roll No']})")
                response_parts.append(f"   SGPA: {student['SGPA']}")
    
    # Handle academic queries
    if "academic" in query_types:
        if "resultData" in data:
            semesters = sorted(data["resultData"].keys())
            latest_sem = semesters[-1]
            
            # Show detailed academic info
            response_parts.append("\nAcademic Performance:")
            response_parts.append(f"Latest semester (Sem {latest_sem}):")
            response_parts.append(f"SGPA: {data['resultData'][latest_sem]['SGPA']}")
            response_parts.append(f"CGPA: {data['resultData'][latest_sem]['CGPA']}")
            
            # Add subject-wise performance if available
            if "marksData" in data and latest_sem in data["marksData"]:
                response_parts.append("\nSubject-wise performance (Latest Semester):")
                for subject in data["marksData"][latest_sem]:
                    response_parts.append(f"- {subject[1]}: {subject[-1]} Grade")
    
    # Handle temporal queries
    if "temporal" in query_types:
        if "resultData" in data:
            semesters = sorted(data["resultData"].keys())
            if len(semesters) > 1:
                response_parts.append("\nProgress Analysis:")
                sgpa_trend = [float(data["resultData"][sem]["SGPA"]) for sem in semesters]
                cgpa_trend = [float(data["resultData"][sem]["CGPA"]) for sem in semesters]
                
                # Calculate improvement
                sgpa_change = sgpa_trend[-1] - sgpa_trend[0]
                trend_direction = "improved" if sgpa_change > 0 else "declined"
                response_parts.append(f"Performance has {trend_direction} by {abs(sgpa_change):.2f} points since first semester")
                
                # Add semester-wise progression
                response_parts.append("\nSemester-wise progression:")
                for sem, sgpa in zip(semesters, sgpa_trend):
                    response_parts.append(f"Semester {sem}: SGPA {sgpa:.2f}")
    
    # Handle personal queries
    if "personal" in query_types:
        response_parts.append("\nPersonal Information:")
        response_parts.append(f"Name: {data.get('Name', 'N/A')}")
        response_parts.append(f"Roll No: {data.get('Roll No', 'N/A')}")
        response_parts.append(f"Branch: {data.get('Branch', 'N/A')}")
        if "Father's Name" in data:
            response_parts.append(f"Father's Name: {data['Father\'s Name']}")
    
    # If no structured response was generated, use the LLM
    if not response_parts:
        return generate_response(data, user_query)
    
    return "\n".join(response_parts)

def optimize_query(user_query: str, reg_no: str, query_types: List[str]) -> tuple:
    query = {}
    projection = {}
    
    if reg_no:
        query["Roll No"] = reg_no
    
    if "academic" in query_types:
        projection.update({
            "resultData": 1,
            "marksData": 1
        })
    
    if "personal" in query_types:
        projection.update({
            "Name": 1,
            "Branch": 1,
            "Father's Name": 1
        })
    
    if "comparison" in query_types:
        projection.update({
            "Roll No": 1,
            "Name": 1,
            "Branch": 1,
            "resultData": 1
        })
    
    return query, projection

# Function to fetch student info from MongoDB
def fetch_student_data(query, projection=None):
    student = students_col.find_one(query, {field: 1 for field in projection}) if projection else students_col.find_one(query)
    return student

# Function to perform FAISS search
def search_faiss(query_text, reg_no):
    query_vector = embedding_model.encode([query_text])
    distances, indices = index.search(query_vector, k=3)
    results = [student_data[i] for i in indices[0] if i < len(student_data) and student_data[i]["Roll No"] == reg_no]
    return results

# Enhanced prompt template
PROMPT_TEMPLATE = """
Context: You are an AI assistant helping with student academic information. 
The following data is about a student's academic record:
{context}

User Question: {query}

Please provide a clear and concise response focusing on the relevant information.
If comparing students or analyzing trends, explain the insights clearly.
If discussing grades, mention both absolute scores and relative performance.

Response:"""

# Function to generate responses using FLAN-T5
def generate_response(context, query):
    formatted_prompt = PROMPT_TEMPLATE.format(
        context=json.dumps(context, indent=2),
        query=query
    )
    response = qa_pipeline(formatted_prompt, max_length=200, min_length=20)[0]['generated_text']
    return response

class QueryError(Exception):
    """Custom exception for query processing errors"""
    pass

def validate_response(response: str) -> str:
    """Validate and clean up the generated response"""
    if not response or response.isspace():
        return "I apologize, but I couldn't generate a meaningful response. Please try rephrasing your question."
    
    # Remove any potential sensitive information
    response = re.sub(r'\b\d{10,}\b', '[REDACTED]', response)  # Remove long numbers
    response = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL REDACTED]', response)
    
    # Clean up formatting
    response = re.sub(r'\s+', ' ', response)  # Remove extra whitespace
    response = response.strip()
    
    return response

# API Endpoint
@app.post("/query")
async def query_chatbot(request: QueryRequest):
    try:
        user_query = request.user_query.strip()
        reg_no = request.reg_no.strip() if request.reg_no else None
        
        # Input validation
        if not user_query:
            raise QueryError("Query cannot be empty")
        
        if reg_no and not re.match(r'^\d{4}[A-Z]{2}[A-Z]{2}\d{3}$', reg_no):
            raise QueryError("Invalid registration number format")
        
        # Check cache
        cache_key = f"{reg_no}:{user_query}"
        cached_response = redis_client.get(cache_key)
        if cached_response:
            return {"response": cached_response.decode(), "source": "cache"}
        
        # Classify query
        query_types = classify_query(user_query)
        
        # Try MongoDB first for specific queries
        mongo_query, projection = optimize_query(user_query, reg_no, query_types)
        student_data = None
        
        if mongo_query:
            student_data = students_col.find_one(mongo_query, projection)
        
        # If MongoDB doesn't yield results, try semantic search
        if not student_data and reg_no:
            faiss_results = search_faiss(user_query, reg_no)
            if faiss_results:
                student_data = faiss_results[0]
        
        # Generate response
        if student_data:
            response = generate_structured_response(student_data, query_types, user_query)
        else:
            response = "I couldn't find relevant information for your query."
        
        # Validate response
        response = validate_response(response)
        
        # Update context and cache
        query_context.add_query(user_query, reg_no, response)
        redis_client.set(cache_key, response, ex=3600)
        
        return {
            "response": response,
            "query_types": query_types,
            "source": "database" if student_data else "not_found"
        }
        
    except QueryError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Error processing query: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )

# Initialize FAISS index with better configuration
def initialize_faiss_index():
    global index, student_vectors, student_data
    
    # Use IVF for faster search with large datasets
    nlist = 100  # number of clusters
    quantizer = faiss.IndexFlatL2(vector_dim)
    index = faiss.IndexIVFFlat(quantizer, vector_dim, nlist, faiss.METRIC_L2)
    
    # Load all student data
    all_students = list(students_col.find({}))
    
    # Prepare text for encoding
    texts_to_encode = []
    for student in all_students:
        # Create a comprehensive text representation
        text = f"{student['Name']} {student['Roll No']} {student['Branch']} "
        
        # Add academic information
        if 'resultData' in student:
            for sem, data in student['resultData'].items():
                text += f"Semester {sem} SGPA {data['SGPA']} CGPA {data['CGPA']} "
        
        # Add subject information
        if 'marksData' in student:
            for sem, subjects in student['marksData'].items():
                for subject in subjects:
                    text += f"{subject[1]} Grade {subject[-1]} "
        
        texts_to_encode.append(text)
        student_data.append(student)
    
    # Convert to vectors
    print("Encoding student data...")
    student_vectors = embedding_model.encode(texts_to_encode)
    
    # Train and add to index
    print("Training FAISS index...")
    index.train(student_vectors)
    index.add(student_vectors)
    print(f"Indexed {len(student_vectors)} students")

# Enhanced FAISS search
def search_faiss(query_text: str, reg_no: str = None, top_k: int = 5) -> List[Dict]:
    query_vector = embedding_model.encode([query_text])
    
    # Search with distance threshold
    distances, indices = index.search(query_vector, top_k)
    max_distance_threshold = 100.0  # Adjust based on your needs
    
    results = []
    for distance, idx in zip(distances[0], indices[0]):
        if idx < 0 or idx >= len(student_data):
            continue
            
        if distance > max_distance_threshold:
            continue
            
        student = student_data[idx]
        
        # If reg_no is provided, only return that student's data
        if reg_no and student["Roll No"] != reg_no:
            continue
            
        # Add search relevance score
        student = dict(student)
        student["relevance_score"] = 1.0 - (distance / max_distance_threshold)
        results.append(student)
    
    return results

# Initialize index on startup
initialize_faiss_index()

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
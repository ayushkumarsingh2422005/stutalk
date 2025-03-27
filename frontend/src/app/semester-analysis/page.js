"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function SemesterAnalysis() {
  const [regNo, setRegNo] = useState("2023UGCS086");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempRegNo, setTempRegNo] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("I");

  useEffect(() => {
    // Get registration number from localStorage or use default
    const savedRegNo = localStorage.getItem("registrationNumber");
    if (savedRegNo) {
      setRegNo(savedRegNo);
    } else {
      localStorage.setItem("registrationNumber", regNo);
    }
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/student/${regNo}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        // console.log(data.marksData[0]["I"])
        setStudentData(data);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [regNo]);

  const handleRegNoChange = (e) => {
    setTempRegNo(e.target.value);
  };

  const handleRegNoSubmit = (e) => {
    e.preventDefault();
    if (tempRegNo.trim()) {
      setRegNo(tempRegNo.trim());
      localStorage.setItem("registrationNumber", tempRegNo.trim());
      setIsEditing(false);
    }
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'O': 'text-green-400',
      'A': 'text-blue-400',
      'B': 'text-yellow-400',
      'C': 'text-orange-400',
      'D': 'text-red-400',
      'F': 'text-red-600'
    };
    return gradeColors[grade] || 'text-white';
  };

  const renderMarksTable = () => {
    if (!studentData?.marksData[0] || !studentData.marksData[0][selectedSemester]) {
      return (
        <div className="text-white text-center py-8">
          No data available for this semester
        </div>
      );
    }

    const columnHeaders = [
      "Subject Code",
      "Subject",
      "Test I",
      "Test II",
      "Assignment",
      "Quiz Avg",
      "END Sem",
      "Total",
      "Grade"
    ];

    return (
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs uppercase bg-white/10 backdrop-blur-md sticky top-0">
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index} className="px-3 sm:px-6 py-3 sm:py-4 font-medium whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentData.marksData[0][selectedSemester].map((row, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-white/10 hover:bg-white/5"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-3 sm:px-6 py-2 sm:py-4 ${cellIndex === 8 ? getGradeColor(cell) : ''
                    } ${cellIndex === 1 ? 'max-w-[200px] truncate' : 'whitespace-nowrap'}`}
                >
                  {cell || "-"}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-blue-900 to-black flex flex-col items-center px-4 sm:px-6 lg:px-8"
    >
      {/* Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg text-white py-4 px-4 sm:px-8 flex justify-between items-center w-full max-w-7xl rounded-lg mt-6 shadow-lg"
      >
        <Link href="/">
          <div className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer hover:text-yellow-300 transition-colors">
            <Image
              src="/main_logo_c.png"
              alt="GradeX Logo"
              width={50}
              height={50}
              className="invert"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={"/leaderboard"}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-white/80 hover:text-yellow-300 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 sm:w-7 sm:h-7"
              >
                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15.19c.414 0 .75-.336.75-.75a2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Leaderboard</span>
            </motion.div>
          </Link>


          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/20 px-4 py-2 rounded-full text-base sm:text-lg shadow-md cursor-pointer hover:bg-white/30 transition-all"
            onClick={() => {
              if (!isEditing) {
                setTempRegNo(regNo);
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              <form onSubmit={handleRegNoSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tempRegNo}
                  onChange={handleRegNoChange}
                  className="bg-transparent border-b border-white focus:outline-none w-24 sm:w-32"
                  autoFocus
                  onBlur={() => {
                    if (!tempRegNo.trim()) {
                      setIsEditing(false);
                    }
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="text-sm text-yellow-300"
                >
                  ✓
                </motion.button>
              </form>
            ) : (
              regNo
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mt-8">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center"
        >
          Semester Analysis
        </motion.h1>

        {/* Semester Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-2"
        >
          {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((sem, index) => (
            <motion.button
              key={`sem-${sem}-${index}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium min-w-[60px] ${selectedSemester === sem
                  ? "bg-yellow-400 text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
                } transition-all`}
            >
              Sem {sem}
            </motion.button>
          ))}
        </motion.div>

        {/* Marks Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden mb-8 sm:mb-12"
        >
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center py-8">{error}</div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {renderMarksTable()}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4"
        >
          <Link href="/ask-analysis" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-yellow-300 transition-all w-full sm:w-auto"
            >
              Ask anything
            </motion.button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-white/30 transition-all w-full"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
} 
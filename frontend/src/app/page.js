"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Link from "next/link";
import Footer from "@/components/Footer";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [regNo, setRegNo] = useState("2023UGCS086");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempRegNo, setTempRegNo] = useState("");

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
        setError(null); // Reset error state before new request
        const response = await fetch(`/api/student/${regNo}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        console.log(data);
        setStudentData(data);
        setError(null); // Ensure error is cleared when data is successfully fetched
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
        setStudentData(null); // Reset student data when there's an error
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

  // Function to get the latest semester's data
  const getLatestSemesterData = () => {
    if (!studentData?.resultData[0]) return { SGPA: "8.13", CGPA: "8.34" };

    const semesterData = Object.entries(studentData.resultData[0])
      .filter(([sem, data]) => sem !== '_id' && !isNaN(Number(data.SGPA)) && !isNaN(Number(data.CGPA)))
      .sort((a, b) => {
        const romanToNum = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8 };
        return romanToNum[b[0]] - romanToNum[a[0]];
      });

    return semesterData[0]?.[1] || { SGPA: "8.13", CGPA: "8.34" };
  };

  // Function to prepare chart data
  const prepareChartData = () => {
    if (!studentData?.resultData[0]) return null;

    const semesterData = Object.entries(studentData.resultData[0])
      .filter(([sem, data]) => sem !== '_id' && !isNaN(Number(data.SGPA)) && !isNaN(Number(data.CGPA)))
      .sort((a, b) => {
        const romanToNum = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8 };
        return romanToNum[a[0]] - romanToNum[b[0]];
      });

    const labels = semesterData.map(([sem]) => `Sem ${sem}`);
    const sgpaData = semesterData.map(([, data]) => Number(data.SGPA));
    const cgpaData = semesterData.map(([, data]) => Number(data.CGPA));

    return {
      labels,
      datasets: [
        {
          label: 'SGPA',
          data: sgpaData,
          borderColor: '#FCD34D',
          backgroundColor: 'rgba(252, 211, 77, 0.5)',
          tension: 0.4,
        },
        {
          label: 'CGPA',
          data: cgpaData,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const renderSemesterStats = () => {
    if (!studentData?.resultData) return null;

    return Object.entries(studentData.resultData[0])
      .filter(([semester, data]) => {
        // Filter out _id and invalid data
        return (
          semester !== '_id' &&
          !isNaN(Number(data.SGPA)) &&
          !isNaN(Number(data.CGPA))
        );
      })
      .sort((a, b) => {
        // Sort semesters in ascending order (I, II, III, etc.)
        const romanToNum = {
          'I': 1,
          'II': 2,
          'III': 3,
          'IV': 4,
          'V': 5,
          'VI': 6,
          'VII': 7,
          'VIII': 8
        };
        return romanToNum[a[0]] - romanToNum[b[0]];
      })
      .map(([semester, data], index) => (
        <motion.div
          key={semester}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 * index }}
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:bg-white/15 transition-all"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-xl sm:text-2xl text-white font-semibold mb-4 border-b border-white/10 pb-3"
          >
            Semester {semester}
          </motion.div>
          <div className="space-y-3">
            <motion.div whileHover={{ x: 2 }} className="flex items-center justify-between">
              <span className="text-gray-400">SGPA:</span>
              <span className="text-yellow-300 font-semibold text-lg">
                {Number(data.SGPA).toFixed(2)}
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center justify-between">
              <span className="text-gray-400">CGPA:</span>
              <span className="text-white font-semibold text-lg">
                {Number(data.CGPA).toFixed(2)}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ));
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
        <div className="text-xl sm:text-2xl font-bold tracking-tight">
          <Image 
            src="/main_logo_c.png"
            alt="GradeX Logo"
            width={50}
            height={50}
            className="invert"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/leaderboard" className="text-white/80 hover:text-yellow-300 transition-colors">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2"
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
            animate={!isEditing ? {
              rotate: [0, -20, 20, -30, 30, -20, 20, 0],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1, 1]
              }
            } : {}}
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
      <div className="max-w-7xl w-full rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[calc(100vh-120px)]">
        {/* Text Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center md:text-left w-full md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Welcome to <span className="text-yellow-300 inline-block hover:scale-105 transition-transform">GradeX</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200">
            Explore your academic stats and get detailed semester-wise analysis.
          </p>

          {/* Student Info Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-md mb-6 hover:bg-white/15 transition-colors"
          >
            {loading ? (
              <div className="text-white flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-red-400 py-4 text-center">{error}</div>
            ) : studentData ? (
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="text-2xl sm:text-3xl text-white font-semibold mb-4 border-b border-white/10 pb-3"
                >
                  {studentData["Name"]}
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <motion.div whileHover={{ x: 2 }} className="space-y-1">
                    <span className="text-gray-400 text-sm">Branch:</span>
                    <div className="text-white font-medium">{studentData["Branch"]}</div>
                  </motion.div>
                  <motion.div whileHover={{ x: 2 }} className="space-y-1">
                    <span className="text-gray-400 text-sm">Roll No:</span>
                    <div className="text-white font-medium">{studentData["Roll No"]}</div>
                  </motion.div>
                  <motion.div whileHover={{ x: 2 }} className="space-y-1 sm:col-span-2">
                    <span className="text-gray-400 text-sm">Father's Name:</span>
                    <div className="text-white font-medium">{studentData["Father's Name"]}</div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="text-white text-center py-8">Loading student information...</div>
            )}
          </motion.div>

          {/* Grades Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-md hover:bg-white/25 transition-colors"
          >
            {loading ? (
              <div className="text-white flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-red-400 py-4 text-center">{error}</div>
            ) : studentData ? (
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="text-3xl sm:text-4xl text-white font-semibold"
                >
                  Total CG: <span className="text-yellow-300">{Number(getLatestSemesterData().CGPA).toFixed(2)}</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="text-2xl sm:text-3xl text-gray-300"
                >
                  Current SG: <span className="text-white font-bold">{Number(getLatestSemesterData().SGPA).toFixed(2)}</span>
                </motion.div>
                {/* Add performance indicator */}
                <div className="mt-4 text-sm text-gray-300">
                  {Number(getLatestSemesterData().SGPA) > Number(getLatestSemesterData().CGPA) ? (
                    <div className="flex items-center text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      Improving performance!
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Room for improvement
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-white text-center py-8">Loading semester data...</div>
            )}
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`hidden md:flex justify-end w-full md:w-1/2 transition-all duration-500 ${hovered ? "scale-105" : ""
            }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src="/hero.png"
            alt="Academic Stats"
            width={450}
            height={450}
            className="rounded-lg shadow-lg border-4 border-white/30 hover:border-white/40 transition-colors"
          />
        </motion.div>
      </div>

      {/* Action Buttons - Shown below image on laptop */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex justify-center space-x-6 pb-12 pt-4 w-full max-w-7xl"
      >
        <Link href="/ask-anything" className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition-all"
          >
            Ask anything
          </motion.button>
        </Link>
        <Link href="/semester-analysis" className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-white/30 transition-all"
          >
            Semester analysis
          </motion.button>
        </Link>
      </motion.div>

      {/* Action Buttons - Shown in content area on mobile */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="md:hidden flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 pb-12"
      >
        <Link href="/ask-anything">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition-all"
          >
            Ask anything
          </motion.button>
        </Link>
        <Link href="/semester-analysis">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-white/30 transition-all"
          >
            Semester analysis
          </motion.button>
        </Link>
      </motion.div>

      {/* Performance Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-7xl mb-12"
      >
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-white mb-6">Performance Trends</h3>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center py-8">{error}</div>
          ) : studentData && prepareChartData() ? (
            <div className="h-[300px] sm:h-[400px]">
              <Line data={prepareChartData()} options={chartOptions} />
            </div>
          ) : (
            <div className="text-white text-center py-8">No performance data available</div>
          )}
        </div>
      </motion.div>

      {/* Semester-wise Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-7xl pb-20"
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center"
        >
          Semester Performance
        </motion.h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">{error}</div>
        ) : studentData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderSemesterStats()}
          </div>
        ) : (
          <div className="text-white text-center py-8">Loading semester data...</div>
        )}
      </motion.div>

      {/* Journey Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-7xl mb-12"
      >
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-2xl sm:text-3xl text-white font-semibold mb-6 border-b border-white/10 pb-3"
          >
            Our Journey
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Initial Conversation Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-white/10 hover:border-yellow-300/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 text-xl font-bold flex-shrink-0">
                  💡
                </div>
                <div>
                  <h3 className="text-xl text-white font-semibold mb-2">The Spark</h3>
                  <p className="text-gray-300 mb-4">
                    Discover how a simple conversation in class led to an innovative idea that would transform student result analysis.
                  </p>
                  <Link href="/journey#conversation">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400/30 transition-all"
                    >
                      Read the Story →
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Development Journey Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-lg border border-white/10 hover:border-yellow-300/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 text-xl font-bold flex-shrink-0">
                  🚀
                </div>
                <div>
                  <h3 className="text-xl text-white font-semibold mb-2">Development Journey</h3>
                  <p className="text-gray-300 mb-4">
                    Explore our technical journey, from data collection to AI integration, and learn about the challenges we overcame.
                  </p>
                  <Link href="/journey#development">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400/30 transition-all"
                    >
                      View Journey →
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Creative Footer */}
      <Footer />
    </motion.div>
  );
}
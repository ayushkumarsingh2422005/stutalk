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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/${regNo}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        console.log(data)
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
        <div className="text-xl sm:text-2xl font-bold tracking-tight">Edutalk</div>
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer text-white/80 hover:text-yellow-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7"
            >
              <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15.19c.414 0 .75-.336.75-.75a2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
            </svg>
          </motion.div>
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
      <div className="max-w-7xl w-full rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[calc(100vh-120px)]">
        {/* Text Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center md:text-left w-full md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Welcome to <span className="text-yellow-300 inline-block hover:scale-105 transition-transform">Edutalk</span>
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition-all"
        >
          Ask anything
        </motion.button>
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition-all"
        >
          Ask anything
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-white/30 transition-all"
        >
          Semester analysis
        </motion.button>
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

      {/* Creative Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full bg-gradient-to-r from-blue-900/50 to-black/50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-20 rounded-full"></div>
              <Image
                src="/logo.png"
                alt="Developer Logo"
                width={50}
                height={50}
                className="rounded-full border-2 border-yellow-400 relative z-10"
              />
            </motion.div>
            <div className="text-center">
              <motion.p
                className="text-white text-lg font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Crafted with 💜 by
              </motion.p>
              <motion.h3
                className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                DigiCraft
              </motion.h3>
              <motion.p
                className="text-gray-400 text-sm mt-2"
                whileHover={{ x: 2 }}
              >
                © {new Date().getFullYear()} Edutalk. All rights reserved.
              </motion.p>
            </div>
            <div className="flex space-x-4 mt-4">
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
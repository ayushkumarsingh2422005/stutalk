"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

// Add the following global styles at the top of the file, after the imports
const globalStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function Leaderboard() {
  const currentYear = new Date().getFullYear();
  const [batch, setBatch] = useState("2023");
  const [semester, setSemester] = useState("all");
  const [branch, setBranch] = useState("CS");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate available batches (current year and 3 years before that)
  const batches = [
    { value: (currentYear - 1).toString(), label: `${currentYear - 1} Batch` },
    { value: (currentYear - 2).toString(), label: `${currentYear - 2} Batch` },
    { value: (currentYear - 3).toString(), label: `${currentYear - 3} Batch` }
  ];

  // Define available filters with exact branch codes
  const branches = [
    { value: "CS", label: "Computer Science" },
    { value: "all", label: "All Branches" },
    { value: "EC", label: "Electronics" },
    { value: "ME", label: "Mechanical" },
    { value: "EE", label: "Electrical" },
    { value: "MM", label: "Meta" },
    { value: "CE", label: "Civil" },
    { value: "PI", label: "Production" },
    { value: "CM", label: "Computational M" },
  ];

  // Function to calculate available semesters based on batch year
  const getAvailableSemesters = (batchYear) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    const currentDate = new Date();
    const batchStartDate = new Date(batchYear, 6);
    const monthsPassed = (currentDate.getFullYear() - batchStartDate.getFullYear()) * 12 +
      (currentDate.getMonth() - batchStartDate.getMonth());
    const currentSemesterProgress = monthsPassed % 6;
    const completedSemesters = Math.floor(monthsPassed / 6) + (currentSemesterProgress >= 2 ? 1 : 0);
    const availableSemesters = Math.min(Math.max(0, completedSemesters), 8);
    return romanNumerals.slice(0, availableSemesters);
  };

  const availableSemesters = getAvailableSemesters(parseInt(batch));

  useEffect(() => {
    if (semester !== 'all' && !availableSemesters.includes(semester)) {
      setSemester('all');
    }
  }, [batch, availableSemesters, semester]);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create URL with base URL for debugging
      const baseUrl = window.location.origin;
      const url = new URL(`${baseUrl}/api/leaderboard`);

      // Add parameters
      url.searchParams.append("batch", batch);
      url.searchParams.append("semester", semester);
      url.searchParams.append("branch", branch);

      console.log("Debug - Request URL:", {
        fullUrl: url.toString(),
        baseUrl,
        params: {
          batch,
          semester,
          branch
        }
      });

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch leaderboard data');
      }

      console.log("Debug - Response:", {
        status: response.status,
        ok: response.ok,
        data
      });

      setStudents(data.students || []);
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [batch, semester, branch]);

  // Add the style tag to inject global styles
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = globalStyles;
    document.head.appendChild(styleTag);
    return () => styleTag.remove();
  }, []);

  const getRankBadgeColor = (index) => {
    switch (index) {
      case 0: return "bg-yellow-400 text-black";
      case 1: return "bg-gray-300 text-black";
      case 2: return "bg-amber-600 text-white";
      default: return "bg-white/10 text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-blue-900 to-black flex flex-col"
    >
      {/* Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg text-white py-4 px-4 sm:px-8 flex justify-between items-center w-full max-w-7xl mx-auto rounded-lg mt-6 shadow-lg"
      >
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight hover:text-yellow-300 transition-colors">
          <Image
            src="/main_logo_c.png"
            alt="GradeX Logo"
            width={50}
            height={50}
            className="invert"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/80 hover:text-yellow-300 transition-colors">
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
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-yellow-300"
              >
                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15.19c.414 0 .75-.336.75-.75a2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
              </svg>
              <h1 className="text-4xl font-bold text-white">Academic Leaderboard</h1>
            </div>
            <p className="text-gray-400">Track and compare academic performance across batches and branches</p>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Batch Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {batches.map((b) => (
                    <option key={`batch-${b.value}`} value={b.value} className="bg-gray-800">
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option key="sem-all" value="all" className="bg-gray-800">All Semesters</option>
                  {availableSemesters.map((sem) => (
                    <option key={`sem-${sem}`} value={sem} className="bg-gray-800">
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {branches.map((b) => (
                    <option key={`branch-${b.value}`} value={b.value} className="bg-gray-800">
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
          )}

          {/* Error State */}
          {!loading && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8"
            >
              <p className="text-red-400 text-center">{error}</p>
            </motion.div>
          )}

          {/* Results Table */}
          {!loading && !error && students.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
            >
              <div className="overflow-x-auto scrollbar-hide" style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': {
                  display: 'none'
                }
              }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Registration No.</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Branch</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        {semester === "all" ? "CGPA" : "SGPA"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <motion.tr
                        key={student.regNo}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-800/50 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getRankBadgeColor(index)}`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{student.name}</td>
                        <td className="px-6 py-4 text-gray-400">{student.regNo}</td>
                        <td className="px-6 py-4 text-gray-400">{student.branch}</td>
                        <td className="px-6 py-4">
                          <span className="text-blue-400 font-semibold">
                            {semester === "all" ?
                              (student.cgpa ? Number(student.cgpa).toFixed(2) : "N/A") :
                              (student.sgpa ? Number(student.sgpa).toFixed(2) : "N/A")
                            }
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* No Results State */}
          {!loading && !error && students.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">No students found for the selected filters</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Creative Footer */}
      <Footer />
    </motion.div>
  );
} 
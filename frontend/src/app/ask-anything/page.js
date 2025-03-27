"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function AskAnything() {
  const [regNo, setRegNo] = useState("2023UGCS086");
  const [isEditing, setIsEditing] = useState(false);
  const [tempRegNo, setTempRegNo] = useState("");

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
      <div className="flex-1 w-full max-w-7xl flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-xl text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <svg
              className="w-24 h-24 mx-auto text-yellow-400 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ask Anything
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your AI Study Companion
            </p>
            <div className="text-yellow-400 text-lg font-semibold mb-6">
              Coming Soon!
            </div>
            <p className="text-gray-300 text-base sm:text-lg">
              We're building an AI chatbot to help with your studies. Ask about results, get analysis, and receive insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-white/30 transition-all w-full sm:w-auto"
              >
                Back to Home
              </motion.button>
            </Link>
            <Link href="/semester-analysis">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition-all w-full sm:w-auto"
              >
                View Semester Analysis
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
} 
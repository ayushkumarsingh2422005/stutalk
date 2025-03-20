"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
            Edutalk
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
              We're building a smart AI chatbot that will help you with your studies. 
              Ask questions about your courses, get explanations for complex topics, 
              and receive personalized academic guidance.
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
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';

export default function Footer() {
    return (
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
                        <div className='flex gap-3'>
                            <Image
                                src="/logo.png"
                                alt="Developer Logo"
                                width={50}
                                height={50}
                                className="rounded-full border-2 border-yellow-400 relative z-10 aspect-square"
                            />
                            <Image
                                src="/akash.jpg"
                                alt="Developer Logo"
                                width={50}
                                height={50}
                                className="rounded-full border-2 border-white relative z-10 aspect-square"
                            />
                        </div>
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
                            <Link href="https://www.digicraft.one/">
                                DigiCraft & <span className='text-white'>Akash</span>
                            </Link>
                        </motion.h3>
                        <motion.p
                            className="text-gray-400 text-sm mt-2"
                            whileHover={{ x: 2 }}
                        >
                            © {new Date().getFullYear()} GradeX. All rights reserved.
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
                            href="https://www.linkedin.com/company/digicraft-one"
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
                            href="mailto:hello@digicraft.one"
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
    )
}
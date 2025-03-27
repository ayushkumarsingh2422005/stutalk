"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Journey() {
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
        <div className="text-xl sm:text-2xl font-bold tracking-tight">GradeX</div>
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
      <div className="max-w-7xl w-full rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col items-center gap-8 md:gap-12 min-h-[calc(100vh-120px)]">
        {/* Title Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Our <span className="text-yellow-300 inline-block hover:scale-105 transition-transform">Journey</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200">
            From a simple idea to a powerful platform
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full space-y-8"
        >
          {/* Day 1 Scene */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:bg-white/15 transition-all">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="text-2xl sm:text-3xl text-white font-semibold mb-6 border-b border-white/10 pb-3"
            >
              Day 1: The Spark ⚡
            </motion.div>
            
            {/* Scene Description */}
            <div className="text-gray-300 italic mb-6">
              Scene: Akash is sitting in class, lost in thought. The professor is talking, but Akash is deep in a different world—one filled with code and possibilities. He suddenly turns to Ayush.
            </div>

            {/* Conversation */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200">Bro, what even is an RAG? And what all do I need to learn for it?</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200">Why do you need a tutorial and a notebook for everything? Be like Iron Man—pick up random pieces, put them together, and <span className="italic">boom</span>, you've got something new and cool.</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200">Yeah, yeah, very inspirational, Tony Stark. But just give me a YouTube video, na? Some project tutorial?</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200">That won't help, trust me. If you want to actually learn, think of something fresh and build it yourself.</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200"><span className="italic">Fine, fine.</span></div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200">Actually, here's an idea—why not build something with AI using our college data? And you <span className="italic">do</span> know how weak our college's information security is… you could probably access anything you want. <span className="text-yellow-300">😏</span></div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200"><span className="italic">laughs</span> Brooo, why don't we make a <span className="text-yellow-300 font-bold">Result Analysis Application</span>? Something way bigger and cooler than what our seniors ever did.</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200"><span className="italic">grinning</span> Now you're talking!</div>
                </div>
              </motion.div>
            </div>

            {/* Scene Transition */}
            <div className="mt-6 text-gray-400 italic">
              (Bell rings—class over.)
            </div>

            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 mt-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                <img 
                  src="/images/logo.png" 
                  alt="Ayush" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold mb-1">Ayush</div>
                <div className="text-gray-200">Cool, let's meet in the evening and plan this out properly.</div>
              </div>
            </motion.div>
          </div>

          {/* Night Scene */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:bg-white/15 transition-all">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="text-2xl sm:text-3xl text-white font-semibold mb-6 border-b border-white/10 pb-3"
            >
              Night Scene: The Developer's Den
            </motion.div>
            
            {/* Scene Description */}
            <div className="text-gray-300 italic mb-6">
              Scene: Ayush is in his room, working on his agency project "DigiCraft" while vibing to a slow love song. The room has dim lighting, a half-eaten packet of chips, and a laptop screen glowing with lines of code.
            </div>

            {/* Conversation */}
            <div className="space-y-4">
              <div className="text-gray-400 italic mb-4">
                Knock knock knock
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200"><span className="italic">groans</span> Who's there?</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200"><span className="italic">from outside</span> It's meeeee!</div>
                </div>
              </motion.div>

              <div className="text-gray-400 italic mb-4">
                (Door creaks open. Akash enters with the energy of a man on a mission.)
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200">Come in, bro.</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200"><span className="italic">squints at the laptop screen</span> Bruh… love songs at this hour? Coding and heartbreak—what's the connection?</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200"><span className="italic">dramatic sigh</span> In memory of <span className="text-yellow-300">Mech</span> <span className="text-pink-400">😉♥️</span></div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/akash.jpg" 
                    alt="Akash" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-yellow-300 font-semibold mb-1">Akash</div>
                  <div className="text-gray-200"><span className="italic">laughs</span> Ok, ok. What about our idea? You got a plan?</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img 
                    src="/images/logo.png" 
                    alt="Ayush" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">Ayush</div>
                  <div className="text-gray-200">Bro, no second thoughts—let's build this!</div>
                </div>
              </motion.div>
            </div>

            {/* Final Text */}
            <div className="mt-8 text-center" id="development">
              <div className="text-gray-300 italic mb-4">
                And that's the moment we started solving real problems…
              </div>
              <div className="text-yellow-300 text-xl font-semibold">
                And so the journey began… 🎬✨
              </div>
            </div>
          </div>
        </motion.div>

        {/* Development Journey Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full space-y-8"
        >
          {/* Section Title */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-3xl sm:text-4xl text-white font-bold text-center mb-12"
          >
            Development Journey: From Idea to Implementation
          </motion.div>

          {/* Problem 1: Data Collection */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/10">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="text-2xl sm:text-3xl text-yellow-300 font-semibold mb-6"
            >
              Problem 1: Collecting Data
            </motion.div>
            
            <div className="space-y-6 text-gray-200">
              <p className="leading-relaxed">
                While inspecting our college website in <span className="text-yellow-300 font-semibold">Developer Mode</span>, we discovered a shocking security loophole. It was possible to reset <span className="text-yellow-300 font-semibold">anyone's password</span> with <span className="text-yellow-300 font-semibold">any value</span> and then log back into the system using that newly set password. This vulnerability opened up an opportunity to extract necessary data for our project.
              </p>

              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl text-white font-semibold mb-4">Choosing the Right Web Scraping Tool</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-yellow-300 font-semibold">BeautifulSoup (BS4)</div>
                      <div className="text-gray-400">Good for static pages but lacked automation capabilities.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-yellow-300 font-semibold">Selenium</div>
                      <div className="text-gray-400">Allowed us to automate browser actions dynamically, making it the perfect choice.</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-yellow-300 font-semibold">
                  After evaluating our options, <span className="text-white">Selenium</span> proved to be the best fit for our use case.
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl text-white font-semibold mb-4">Building the Automation Script</h3>
                <div className="space-y-3">
                  {[
                    "Opens a Chrome tab automatically.",
                    "Enters the \"Forgot Password\" section to reset the password.",
                    "Logs back into the system using the new credentials.",
                    "Extracts the complete result data from the system.",
                    "Converts the extracted data into JSON format and stores it in a MongoDB database."
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="text-gray-200">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Development Process */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/10">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="text-2xl sm:text-3xl text-yellow-300 font-semibold mb-6"
            >
              Development Process: Building the Application
            </motion.div>
            
            <div className="space-y-6 text-gray-200">
              <p className="leading-relaxed">
                With the data collection automated, we moved forward with developing the application.
              </p>

              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl text-white font-semibold mb-4">Tech Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-yellow-400/10 p-4 rounded-lg text-center">
                    <div className="text-yellow-300 font-semibold">Backend</div>
                    <div className="text-gray-300">Express.js (Node.js)</div>
                  </div>
                  <div className="bg-yellow-400/10 p-4 rounded-lg text-center">
                    <div className="text-yellow-300 font-semibold">Frontend</div>
                    <div className="text-gray-300">React.js</div>
                  </div>
                  <div className="bg-yellow-400/10 p-4 rounded-lg text-center">
                    <div className="text-yellow-300 font-semibold">Database</div>
                    <div className="text-gray-300">MongoDB</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-200">
                After setting up the architecture, we successfully built a full-stack application that could <span className="text-yellow-300">fetch, process, and visualize results in an interactive way</span>.
              </p>
            </div>
          </div>

          {/* AI Integration */}
          <div className="bg-gradient-to-r from-pink-900/50 to-red-900/50 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/10">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="text-2xl sm:text-3xl text-yellow-300 font-semibold mb-6"
            >
              AI Integration: Making the Data Useful
            </motion.div>
            
            <div className="space-y-6 text-gray-200">
              <p className="leading-relaxed">
                Once the data was stored in MongoDB, we wanted to build an <span className="text-yellow-300">AI-powered chatbot</span> that could answer user queries, analyze results, and generate reports based on the available data.
              </p>

              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl text-white font-semibold mb-4">Exploring AI Solutions</h3>
                <div className="space-y-6">
                  {/* Approach 1 */}
                  <div className="space-y-2">
                    <div className="text-yellow-300 font-semibold">1. Fine-Tuning a Language Model</div>
                    <p className="text-gray-400">
                      We initially attempted to <span className="text-yellow-300">fine-tune</span> a model for better query understanding. However, due to <span className="text-red-400">hardware limitations</span> (insufficient CPU/GPU performance), this approach was <span className="text-red-400">not feasible</span>.
                    </p>
                  </div>

                  {/* Approach 2 */}
                  <div className="space-y-2">
                    <div className="text-yellow-300 font-semibold">2. Semantic Search (Vector Database Approach)</div>
                    <p className="text-gray-400">
                      This method involved:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li><span className="text-yellow-300">Vectorizing</span> the entire dataset and storing it in a vector database.</li>
                      <li>Using <span className="text-yellow-300">similarity search</span> to extract relevant context.</li>
                      <li>Providing responses based on the retrieved context.</li>
                    </ul>
                    <p className="text-green-400 mt-2">
                      This solution showed promising results and became one of the best working approaches.
                    </p>
                  </div>

                  {/* Approach 3 */}
                  <div className="space-y-2">
                    <div className="text-yellow-300 font-semibold">3. Agent-Based Query Execution</div>
                    <p className="text-gray-400">
                      We also experimented with an agent-based approach where:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-400">
                      <li>The database schema and structure were provided as context.</li>
                      <li>A user query was processed to generate a MongoDB query dynamically.</li>
                      <li>The query was executed, and the retrieved response was fed back to the AI model for final output.</li>
                    </ol>
                    <p className="text-red-400 mt-2">
                      However, this method failed due to accuracy issues, making it unreliable for our use case.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/10 text-center">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="text-2xl sm:text-3xl text-yellow-300 font-semibold mb-6"
            >
              What You Can Do: Join the Innovation!
            </motion.div>
            
            <div className="space-y-4 text-gray-200">
              <p className="leading-relaxed">
                We are now looking for <span className="text-yellow-300">AI enthusiasts and developers</span> to contribute and improve our system. If you are passionate about AI, <span className="text-yellow-300">data extraction, and automation</span>, you can <span className="text-yellow-300">help us build a sustainable solution</span> and earn a spot in our contributor list.
              </p>
              <p className="text-xl text-yellow-300 font-semibold">
                Join us in solving this challenge and making something impactful! 🚀✨
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}

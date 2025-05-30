"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="absolute text-white text-lg mt-28 animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚀 Welcome to PizzaDash
        </motion.h1>
        <motion.button
          onClick={() => signIn()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 px-8 py-3 rounded-lg text-white text-lg shadow-lg hover:bg-indigo-700 transition-all"
        >
          Sign In
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      <aside className="hidden md:flex flex-col w-64 bg-gray-950/70 backdrop-blur-md p-6 border-r border-gray-700">
        <h1 className="text-2xl font-bold">🍕 PizzaDash</h1>
        <nav className="flex flex-col gap-4 mt-6 flex-grow">
          <Link href="/" className="hover:text-indigo-400 transition-all">Dashboard</Link>
          <Link href="/order" className="hover:text-indigo-400 transition-all">Orders</Link>
        </nav>
        <button
          onClick={() => signOut()}
          className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </aside>

      <header className="md:hidden flex items-center justify-between bg-gray-950/90 backdrop-blur-md p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">🍕 PizzaDash</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" /> 
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" /> 
            )}
          </svg>
        </button>
      </header>

      {menuOpen && (
        <nav className="md:hidden bg-gray-950/90 backdrop-blur-md p-4 border-b border-gray-700 flex flex-col gap-4">
          <Link href="/" className="hover:text-indigo-400 transition-all" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link href="/order" className="hover:text-indigo-400 transition-all" onClick={() => setMenuOpen(false)}>Orders</Link>
          <button
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition mt-2"
          >
            Sign Out
          </button>
        </nav>
      )}

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Hello, {session.user?.name || "User"} 👋
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Welcome back to your Pizza Command Center.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-indigo-500 shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-medium mb-2 text-indigo-300">Total Orders</h3>
              <p className="text-4xl font-bold text-indigo-500">42</p>
            </motion.div>
            <motion.div
              className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-green-500 shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-medium mb-2 text-green-300">Delivered Today</h3>
              <p className="text-4xl font-bold text-green-500">12</p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

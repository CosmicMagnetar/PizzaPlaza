"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { create } from "zustand";
import { useState } from "react";

interface OrderFilterStore {
  filter: string;
  sortOrder: string;
  setFilter: (f: string) => void;
  setSortOrder: (s: string) => void;
}

const useOrderFilterStore = create<OrderFilterStore>((set) => ({
  filter: "All",
  sortOrder: "Newest",
  setFilter: (filter) => set({ filter }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const filter = useOrderFilterStore((state) => state.filter);
  const setFilter = useOrderFilterStore((state) => state.setFilter);
  const sortOrder = useOrderFilterStore((state) => state.sortOrder);
  const setSortOrder = useOrderFilterStore((state) => state.setSortOrder);

  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="absolute text-white text-xl mt-40 animate-pulse">Loading Orders...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <motion.h1
          className="text-5xl font-extrabold mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔒 Please Sign In
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

  const allOrders = [
    { id: "ORD123", customer: "Alice", item: "Margherita", status: "Delivered", date: "2025-05-20" },
    { id: "ORD124", customer: "Bob", item: "Pepperoni", status: "Preparing", date: "2025-05-28" },
    { id: "ORD125", customer: "Charlie", item: "Veggie Supreme", status: "On the way", date: "2025-05-26" },
    { id: "ORD126", customer: "Diana", item: "BBQ Chicken", status: "Delivered", date: "2025-05-19" },
    { id: "ORD127", customer: "Ethan", item: "Hawaiian", status: "Preparing", date: "2025-05-27" },
    { id: "ORD128", customer: "Fiona", item: "Paneer Tikka", status: "On the way", date: "2025-05-29" },
    { id: "ORD129", customer: "George", item: "Farmhouse", status: "Delivered", date: "2025-05-21" },
    { id: "ORD130", customer: "Hannah", item: "Classic Cheese", status: "Preparing", date: "2025-05-25" },
    { id: "ORD131", customer: "Ian", item: "Pepperoni", status: "On the way", date: "2025-05-23" },
    { id: "ORD132", customer: "Jane", item: "Mushroom Feast", status: "Delivered", date: "2025-05-22" },
  ];

  const filteredOrders = filter === "All" ? allOrders : allOrders.filter((o) => o.status === filter);

  const sortedOrders = [...filteredOrders].sort((a, b) =>
    sortOrder === "Newest"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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

\      {menuOpen && (
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

\      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-1">Your Orders 📦</h2>
            <p className="text-gray-400 text-sm">Here’s the latest pizza activity.</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="text-sm text-gray-300">Filter by Status:</label>
            <select
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Delivered">Delivered</option>
              <option value="Preparing">Preparing</option>
              <option value="On the way">On the way</option>
            </select>

            <label className="text-sm text-gray-300 sm:ml-6">Sort by Date:</label>
            <select
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>

          <div className="overflow-x-auto">
           <motion.table
            className="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <thead>
              <tr className="bg-gradient-to-r from-cyan-600 via-green-500 to-blue-600 text-white uppercase text-sm tracking-wider">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Item</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {sortedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                >
                  <td className="py-4 px-6 font-mono text-indigo-300">{order.id}</td>
                  <td className="py-4 px-6">{order.customer}</td>
                  <td className="py-4 px-6">{order.item}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-600 text-green-100"
                          : order.status === "Preparing"
                          ? "bg-yellow-500 text-yellow-900"
                          : "bg-blue-600 text-blue-100"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400 font-mono">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>

          </div>
        </motion.div>
      </main>
    </div>
  );
}

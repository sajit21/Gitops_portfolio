"use client";

import 'tailwindcss/tailwind.css'; // Tailwind CSS import


import Sidebar from "@/component/Sidebar";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-3 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}

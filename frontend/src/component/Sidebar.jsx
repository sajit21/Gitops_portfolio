"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  BookMarked,
  Video,
  MessageCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { userAuthentication } from "@/store/user.authentication";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { logout } = userAuthentication();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleout = async () => {
    await logout();
    // localStorage.removeItem("token");
    router.push("/");
  };

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: <Home size={18} /> },
    {
      name: "Articles",
      href: "/dashboard/articles",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Books",
      href: "/dashboard/publications",
      icon: <BookMarked size={18} />,
    },
    { name: "Videos", href: "/dashboard/videos", icon: <Video size={18} /> },
    {
      name: "Testimonials",
      href: "/dashboard/testimonials",
      icon: <MessageCircle size={18} />,
    },
    {
      name: "Contact",
      href: "/dashboard/contact",
      icon: <MessageCircle size={18} />,
    },
  ];

  return (
    <>
      {/* Hamburger icon only (mobile only) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md focus:outline-none"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-screen w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        {/* Sidebar Header (hidden on mobile overlay) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
          <h2 className="text-xl  font-bold tracking-wide">NK Dashboard</h2>

          {/* Close button only visible on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close after click (mobile)
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                pathname === link.href
                  ? "bg-gray-800 font-semibold text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {link.icon} {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              handleout();
              setIsOpen(false);
            }}
            className="flex items-center text-red-600 gap-2 w-full px-3 py-2 rounded-md  hover:text-red-400 hover:bg-gray-800 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Dark overlay when sidebar open (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
        />
      )}
    </>
  );
};

export default Sidebar;

"use client";

import React, { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Articles", path: "/articles" },
  { label: "Books", path: "/books" },
  { label: "Videos", path: "/videos" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-primary py-4">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <span className="text-3xl md:text-4xl font-bold text-white">
            NK
          </span>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-white font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="hover:text-gray-300 text-xl transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl"
          >
            {open ? "✕" : "☰"} {/* X when open, hamburger when closed */}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="flex flex-col gap-4 mt-4 md:hidden text-white font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="block text-lg hover:text-gray-300"
                  onClick={() => setOpen(false)} // closes menu on click
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
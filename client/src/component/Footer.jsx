// import React from "react";

// const Footer = () => {
//   return (
//     <section className="bg-primary py-4">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 px-2 md:px-4">
//           <div className="text-white gap-4 flex items-start justify-center">
//             <h1 className="font-bold text-2xl ">Nir Kshetri</h1>
//             <span className="text-lg">
//               Professor of Management,University of North Carolina-Greensboro
//             </span>
//           </div>

//           <div className="text-white gap-4 flex items-start justify-center">
//             <h1 className="font-bold text-2xl ">Quick Links</h1>
//             <div className="grid grid-cols-2 px-2">
//               <div>
//                 <span className="text-white text-sm">Home </span>
//                 <span className="text-white text-sm">Articles </span>
//                 <span className="text-white text-sm">Books </span>
//                 <span className="text-white text-sm">Videos </span>
//               </div>

//               <div>
//                 <span className="text-white text-sm">Testimonials </span>
//                 <span className="text-white text-sm">Contact </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-content px-2 ">
//             <div className="flex items-center justify-content">
//               <h1 className="font-bold text-center">Socials</h1>
//               <div>
//                 <facebook /> logo with url add tagert=_blank similarly for
//                 youtube, twitter, linkedin, instagram
//               </div>
//             </div>
//             <div className="flex items-center justify-content">
//               <h1 className="font-bold text-center">Connect with Me</h1>
//               <div>
//                 <Mail /> logo with url add tagert=_blank similarly for
//                 youtube, twitter, linkedin, instagram
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border border-black h-3 w-full"></div>

//         <div className="text-white text-sm text-center">© 2025 Nisha R. Acharya. All rights reserved.</div>
//       </div>
//     </section>
//   );
// };

// export default Footer;


"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Linkedin, Instagram, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Articles", path: "/articles" },
  { label: "Books", path: "/books" },
  { label: "Videos", path: "/videos" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const socials = [
  { icon: Facebook, url: "https://facebook.com" },
  { icon: Twitter, url: "https://twitter.com" },
  { icon: Youtube, url: "https://youtube.com" },
  { icon: Linkedin, url: "https://linkedin.com" },
  { icon: Instagram, url: "https://instagram.com" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* About */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Nir Kshetri</h2>
            <p className="text-sm leading-relaxed text-gray-200">
              Professor of Management, University of North Carolina-Greensboro.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Links</h2>

            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-sm hover:text-gray-300 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + Contact */}
          <div className="space-y-5">

            {/* Socials */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Socials</h2>

              <div className="flex gap-4">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300 transition"
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Connect with Me</h2>

              <a
                href="mailto:example@email.com"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <Mail size={20} />
                Send Email
              </a>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-6"></div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-200">
          © 2025 Nisha R. Acharya. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

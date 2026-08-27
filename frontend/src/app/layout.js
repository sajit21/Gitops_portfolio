import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Playfair_Display } from "next/font/google";
import 'tailwindcss/tailwind.css'; // Tailwind CSS import


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-playfair", 
});

export const metadata = {
  title: "NK Portfolio",
  description: "Nextjs Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      {/* what will be the background */}
       <head >
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900 ">
        <div className="max-w-screen-3xl w-full mx-auto ">
          {/* Fixed wrapper for header + navbar */}
          {/* <div className="sticky top-0 left-0 w-full z-50">
            <Header />
            <Navbar />
          </div> */}

          {children}

          {/* <Footer /> */}
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { userAuthentication } from "@/store/user.authentication";

const Page = () => {
  const login = userAuthentication((store) => store.login);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
                                      // login page here
  const handleSubmit = async (e) => {
    e.preventDefault();  
    

    try {
      const creatlogin={
      email,
      password
    }
      const res = await login(creatlogin);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-primary text-white rounded-3xl shadow-lg p-8 w-full max-w-md ">
        <h1 className="text-5xl font-bold text-center mb-6">NK</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div> */}

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* <div className="flex items-center justify-center"> */}
          <button
            type="submit"
            className="w-full px-3 bg-secondary font-title text-gray-700 bg-secondary font-semibold py-2 rounded-md hover:bg-blue-100 transition duration-200"
          >
            Login
          </button>

          {/* </div> */}
        </form>
        <div className="already-div">
          Create an account?{" "}
          <Link href="/signup" className="text-secondary underline ">
            Signup
          </Link>
        </div>

        {/* </div> */}

        <div className="border "></div>
      </div>
    </section>
  );
};

export default Page;

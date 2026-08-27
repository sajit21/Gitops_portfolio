"use client";
import { userAuthentication } from "@/store/user.authentication";

import { useState } from "react";
import Link from "next/link";
const Page = () => {
      const signup = userAuthentication(
    (state) => state.signup
  );
  

  //   const { loading, user } = userAuthenticaion();
  const [name, setName] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const createSignup = {
      name,
      email,
      password,
    };
    signup(createSignup);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-primary text-white rounded-3xl shadow-lg p-8 w-full max-w-md ">
        <h1 className="text-5xl font-bold text-center mb-6">NK</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* <div className="flex items-center justify-center"> */}
          <button
            type="submit"
            className="w-full px-3 bg-secondary font-title text-gray-700 bg-secondary font-semibold py-2 rounded-md hover:bg-blue-100 transition duration-200 "
          >
            Sign Up
          </button>
        </form>
        <div className="already-div">
          Already have an account?{" "}
          <Link href="/" className="text-secondary underline ">
            Login
          </Link>
        </div>

        {/* </div> */}

        <div className="border "></div>
      </div>
    </section>
  );
};

export default Page;

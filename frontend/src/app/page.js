"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { userAuthentication } from "@/store/user.authentication";

const Page = () => {
  const login = userAuthentication((store) => store.login);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuth, user, loading } = userAuthentication();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);
  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800"></div>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const creatlogin = {
        email,
        password,
      };
      await login(creatlogin);
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

// "use client";
// import { userAuthentication } from "@/store/user.authentication";
// import React, { useEffect } from "react";

// const page = () => {
//   const { checkAuth,user ,loading } = userAuthentication();
//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   return <div>page</div>;
// };

// export default page;

"use client";

import Typewriter from "@/component/Typewriter";
import { useArticleStore } from "@/store/useArticleStore";
import { useBookStore } from "@/store/useBookStore";
import { useVideoStore } from "@/store/useVideoStore";
import AdminChart from "../../component/AdminChart";
import PieChart from "../../component/PieChart";
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
import { useEffect } from "react";

export default function DashboardPage() {
  const { article, fetchArticle } = useArticleStore();
  const { video, fetchVideo } = useVideoStore();
  const { book, fetchBook } = useBookStore();
  const overview = [
    {
      title: "Total Articles",
      length: article.length,
      icon: BookOpen,
      iconSize: 38,
    },
    { title: "Total Videos", length: video.length, icon: Video, iconSize: 38 },
    {
      title: "Total Books",
      length: book.length,
      icon: BookMarked,
      iconSize: 38,
    },
    {
      title: "Total Testimonals",
      length: book.length,
      icon: BookOpen,
      iconSize: 38,
    },
  ];

  useEffect(() => {
    fetchArticle();
    fetchBook();
    fetchVideo();
  }, []);

  return (
    <div className="min-h-screen   bg-gray-100">
      {/* Main Content */}
      <div className="flex flex-col space-y-3 p-8">
        {/* <main className="flex-1 p-8"> */}
        {/* Header */}
        <div className="">
          <h1 className="text-2xl font-semibold max-[767px]:text-center">
            Admin Overview
          </h1>
          <h1 className="text-lg text-gray-600 mb-6 max-[767px]:text-center">
            Welcome back,{" "}
            <Typewriter text="Nir Kshetri" speed={100} pause={1000} /> 👋
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {overview.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl flex items-center justify-between 
                   shadow-sm hover:shadow transition"
              >
                <div>
                  <h2 className="text-gray-600 text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="text-3xl font-bold text-center text-primary">
                    {item.length}
                  </p>
                </div>

                <div className="p-3 bg-primary rounded-2xl">
                  <Icon
                    size={item.iconSize}
                    className="text-white opacity-90"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 [@media(min-width:900px)]:grid-cols-2 [@media(max-width:900px)]:space-y-4 [@media(min-width:900px)]:space-x-4 p-8">
        {/* <div className="p-8 flex items-center justify-center"> */}
          <div > 
          <AdminChart />
        </div>
        <div>
          <PieChart />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

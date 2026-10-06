"use client";

import { useState, useMemo } from "react";
// Import all necessary Chart.js components here
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register all necessary components once 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Example weekly totals (replace with dynamic data from your store
const weeklyTotals = {
  "Week 1": { videos: 10, articles: 5, books: 7 },
  "Week 2": { videos: 8, articles: 7, books: 5 },
  "Week 3": { videos: 12, articles: 6, books: 9 },
  "Week 4": { videos: 15, articles: 10, books: 12 },
};

export default function AdminWeekBarChart() {
  const [selectedWeek, setSelectedWeek] = useState("Week 3");

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  // Memoize data and options to prevent unnecessary chart re-renders
  const chartData = useMemo(() => ({
    labels: ["Videos", "Articles", "Books"],
    datasets: [
      {
        label: `Content Count - ${selectedWeek}`,
        data: [
          weeklyTotals[selectedWeek].videos,
          weeklyTotals[selectedWeek].articles,
          weeklyTotals[selectedWeek].books,
        ],
        // Use Tailwind colors for better integration here
        backgroundColor: ["#3C3A88", "#5D5AB5", "#2A2866"], // Using custom 'brand' colors
        borderRadius: 6,
        barThickness: 50,
      },
    ],
  }), [selectedWeek]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart fills the container height
    plugins: {
      title: {
        display: true,
        text: `Weekly Content Summary - ${selectedWeek}`,
        font: { size: 16 }, // Adjusted for better mobile viewing
        color: '#1f2937'
      },
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
            display: true, 
            text: "Total Count",
            color: '#4b5563'
        },
        ticks: {
            stepSize: 1,
            color: '#4b5563'
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        title: { 
            display: true, 
            text: "Content Type",
            color: '#4b5563'
        },
        grid: {
            display: false
        },
        ticks: {
            color: '#4b5563'
        }
      },
    },
  }), [selectedWeek]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col space-y-6 transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">Content Consumption Analysis</h2>
      
      {/* Week Dropdown */}
      <div className="flex justify-between items-center">
        <label htmlFor="week-select" className="text-sm font-medium text-gray-600">
            Select Week:
        </label>
        <select
          id="week-select"
          value={selectedWeek}
          onChange={handleWeekChange}
          className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent cursor-pointer transition-shadow"
        >
          {Object.keys(weeklyTotals).map((week) => (
            <option key={week} value={week}>
              {week}
            </option>
          ))}
        </select>
      </div>

      {/* Bar Chart Container */}
      {/* The h-[50vh] class makes the chart take up 50% of the viewport height, 
        ensuring it scales vertically on all devices. 
      */}
      <div className="w-full h-[350px] sm:h-[450px] lg:h-[500px] overflow-hidden">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
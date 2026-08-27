"use client";

import { useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    Title 
} from "chart.js";

// Register all necessary components once
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Example weekly totals (replace with dynamic data from your store)
const weeklyTotals = {
  "Week 1": { videos: 10, articles: 5, books: 7 },
  "Week 2": { videos: 8, articles: 7, books: 5 },
  "Week 3": { videos: 12, articles: 6, books: 9 },
  "Week 4": { videos: 15, articles: 10, books: 12 },
};

export default function AdminWeekPieChart() {
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
        // Use custom 'brand' colors for integration
        backgroundColor: ["#3C3A88", "#5D5AB5", "#2A2866"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 3, // Slightly thicker border for better separation
      },
    ],
  }), [selectedWeek]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart fills the container height
    plugins: {
      title: {
        display: true,
        text: `Weekly Content Distribution - ${selectedWeek}`,
        font: { size: 16 }, // Adjusted font size
        color: '#1f2937'
      },
      legend: { 
        position: "bottom", // Move legend to bottom for better chart area usage
        labels: {
            font: { size: 12 },
            color: '#4b5563',
            padding: 20
        }
      },
      tooltip: { enabled: true },
    },
    // Customize hover effect for better feedback
    hover: {
        mode: 'nearest',
        intersect: true
    }
  }), [selectedWeek]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col space-y-6 transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">Content Distribution Analysis</h2>
      
      {/* Week Dropdown */}
      <div className="flex justify-between items-center">
        <label htmlFor="week-select-pie" className="text-sm font-medium text-gray-600">
            Select Week:
        </label>
        <select
          id="week-select-pie"
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

      {/* Pie Chart Container */}
      {/* Use a fixed aspect ratio for Pie charts using a padding hack, or fluid height */}
      <div className="w-full h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden">
        {/* We wrap the Pie component to ensure it scales correctly inside the flex container */}
        <div className="w-full h-full max-w-lg">
            <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// // Example weekly totals (replace with dynamic data from your store)
// const weeklyTotals = {
//   "Week 1": { videos: 10, articles: 5, books: 7 },
//   "Week 2": { videos: 8, articles: 7, books: 5 },
//   "Week 3": { videos: 12, articles: 6, books: 9 },
// };

// export default function AdminWeekPieChart() {
//   const [selectedWeek, setSelectedWeek] = useState("Week 1");

//   const handleWeekChange = (e) => {
//     setSelectedWeek(e.target.value);
//   };

//   const data = {
//     labels: ["Videos", "Articles", "Books"],
//     datasets: [
//       {
//         label: `Content Count - ${selectedWeek}`,
//         data: [
//           weeklyTotals[selectedWeek].videos,
//           weeklyTotals[selectedWeek].articles,
//           weeklyTotals[selectedWeek].books,
//         ],
//         backgroundColor: ["#4BC0C0", "#111827", "#adafb4ff"],
//         borderColor: ["#fff", "#fff", "#fff"],
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: {
//         display: true,
//         text: `Weekly Content Distribution - ${selectedWeek}`,
//         font: { size: 18 },
//       },
//       legend: { position: "top" },
//       tooltip: { enabled: true },
//     },
//   };

//   return (
//     <div className="w-full bg-white p-4 rounded-xl shadow flex flex-col space-y-4">
//       {/* Week Dropdown */}
//       <div className="flex justify-end">
//         <select
//           value={selectedWeek}
//           onChange={handleWeekChange}
//           className="border rounded px-3 py-1"
//         >
//           {Object.keys(weeklyTotals).map((week) => (
//             <option key={week} value={week}>
//               {week}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Pie Chart */}
//       <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
//         <Pie data={data} options={options} />
//       </div>
//     </div>
//   );
// }

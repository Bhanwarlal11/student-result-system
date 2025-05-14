import React, { useEffect, useState } from "react";
import { fetchOverview } from "../api/api";
import StatsGrid from "../components/StatsGrid";
import TopPerformers from "../components/TopPerformers";
import SubjectPieChart from "../components/SubjectPieChart";

export default function Overview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchOverview().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight tracking-tight mb-4  ">
  📊 Dashboard Overview
</h2>


      {/* Top 4 Stats Cards */}
      <StatsGrid stats={data.stats} />

      {/* Two-column grid: Left - TopPerformers | Right - SubjectPieChart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Top Performers */}
        <div >
          <TopPerformers performers={data.topPerformers} />
        </div>

        {/* Right - Subject Average Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <SubjectPieChart subjectAverages={data.subjectAverages} />
        </div>
      </div>
    </div>
  );
}

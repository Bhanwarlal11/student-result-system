import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SubjectPieChart({ subjectAverages }) {
  const data = {
    labels: subjectAverages.map((s) => s.subjectName),
    datasets: [
      {
        data: subjectAverages.map((s) => s.avgScore),
        backgroundColor: [
          "#3b82f6",
          "#facc15",
          "#10b981",
          "#f87171",
          "#a78bfa",
          "#fb923c",
          "#ec4899",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 640 ? "bottom" : "right",
        labels: {
          color: "#374151",
          font: {
            size: 14,
            family: "Inter, sans-serif",
            weight: "500",
          },
          boxWidth: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return ` Avg: ${value.toFixed(2)}%`;
          },
        },
        backgroundColor: "#111827",
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 6,
      },
    },
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: "easeOutBounce",
    },
    layout: {
      padding: 10,
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📚 Subject-wise Average Marks
      </h2>
      <div className="w-full max-w-full sm:max-w-md mx-auto h-[300px] sm:h-[400px] md:h-[500px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

import { GaugeIcon, PercentIcon, AwardIcon, CalculatorIcon } from "lucide-react";

export default function SummaryStats({ total, scored, percentage, average }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <StatCard label="Total Marks" value={total} icon={<AwardIcon className="text-blue-600" />} />
      <StatCard label="Scored Marks" value={scored} icon={<GaugeIcon className="text-green-600" />} />
      <StatCard label="Percentage" value={`${percentage}%`} icon={<PercentIcon className="text-purple-600" />} />
      <StatCard label="Average Marks" value={average} icon={<CalculatorIcon className="text-orange-600" />} />
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}

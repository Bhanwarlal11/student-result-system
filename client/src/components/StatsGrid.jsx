import { Card, CardContent } from "@/components/ui/card";
import {
  BookIcon,
  UsersIcon,
  ListIcon,
  BarChartIcon,
} from "lucide-react";

export default function StatsGrid({ stats }) {
  const { totalStudents, totalSubjects, totalMarksEntries, averagePercentage } = stats;

  const cards = [
    { icon: UsersIcon, label: "Total Students", value: totalStudents, color: "bg-blue-100 text-blue-600" },
    { icon: BookIcon, label: "Total Subjects", value: totalSubjects, color: "bg-green-100 text-green-600" },
    { icon: ListIcon, label: "Total Marks Entries", value: totalMarksEntries, color: "bg-yellow-100 text-yellow-600" },
    { icon: BarChartIcon, label: "Average Percentage", value: `${averagePercentage}%`, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map(({ icon: Icon, label, value, color }) => (
        <Card
          key={label}
          className="transition-transform transform hover:scale-[1.02] duration-200 shadow-sm border border-gray-100 rounded-2xl"
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-full ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xl font-semibold text-gray-800">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

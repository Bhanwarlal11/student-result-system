import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function TopPerformers({ performers }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">🏆 Top Performers</h2>
      <div className="space-y-3">
        {performers.map((student, index) => (
          <div
            key={student._id}
            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="ring-2 ring-blue-500">
                  <AvatarImage src="/assets/avatar.jpg" alt={student.name} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  #{index + 1}
                </span>
              </div>
              <div>
                <p className="text-md font-semibold text-gray-800 capitalize">{student.name}</p>
                <p className="text-sm text-gray-500">{student.percentage}% scored</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

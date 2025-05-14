import { CalendarIcon, UserIcon } from "lucide-react";
import avatarImg from '../assets/avatar.jpg';

export default function StudentInfo({ student }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-6 flex flex-col md:flex-row gap-6 items-center">
      {/* Optional Student Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarImg}
          alt={student.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      {/* Info */}
      <div className="w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 " />
  <span className="truncate">Student Information</span>
</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
          <Info label="Name" value={student.name} />
          <Info label="Roll Number" value={student.rollNumber} />
          <Info
            label="Date of Birth"
            value={new Date(student.dob).toLocaleDateString()}
            icon={<CalendarIcon className="inline w-4 h-4 text-gray-400 ml-1" />}
          />
          <Info label="Father's Name" value={student.fatherName} />
          <Info label="Mother's Name" value={student.motherName} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div className="flex items-start">
      <span className="font-medium text-gray-500 w-32">{label}:</span>
      <span className="text-gray-800 flex items-center">{value} {icon}</span>
    </div>
  );
}

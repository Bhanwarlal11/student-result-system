import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function StudentTable({ students }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-md bg-white text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 ">Name</th>
            <th className="px-4 py-2 ">Roll No</th>
            <th className="px-4 py-2 ">Date of Birth</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-t">
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.rollNumber}</td>
              <td className="px-4 py-2">{new Date(student.dob).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-center">
                <Button variant="outline" onClick={() => navigate(`/students/${student._id}`)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

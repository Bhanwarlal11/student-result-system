import { useEffect, useState } from "react";
import { getStudents } from "@/api/api.js"; // <-- your API file
import StudentTable from "../components/StudentTable";
import AddStudentDialog from "../components/AddStudentDialog";

export default function Students() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data || []);
    } catch (err) {
      console.error(
        "Error fetching students:",
        err?.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="w-full space-y-4  mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-2xl md:text-xl sm:text-lg font-semibold">
          Students List
        </h2>
        <AddStudentDialog onStudentAdded={fetchStudents} />
      </div>

      <StudentTable students={students} />
    </div>
  );
}

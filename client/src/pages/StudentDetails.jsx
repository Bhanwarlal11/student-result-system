import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentFullDetails, addMark, deleteMarkById } from "../api/api"; // your api.js file

import StudentInfo from "../components/StudentInfo";
import MarksTable from "../components/MarksTable";
import AddMarkForm from "../components/AddMarkForm";
import SummaryStats from "../components/SummaryStats";

export default function StudentDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await getStudentFullDetails(id);
      setData(res);
    } catch (err) {
      console.error("Error fetching student details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleAddMark = async (markData) => {
    setSubmitting(true);
    try {
      await addMark({ ...markData, studentId: id });
      fetchDetails();
    } catch (err) {
      console.error("Failed to add mark");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMark = async (markId) => {
    await deleteMarkById(markId);
    fetchDetails();
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full space-y-4  mx-auto">
      <StudentInfo student={data.student} />

      <SummaryStats
        total={data.totalPossible}
        scored={data.totalScored}
        percentage={data.percentage}
        average={data.average}
      />

      <MarksTable marks={data.marks} onDelete={handleDeleteMark}  subjects={data.marks.map((m) => ({
          id: m.subjectId,
          name: m.subjectName,
        }))}
        onSubmit={handleAddMark}
        loading={submitting}/>


      {/* <AddMarkForm
        subjects={data.marks.map((m) => ({
          id: m.subjectId,
          name: m.subjectName,
        }))}
        onSubmit={handleAddMark}
        loading={submitting}
      /> */}
    </div>
  );
}

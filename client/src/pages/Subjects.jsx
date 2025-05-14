// src/pages/SubjectsPage.jsx
import { useEffect, useState } from "react";
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../api/api.js";
import SubjectForm from "../components/SubjectForm.jsx";
import SubjectList from "@/components/SubjectList.jsx";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await getSubjects();
      setSubjects(res?.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (subjectData) => {
    if (editingSubject) {
      await updateSubject(editingSubject._id, subjectData);
    } else {
      await createSubject(subjectData);
    }
    setEditingSubject(null);
    fetchSubjects();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      await deleteSubject(id);
      fetchSubjects();
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="w-full space-y-4  mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl md:text-xl sm:text-lg font-semibold">
          Subjects List
        </h2>

        <SubjectForm
          onSubmit={handleAddOrUpdate}
          initialData={editingSubject}
          onCancel={() => setEditingSubject(null)}
        />
      </div>

      <SubjectList
        subjects={subjects}
        onEdit={setEditingSubject}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

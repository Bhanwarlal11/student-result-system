import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { createStudent } from "@/api/api.js"; // <-- uses your API file
  
  export default function AddStudentDialog({ onStudentAdded }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
      name: "",
      rollNumber: "",
      dob: "",
      fatherName: "",
      motherName: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      if (error) setError("");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      try {
        await createStudent(form);
        onStudentAdded(); // Refresh the list
        setForm({
          name: "",
          rollNumber: "",
          dob: "",
          fatherName: "",
          motherName: "",
        });
        setOpen(false);
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to add student";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-black">Add Student</Button>
        </DialogTrigger>
  
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
  
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="rollNumber"
              placeholder="Roll Number"
              value={form.rollNumber}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="dob"
              placeholder="DOB"
              value={form.dob}
              onChange={handleChange}
              required
            />
            <Input
              name="fatherName"
              placeholder="Father's Name"
              value={form.fatherName}
              onChange={handleChange}
              required
            />
            <Input
              name="motherName"
              placeholder="Mother's Name"
              value={form.motherName}
              onChange={handleChange}
              required
            />
  
            {error && <p className="text-red-600 text-sm">{error}</p>}
  
            <Button type="submit" className="text-black" variant="outline" disabled={loading}>
              {loading ? "Adding..." : "Add Student"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
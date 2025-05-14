"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AddMarkForm({ subjects, onSubmit, loading }) {
  const [open, setOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [scoredMarks, setScoredMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectId || !scoredMarks || !totalMarks) return;

    onSubmit({
      subjectId,
      scoredMarks: Number(scoredMarks),
      totalMarks: Number(totalMarks),
    });

    // Reset fields
    setSubjectId("");
    setScoredMarks("");
    setTotalMarks("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 text-black ">Add Mark</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Mark</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id || s._id} value={s.id || s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Scored"
            value={scoredMarks}
            onChange={(e) => setScoredMarks(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Total"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            className="border p-2 rounded"
          />

          <DialogFooter className="col-span-full">
            <Button type="submit" disabled={loading} className="text-black">
              {loading ? "Adding..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

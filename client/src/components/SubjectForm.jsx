import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SubjectForm({ onSubmit, initialData, onCancel }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setName(initialData.name);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name.trim()) {
      setError("Subject name is required.");
      return;
    }

    try {
      await onSubmit({ name });
      setName("");
      setError("");
    } catch (err) {
      // If onSubmit throws, show message
      const message = err?.response?.data?.message || "Something went wrong.";
      setError(message);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
    if (error) setError(""); // clear error on input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 w-full md:w-[300px] flex  gap-2"
    >
      <Input
        placeholder="Enter subject name"
        value={name}
        onChange={handleChange}
        required
      />
      {error && (
        <p className="text-sm text-red-600 -mt-1">{error}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" className="text-black">
          {initialData ? "Update" : "Add"}
        </Button>
        {initialData && (
          <Button variant="outline" className="text-black" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

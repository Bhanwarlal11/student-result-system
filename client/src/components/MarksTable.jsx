import AddMarkForm from "./AddMarkForm";
import MarkRow from "./MarkRow";
import { ClipboardListIcon } from "lucide-react";

export default function MarksTable({
  marks,
  onDelete,
  subjects,
  onSubmit,
  loading,
}) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl overflow-x-auto space-y-4 border border-gray-100">
      {/* Header and Add Mark Form */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 flex-wrap">
          <ClipboardListIcon className="w-5 h-5  shrink-0" />
          <span className="break-words">Marks Details</span>
        </h2>

        <AddMarkForm
          subjects={subjects}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className=" text-gray-600 text-sm border-b">
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4 text-left">Scored</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {marks.length > 0 ? (
              marks.map((mark) => (
                <MarkRow key={mark.subjectId} mark={mark} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No marks added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

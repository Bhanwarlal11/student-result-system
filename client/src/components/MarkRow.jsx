import { Trash2Icon } from "lucide-react"; 

export default function MarkRow({ mark, onDelete }) {
    return (
      <tr className="border-b">
        <td className="py-2">{mark.subjectName}</td>
        <td>{mark.scoredMarks ?? "-"}</td>
        <td>{mark.totalMarks ?? "-"}</td>
        <td>
          {mark._id && (
            <button
              className="text-red-500 hover:underline"
              onClick={() => onDelete(mark._id)}
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          )}
        </td>
      </tr>
    );
  }
  
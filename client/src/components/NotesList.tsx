"use client";

import useNotesList from "@/hooks/useNotesList";
import { useRouter, useSearchParams } from "next/navigation";

const NotesList = () => {
  const { notes, loading } = useNotesList();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentNoteId = searchParams.get("noteId");

  const handleSelectNote = (id: string) => {
    router.push(`/notes?noteId=${id}`);
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading notes...</div>;
  }

  if (notes.length === 0) {
    return <div className="p-4 text-gray-500">No notes found.</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => handleSelectNote(note.id)}
          className={`p-3 rounded-md cursor-pointer transition-colors ${
            currentNoteId === note.id
              ? "bg-blue-100 border-blue-500 border"
              : "hover:bg-gray-100 border border-transparent"
          }`}
        >
          <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
          <p className="text-sm text-gray-500 truncate">{note.description}</p>
          <span className="text-xs text-gray-400 mt-2 block">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotesList;

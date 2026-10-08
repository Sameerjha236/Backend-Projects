"use client";

import parse from "html-react-parser";
import useNoteDetail from "@/hooks/useNoteDetail";
import { useSearchParams } from "next/navigation";

const NoteDetail = () => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId");
  const { note, loading } = useNoteDetail(noteId);

  if (!noteId) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Select a note to start reading
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex h-full items-center justify-center text-red-400">
        Note not found
      </div>
    );
  }

  return (
    <main className="h-full overflow-y-auto bg-white">
      <article className="mx-auto max-w-4xl px-10 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {note.title}
        </h1>

        {note.description && (
          <p className="mt-3 text-lg text-gray-500">{note.description}</p>
        )}

        <div className="my-8 h-px bg-gray-100" />

        <div className="prose max-w-none text-gray-800">
          {parse(note.content)}
        </div>
      </article>
    </main>
  );
};

export default NoteDetail;

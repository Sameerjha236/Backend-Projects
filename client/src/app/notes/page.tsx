import NotesList from "@/components/NotesList";
import NoteDetail from "@/components/NoteDetail";
import { Suspense } from "react";

const NotesPage = () => {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/3 min-w-75 border-r border-gray-200">
        <Suspense fallback={<div>Loading...</div>}>
          <NotesList />
        </Suspense>
      </div>
      <div className="w-2/3 flex-1 bg-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
          <NoteDetail />
        </Suspense>
      </div>
    </div>
  );
};

export default NotesPage;

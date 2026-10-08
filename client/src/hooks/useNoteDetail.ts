import api from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface NoteDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const useNoteDetail = (noteId: string | null) => {
  const [note, setNote] = useState<NoteDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNoteDetail = async () => {
      if (!noteId) {
        setNote(null);
        return;
      }
      try {
        setLoading(true);
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}`,
        );
        setNote(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to fetch note detail",
        );
        console.error(error);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetail();
  }, [noteId]);

  return { note, loading };
};

export default useNoteDetail;

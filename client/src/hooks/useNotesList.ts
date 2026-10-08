import api from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface NoteItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const useNotesList = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`);
      setNotes(res.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch notes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotes();
  }, []);

  return { notes, loading, fetchNotes };
};

export default useNotesList;

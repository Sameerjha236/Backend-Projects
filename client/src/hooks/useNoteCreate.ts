import api from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

const useNoteCreate = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Note content is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes`,
        {
          title,
          desc,
          content,
        },
      );
      toast.success(res.data.message);
      setTitle("");
      setDesc("");
      setContent("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create note");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    desc,
    setDesc,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
  };
};

export default useNoteCreate;

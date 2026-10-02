import api from "@/lib/api";
import { useState, useRef } from "react";
import { toast } from "sonner";

const useNoteUpload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);

    if (file) {
      formData.append("file", file);
    }
    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/upload`,
        formData,
      );
      toast.success(res.data.message);
      setTitle("");
      setDesc("");
      removeFile();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return {
    title,
    setTitle,
    file,
    fileInputRef,
    desc,
    setDesc,
    handleFileChange,
    removeFile,
    handleSubmit,
  };
};

export default useNoteUpload;

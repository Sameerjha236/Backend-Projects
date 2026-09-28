import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );

      sessionStorage.setItem("access_token", res.data.data.accessToken);
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return {
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
  };
};

export default useLogin;

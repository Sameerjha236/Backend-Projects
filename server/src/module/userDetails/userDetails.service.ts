import type { UserDetail } from "../../types/user";
import axios from "axios";

export async function getUserDetails(): Promise<UserDetail[]> {
  const response = await axios.get<UserDetail[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );
  console.log("response.data", response.data);
  return response.data.slice(0, 10);
}

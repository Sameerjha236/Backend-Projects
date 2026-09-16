import { UserDetail } from "@/types/UserDetail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserDetails = async () => {
  const response = await axios.get<UserDetail[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-details`,
  );
  return response.data;
};

const useUserDetails = () => {
  const {
    data: users = [] as UserDetail[],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetails(),
  });
  return { users, isLoading, error, refetch };
};

export default useUserDetails;

import api from "@/lib/api";
import type { PaginatedResponse } from "@/types/pagination";
import type { UserDetail } from "@/types/UserDetail";
import { useQuery } from "@tanstack/react-query";

const getUserDetails = async (
  page: number,
  limit: number,
): Promise<PaginatedResponse<UserDetail>> => {
  const response = await api.get<PaginatedResponse<UserDetail>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-details`,
    { params: { page, limit } },
  );
  return response.data;
};

const useUserDetails = (page: number = 1, limit: number = 10) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userDetails", page, limit], // re-fetches when page or limit changes
    queryFn: () => getUserDetails(page, limit),
  });

  return {
    users: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: data?.page ?? page,
    isLoading,
    error,
    refetch,
  };
};

export default useUserDetails;

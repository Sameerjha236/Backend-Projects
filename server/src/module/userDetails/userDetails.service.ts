import type { PaginatedResponse } from "../../types/pagination";
import type { UserDetail } from "../../types/user";
import axios from "axios";

export async function getUserDetails(
  page: number,
  limit: number,
): Promise<PaginatedResponse<UserDetail>> {
  const response = await axios.get<UserDetail[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const allItems = response.data;
  const total = allItems.length;
  const totalPages = Math.ceil(total / limit);

  // Clamp page to valid range
  const safePage = Math.max(1, Math.min(page, totalPages));
  const offset = (safePage - 1) * limit;
  const data = allItems.slice(offset, offset + limit);

  return { data, total, page: safePage, limit, totalPages };
}

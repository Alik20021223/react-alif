import { UserType } from "@widgets/table/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "@enteties/services/users-service";

const LIMIT = 4;

// Хук для получения данных пользователей с пагинацией
export function useGetUsers() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({
      pageParam = 1,
    }): Promise<{
      data: UserType[] | undefined;
      currentPage: number;
      nextPage: number | null;
    }> => {
      const items = await fetchUsers();
      return new Promise((resolve) => {
        if (items) {
          resolve({
            data: items?.slice(pageParam, pageParam + LIMIT),
            currentPage: pageParam,
            nextPage:
              pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
          });
        }
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.currentPage - 1,
  });

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

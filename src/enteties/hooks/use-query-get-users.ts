import { UserType } from "@widgets/table/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "@enteties/services/users-service";

const LIMIT = 10;

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
      pageParam = 0, // Устанавливаем начальный параметр как 0
    }): Promise<{
      data: UserType[] | undefined;
      currentPage: number;
      nextPage: number | null;
    }> => {
      const items = await fetchUsers();
      return new Promise((resolve) => {
        if (items) {
          resolve({
            data: items.slice(pageParam, pageParam + LIMIT), // Корректный срез элементов
            currentPage: pageParam,
            nextPage:
              pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
          });
        }
      });
    },
    initialPageParam: 0, // Начинаем с 0, чтобы избежать пропуска элементов
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.currentPage > 0 ? firstPage.currentPage - LIMIT : null,
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

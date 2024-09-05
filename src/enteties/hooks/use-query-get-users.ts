import { UserType } from "@widgets/table/types";
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchUsers } from "@enteties/services/users-service";

const LIMIT = 4

export async function fetchItems({ pageParam = 1 }: { pageParam: number }): Promise<{
    data: UserType[] | undefined;
    currentPage: number;
    nextPage: number | null;
}> {
    const items = await fetchUsers()
    return new Promise((resolve) => {
        if (items) {
            resolve({
                data: items?.slice(pageParam, pageParam + LIMIT),
                currentPage: pageParam,
                nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : 1,
            });
        }
    });
}


export function useGetUsers() {
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchItems,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    return { data, fetchNextPage, isFetchingNextPage }
}

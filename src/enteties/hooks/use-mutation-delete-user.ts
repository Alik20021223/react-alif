
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@enteties/services/users-service";

export function useMutationDeleteUser() {

    const queryClient = useQueryClient();

    const {
        mutateAsync,
        isSuccess,
        isError,
        isPending,
        isIdle
    } = useMutation(
        {
            mutationKey: [`delete-user`],
            mutationFn: (payload: string) => deleteUser(payload),
            onSuccess: () => queryClient.invalidateQueries()
        }
    );

    return {
        isError, isSuccess, mutateAsync, isPending, isIdle
    }
}

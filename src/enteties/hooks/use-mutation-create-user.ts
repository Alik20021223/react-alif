
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "@widgets/table/types";
import { createUser } from "../services/users-service";

export function useMutationCreateUser() {

    const queryClient = useQueryClient();

    const {
        mutateAsync,
        isSuccess,
        isError,
        isPending,
        isIdle
    } = useMutation(
        {
            mutationKey: [`create-user`],
            mutationFn: (payload: UserType) => createUser(payload),
            onSuccess: () => queryClient.invalidateQueries()
        }
    );

    return {
        isError, isSuccess, mutateAsync, isPending, isIdle
    }
}

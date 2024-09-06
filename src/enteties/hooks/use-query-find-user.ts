import { UserTypeForm } from "@widgets/form/types";
import { useQuery } from "@tanstack/react-query";
import { findUser } from "../services/users-service";


const initialData: UserTypeForm = {
    name: '',
    role: '',
    team: '',
    status: '',
    avatar: '',
    email: '',
}

export function useQueryFindUser(id: string | null) {
    const {
        isLoading,
        isError,
        data,
        error
    } = useQuery<UserTypeForm>(
        {
            queryKey: ['user/find', id],
            queryFn: () => findUser(id),
            select: (data) => {
                return data;
            },
            initialData,
            enabled: id !== null,
        }
    );

    return {
        isLoading, isError, data, error
    }
}

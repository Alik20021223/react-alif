import { useQuery } from "@tanstack/react-query";
import { findUser } from "../services/users-service";
import { UserTypeForm } from "@/widgets/form/types";

const initialData: UserTypeForm = {
    name: '',
    role: '',
    team: '',
    status: [''], // Изначально статус - это массив
    avatar: '',
    email: '',
};

export function useQueryFindUser(id: string | null) {
    const {
        data = initialData, // Убедитесь, что всегда есть начальные данные
    } = useQuery<UserTypeForm>(
        {
            queryKey: ['user/find', id],
            queryFn: () => findUser(id),
            initialData,
            enabled: id !== null,
        }
    );

    // Преобразование статус в массив, если это строка
    const editData = {
        ...data,
        status: typeof data.status === 'string' ? [data.status] : data.status, // Проверка и преобразование
    };

    return { editData };
}

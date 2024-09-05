import { UserType } from "@widgets/table/types";
import axios from "axios"

export const fetchUsers = async () => {
    try {
        const response = await axios.get<UserType[]>('https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/users');
        return response.data;
    } catch (error) {
        alert(`Произошла ошибка: ${error}`)
    }
};
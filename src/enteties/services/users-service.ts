import { UserTypeForm } from "@widgets/form/types";
import { UserType } from "@widgets/table/types";
import axios from "axios"

export const fetchUsers = async () => {
    try {
        const response = await axios.get<UserType[]>('https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/users');
        console.log(response.data);

        return response.data;
    } catch (error) {
        alert(`Произошла ошибка: ${error}`)
    }
};

export const deleteUser = async (id: string) => {

    try {
        const response = await axios.delete(`https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/users/${id}`);
        console.log(response);
    }
    catch (error) {
        alert(`Произошла ошибка: ${error}`)
    }
}

export const createUser = async (payload: UserTypeForm) => {
    try {
        const response = await axios.post(`https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/users`, payload);
        console.log(response);
    }
    catch (error) {
        alert(`Произошла ошибка: ${error}`)
    }
}

export const findUser = async (id: string | null) => {
    if (!id) {
        throw new Error("ID cannot be null"); // Явно выбрасываем ошибку, если id null
    }

    try {
        const response = await axios.get<UserTypeForm>(`https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/users/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Если ошибка - выбрасываем ее, чтобы обработать на уровне компонента
        throw new Error(`Произошла ошибка: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};


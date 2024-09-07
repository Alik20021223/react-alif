import { z } from "zod"
import { formSchema } from "./validation"

export type FormModalAddAndEditType = {
    payload?: UserTypeForm,
    onOpenChange: (value: boolean) => void,
    formSubmit: (data: UserTypeForm) => void
}

export interface UserTypeForm {
    name: string;
    role: string;
    team: string;
    status: string[]; // Измените здесь на string[]
    avatar: string;
    email: string;
}

export type formType = z.infer<typeof formSchema>
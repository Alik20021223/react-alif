import { z } from "zod"
import { formSchema } from "./validation"
import { UserType } from "../table/types";

export type FormModalAddAndEditType = {
    payload?: UserTypeForm | UserType,
    onOpenChange: (value: boolean) => void,
    formSubmit: (data: UserTypeForm) => void
}

export interface UserTypeForm {
    name: string;
    role: string;
    team: string;
    status: string[];
    avatar: string;
    email: string;
}

export type formType = z.infer<typeof formSchema>
import { UserTypeForm } from "../form/types"

export type ModalType = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: (data: UserTypeForm) => void,
    edit: boolean,
    payload: UserTypeForm,
}
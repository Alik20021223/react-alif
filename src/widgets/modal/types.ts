import { UserTypeForm } from "../form/types"
import { UserType } from "../table/types"

export type ModalType = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: (data: UserTypeForm) => void,
    edit: boolean,
    payload?: UserType,
}
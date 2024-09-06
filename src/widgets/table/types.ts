export type CustomTableType = {
    columns: ColumnsType[],
    users: UserType[],
    ref: (node?: Element | null) => void,
    isFetchingNextPage: boolean,
    onDelete: (id: string) => void,
    onEdit: (id: string) => void,
}

type ColumnsType = {
    name: string,
    uid: string,
}

export type UserType = {
    id: string;
    name: string;
    role: string;
    team: string;
    status: string;
    avatar: string;
    email: string;
}


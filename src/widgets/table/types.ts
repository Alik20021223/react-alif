export type CustomTableType = {
    columns: ColumnsType[],
    users: UsersTypeData,
    ref: (node?: Element | null) => void,
    isFetchingNextPage: boolean,
}

type ColumnsType = {
    name: string,
    uid: string,
}

type Page = {
    currentPage: number,
    nextPage: number | null,
    data: UserType[]
}


export type UserType = {
    id: number;
    name: string;
    role: string;
    team: string;
    status: string;
    avatar: string;
    email: string;
}

export type UsersTypeData = {
    pageParams: number[],
    pages: Page[]
};
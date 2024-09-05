import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, User, Chip, ChipProps } from "@nextui-org/react";
import { CustomTableType, UserType } from './types';
import Icon from '@components/icon';

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const CustomTable: React.FC<CustomTableType> = ({ columns, users, ref, isFetchingNextPage }) => {

    console.log(users);
    

    const renderCell = React.useCallback((user: UserType, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof UserType];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit user">
                            <Icon name='write' className='text-lg text-default-400 cursor-pointer active:opacity-50' />
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <Icon name='delete' className='text-lg text-danger cursor-pointer active:opacity-50' />
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn className='text-black' key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users.pages}>
                    {(page) => (
                        <React.Fragment key={page.currentPage}>
                            {page.data.map((user: UserType) => (
                                <TableRow key={user.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(user, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </React.Fragment>
                    )}
                </TableBody>
            </Table>
            <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
        </>
    )
}

export default CustomTable

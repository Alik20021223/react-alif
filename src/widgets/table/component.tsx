import React, { forwardRef } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, User, Chip, ChipProps, Spinner, Button } from "@nextui-org/react";
import { CustomTableType, UserType } from './types';
import { EditIcon } from '@shared/components/icon/EditIcon';
import { DeleteIcon } from '@shared/components/icon/DeleteIcon';

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const CustomTable = forwardRef<HTMLDivElement, CustomTableType>(
    ({ columns, users, isFetchingNextPage, onDelete, onEdit }, ref) => {
        const renderCell = React.useCallback((user: UserType, columnKey: React.Key) => {
            const cellValue = user[columnKey as keyof UserType];

            switch (columnKey) {
                case "name":
                    return (
                        <User
                            avatarProps={{ radius: "lg", src: user.avatar }}
                            description={user.email}
                            name={cellValue}
                            className='text-black'
                        >
                            {user.email}
                        </User>
                    );
                case "role":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize text-black">{cellValue}</p>
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
                        <div className="flex items-center justify-center gap-2">
                            <Tooltip content="Edit user" className='text-white' color='primary'>
                                <Button onPress={() => onEdit(user.id)} isIconOnly className="text-lg text-white bg-primary cursor-pointer active:opacity-50">
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <Button onPress={() => onDelete(user.id)} isIconOnly className="text-lg bg-danger-400 text-white cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </Button>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        }, []);

        return (
            <>
                <Table
                    aria-label="Example table with custom cells"
                    isHeaderSticky
                    bottomContent={
                        (
                            <div ref={ref} className="flex w-full justify-center text">
                                {isFetchingNextPage && <Spinner label='Loading' color="success" size="md" />}
                            </div>
                        )
                    }
                    classNames={{
                        base: "max-h-[520px] overflow-y-scroll",
                        table: "min-h-[420px]",
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn className='text-black' key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody isLoading={isFetchingNextPage} items={users}>
                        {(user) => (
                            <TableRow key={user.id}>
                                {columns.map((column) => {
                                    const columnKey = column.uid;
                                    return (
                                        <TableCell key={`${user.id}-${columnKey}`}>
                                            {renderCell(user, columnKey)}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )}
                    </TableBody>

                </Table >
            </>
        );
    })

export default CustomTable;

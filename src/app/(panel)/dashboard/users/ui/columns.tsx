"use client";

import { updateRolAction } from "@/server/actions/update-user-rol-action";
import useUserStore from "@/store/useStore";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { addToast, Button, Select, SelectItem } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table"
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

interface UserColumn {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'agent' | 'admin';
}


export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const idUser = row.getValue('id') as number;
            return (
                <p className="line-clamp-1 w-20 flex ">{idUser}</p>
            );
        }
    },
    {
        accessorKey: 'name',
        header: 'Nombre',
        cell: ({ row }) => {
            const nameUser = row.getValue('name') as string;
            return (
                <p className="line-clamp-1 flex">{nameUser}</p>
            );
        }
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => {
            const emailProduct = row.getValue('email') as string;
            return (
                <p className="line-clamp-1 flex">{emailProduct}</p>
            );
        }
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const { currenUserId, setRole: newRoleUser } = useUserStore();
            const roleOptions = [
                { key: "user", label: "User" },
                { key: "agent", label: "Agent" },
                { key: "admin", label: "Admin" },
            ];
            const roleUser = row.getValue('role') as 'user' | 'agent' | 'admin';
            const [role, setRole] = useState<'user' | 'agent' | 'admin'>(roleUser);
            const idUser = row.getValue('id') as number;

            return (
                <Select
                    className="max-w-xs"
                    items={roleOptions}
                    isDisabled={currenUserId === idUser ? false : true}
                    label="Role"
                    color={role === "user" ? "danger" : role === "agent" ? "warning" : "success"}
                    placeholder="Seleccionar role"
                    value={role}
                    defaultSelectedKeys={[role]}
                    onChange={(value) => {
                        console.log(value);
                        setRole(value.target.value as 'user' | 'agent' | 'admin');
                        newRoleUser(value.target.value as 'user' | 'agent' | 'admin');

                    }}
                >
                    {(roleOption) => <SelectItem key={roleOption.key} className="">{roleOption.label}</SelectItem>}
                </Select>
            );
        }
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {

            const { currenUserId, role, setCurrenUserId, setEdit, cleanStore } = useUserStore();

            const { execute, status } = useAction(updateRolAction, {
                onSuccess: ({ data }) => {
                    if (data) {
                        if (data.ok) {
                            addToast({
                                title: "Exito",
                                description: data.msg,
                                variant: "bordered",
                                color: "success",
                                timeout: 3000,
                                shouldShowTimeoutProgress: true,
                                closeIcon: (
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ),
                            });
                            window.location.reload();
                        }
                        if (!data.ok) {
                            addToast({
                                title: "Error",
                                description: data.msg,
                                variant: "bordered",
                                color: "danger",
                                timeout: 3000,
                                shouldShowTimeoutProgress: true,
                                closeIcon: (
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ),
                            });
                        }
                    };

                }
            })
            const userRol = row.getValue('role') as 'user' | 'agent' | 'admin';
            return (
                <div className="flex gap-2">
                    {currenUserId === row.getValue('id') ? (
                        <Button
                            variant="bordered"
                            size="md"
                            disabled={status === 'executing'}
                            onPress={() => {
                                if (userRol === role || !userRol) {
                                    return;
                                }
                                // console.log(currenUserId);
                                // console.log(role);
                                // console.log(userRol);
                                execute({ idUser: currenUserId, role: role as 'user' | 'agent' | 'admin' });
                                cleanStore();
                            }}
                        >
                            Guardar
                        </Button>
                    ) : (
                        <Button
                            variant="bordered"
                            size="md"
                            disabled={status === 'executing'}
                            // onPress={() => execute({ id: 2, agentId: 2 })}
                            onPress={() => {
                                cleanStore();
                                setCurrenUserId(row.getValue('id') as number);
                                setEdit(true);
                            }}
                        >
                            Editar
                        </Button>
                    )}

                </div>
            )
        }
    }
];
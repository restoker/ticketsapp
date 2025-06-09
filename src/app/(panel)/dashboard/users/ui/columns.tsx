"use client";

import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Button, Select, SelectItem } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table"
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
            const roleOptions = [
                { key: "user", label: "User" },
                { key: "agent", label: "Agent" },
                { key: "admin", label: "Admin" },
            ];
            const roleProduct = row.getValue('role') as string;
            const [role, setRole] = useState(roleProduct);
            const idUser = row.getValue('id') as number;

            return (
                <Select
                    className="max-w-xs"
                    items={roleOptions}
                    label="Role"
                    placeholder="Seleccionar role"
                    value={role}
                    defaultSelectedKeys={[role]}
                    onChange={(value) => {
                        console.log(value);
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
            return (
                <Button variant="shadow" className="h-8 w-8 bg-transparent" size={'sm'}>
                    <EllipsisHorizontalCircleIcon className="size-7 cursor-pointer" />
                </Button>
            )
        }
    }
];
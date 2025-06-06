"use client";

import { ColumnDef } from "@tanstack/react-table"
// import Link from "next/link";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from "@heroui/react";

type TicketColumn = {
    id: number;
    title: string;
    creado: string;
    priority: string;
    // description: string;
    status: string;

}

export const columns: ColumnDef<TicketColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const idProduct = row.getValue('id') as number;
            return (
                <p className="line-clamp-1 w-20 flex ">{idProduct}</p>
            );
        }
    },
    {
        accessorKey: 'title',
        header: 'Tittle',
        cell: ({ row }) => {
            const titleProduct = row.getValue('title') as string;
            return (
                <p className="line-clamp-1 flex">{titleProduct}</p>
            );
        }
    },
    {
        accessorKey: 'creado',
        header: 'Created',
        cell: ({ row }) => {
            const createdAt = row.getValue('creado') as string;
            const date = new Date(createdAt);
            const options = {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
            } as const;
            const fecha = date.toLocaleDateString("es-PE", options);
            return (
                <p className="line-clamp-1 flex">{fecha}</p>
            );
        }
    },
    {
        accessorKey: 'priority',
        header: 'Asignar prioridad',
        cell: ({ row }) => {
            const priorityOptions = [
                { key: "low", label: "Low" },
                { key: "medium", label: "Medium" },
                { key: "high", label: "High" },
            ];
            const priority = row.getValue('priority') as string;
            // const openModal = modalStore(state => state.openModal);
            return (
                <Select
                    className="max-w-xs"
                    items={priorityOptions}
                    label="Prioridad"
                    placeholder="Seleccionar prioridad"
                    value={priority}
                    color={priority === "low" ? "success" : priority === "medium" ? "warning" : "danger"}
                    defaultSelectedKeys={[priority]}
                    onChange={(value) => {
                        console.log(value);
                    }}
                >
                    {(priorityOption) => <SelectItem className="">{priorityOption.label}</SelectItem>}
                </Select>
            )
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const statusProduct = row.getValue('status') as string;
            return (
                <p className="line-clamp-1 flex">{statusProduct}</p>
            );
        }

    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            // const product = row.original;
            // const openModal = modalStore(state => state.openModal);
            return (
                <Dropdown className="">
                    <DropdownTrigger>
                        <Button variant={"shadow"} className="h-8 w-8 bg-transparent" size={'sm'}>
                            <EllipsisHorizontalCircleIcon className="size-7 cursor-pointer" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Action event example">
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem> */}
                        <DropdownItem
                            key={'edit'}
                            className="cursor-pointer"
                            color="default"
                        >
                            {/* <Link href={`/dashboard/addproduct?id=${product.id}`}> */}
                            Edit product
                            {/* </Link> */}
                        </DropdownItem>
                        <DropdownItem
                            key={'delete'}
                            className="text-red-500 cursor-pointer"
                            color="danger"
                        // onClick={() => openModal(product.id)}
                        >
                            Delete product
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            )
        }
    }
]

'use client';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ColumnDef } from '@tanstack/react-table';

export type Agent = {
    id: number;
    title: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high";
    creado: string;
    // updated: string;
};

export const columns: ColumnDef<Agent>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const idProduct = row.getValue('id') as string;
            return (
                <p className="line-clamp-1 w-20 flex justify-start">{idProduct}</p>
            );
        }
    },
    {
        accessorKey: 'title',
        header: 'Titulo',
        cell: ({ row }) => {
            const titleProduct = row.getValue('title') as string;
            return (
                <p className="line-clamp-1 flex justify-start">{titleProduct}</p>
            );
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const statusProduct = row.getValue('status') as string;
            return (
                <p className="line-clamp-1 flex justify-start">{statusProduct}</p>
            );
        }
    },
    {
        accessorKey: 'priority',
        header: 'Prioridad',
        cell: ({ row }) => {
            const priorityProduct = row.getValue('priority') as string;
            return (
                <p className="line-clamp-1 flex justify-start">{priorityProduct}</p>
            );
        }
    },
    {
        accessorKey: 'creado',
        header: 'Creado',
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
        accessorKey: 'actions',
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
                            Atender
                            {/* </Link> */}
                        </DropdownItem>
                        <DropdownItem
                            key={'delete'}
                            className="text-red-500 cursor-pointer"
                            color="danger"
                        // onClick={() => openModal(product.id)}
                        >
                            Ignorar
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            )
        }
    },
];
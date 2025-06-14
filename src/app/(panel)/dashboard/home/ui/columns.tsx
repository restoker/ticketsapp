"use client";

import { ColumnDef } from "@tanstack/react-table"
// import Link from "next/link";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Link from "next/link";

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
                <p className="line-clamp-1 w-20 flex justify-start">{idProduct}</p>
            );
        }
    },
    {
        accessorKey: 'title',
        header: 'Tittle',
        cell: ({ row }) => {
            const titleProduct = row.getValue('title') as string;
            return (
                <p className="line-clamp-1 flex justify-start">{titleProduct}</p>
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
        header: 'Priority',
        cell: ({ row }) => {
            const priorityProduct = row.getValue('priority') as string;
            return (
                <p className="line-clamp-1 flex">{priorityProduct}</p>
            );
        }
        // cell: ({ row }) => {
        //     const price = parseFloat(row.getValue('price'));
        //     const formatted = new Intl.NumberFormat('es-PE', {
        //         currency: 'PEN',
        //         style: "currency",
        //     }).format(price);//https://hpneo.dev/2019/05/13/apis-internacionalizacion.html
        //     return (
        //         <div className="font-medium text-sm">
        //             {formatted}
        //         </div>
        //     );
        // },
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
        // cell: ({ row }) => {
        //     const cellImage = row.getValue('image') as string;
        //     const cellTitle = row.getValue('title') as string;
        //     return (
        //         <div className="h-14 w-14">
        //             <img src={cellImage} alt={cellTitle} className="rounde-lg h-14 w-14 object-cover" />
        //         </div>
        //     );
        // }
    },
    // {
    //     accessorKey: 'created',
    //     header: 'Creado',
    // },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            // const product = row.original;
            const id = row.getValue('id') as number;
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
                            <Link href={`/dashboard/task/${id}`}>
                                Ver ticket
                            </Link>
                        </DropdownItem>
                        <DropdownItem
                            key={'delete'}
                            className="text-red-500 cursor-pointer"
                            color="danger"
                        // onClick={() => openModal(product.id)}
                        >
                            Cerrar ticket
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            )
        }
    }
]

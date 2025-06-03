"use client"


import { ColumnDef } from "@tanstack/react-table"
// import Link from "next/link";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Button, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";

export type TicketColumn = {
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
                <p className="line-clamp-1">{idProduct}</p>
            );
        }
    },
    {
        accessorKey: 'title',
        header: 'Tittle',
        cell: ({ row }) => {
            const titleProduct = row.getValue('title') as string;
            return (
                <p className="line-clamp-1">{titleProduct}</p>
            );
        }
    },
    {
        accessorKey: 'creado',
        header: 'Created',
        cell: ({ row }) => {
            const createdAt = row.getValue('createdAt') as string;
            return (
                <p className="line-clamp-1">{createdAt}</p>
            );
        }
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
            const priorityProduct = row.getValue('priority') as string;
            return (
                <p className="line-clamp-1">{priorityProduct}</p>
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
                <p className="line-clamp-1">{statusProduct}</p>
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
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            // const product = row.original;

            // const openModal = modalStore(state => state.openModal);

            return (
                <DropdownMenu>
                    <DropdownTrigger asChild>
                        <Button variant={"ghost"} className="h-8 w-8 bg-transparent" size={'sm'}>
                            <EllipsisHorizontalCircleIcon className="h-4 w-4 cursor-pointer" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem> */}
                        <DropdownItem
                            key={'1'}
                            className="dark:focus:bg-amber-500 focus:bg-amber-500/50 cursor-pointer"
                        >
                            {/* <Link href={`/dashboard/addproduct?id=${product.id}`}> */}
                            Edit product
                            {/* </Link> */}
                        </DropdownItem>
                        <DropdownItem
                            key={'2'}
                            className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
                        // onClick={() => openModal(product.id)}
                        >
                            Delete product
                        </DropdownItem>
                    </DropdownMenu>
                </DropdownMenu>

            )
        }
    }
]


// id: "actions",
// cell: ({ row }) => {
//     const payment = row.original

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-8 w-8 p-0">
//                     <span className="sr-only">Open menu</span>
//                     <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                 <DropdownMenuItem
//                     onClick={() => navigator.clipboard.writeText(payment.id)}
//                 >
//                     Copy payment ID
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>View customer</DropdownMenuItem>
//                 <DropdownMenuItem>View payment details</DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// },

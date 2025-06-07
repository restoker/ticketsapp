"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Select, SelectItem } from "@heroui/react";
import { Suspense } from "react";
import Loading from "../loading";

type TicketColumn = {
    id: number;
    title: string;
    creado: string;
    priority: string;
    // description: string;
    status: string;
    agentes: { id: number; name: string; role: "user" | "agent" | "admin"; email: string; }[];
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
        id: 'agentes',
        header: 'Designar Agente',
        cell: ({ row }) => {
            const agents = [...row.original.agentes];
            // const openModal = modalStore(state => state.openModal);
            return (
                <Suspense fallback={<Loading />}>
                    <Select
                        className="max-w-xs"
                        items={agents}
                        label="Agente"
                        placeholder="Seleccionar agente"
                        onChange={(value) => {
                            console.log(value.target.value);
                        }}
                    >
                        {(agent) => <SelectItem key={agent.id} className="">{agent.name}</SelectItem>}
                    </Select>
                </Suspense>
            )
        }
    }
]

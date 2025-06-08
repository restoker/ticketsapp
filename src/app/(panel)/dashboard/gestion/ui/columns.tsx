"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Button, Select, SelectItem } from "@heroui/react";
import { Suspense, useState } from "react";
import Loading from "../loading";
import { useAction } from "next-safe-action/hooks";
import { assignTaskAction } from "@/server/actions/assign-task-action";

type TicketColumn = {
    id: number;
    title: string;
    creado: string;
    priority: string;
    agente: { id: number; name: string; };
    // description: string;
    status: string;
    agentes: { id: number; name: string; }[];
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
        id: 'agente',
        header: 'Designar Agente',
        cell: ({ cell, row }) => {
            const [value, setValue] = useState<{ id: number, name: string }>({ id: 0, name: 'No asignado' })
            const agents = [...row.original.agentes, { id: 0, name: 'No asignado' }];
            // console.log(agents);
            const agent = row.original.agente;
            // console.log(agent);
            // const openModal = modalStore(state => state.openModal);
            return (
                <Suspense fallback={<Loading />}>
                    <Select
                        className="max-w-xs"
                        // items={agents}
                        disabled
                        label="Agente"
                        placeholder="Seleccionar agente"
                        // value={agent.name}
                        defaultSelectedKeys={[agent.id.toString()]}
                        onChange={(value) => {
                            setValue({
                                id: Number(value.target.value),
                                name: agents.find((agent) => agent.id === Number(value.target.value))?.name!,
                            });
                        }}
                    >
                        {/* {(agent) => <SelectItem key={agent.id} className="">{agent.name}</SelectItem>} */}
                        {agents.map((agent) => (
                            <SelectItem key={agent.id}>{agent.name}</SelectItem>
                        ))}
                    </Select>
                </Suspense>
            )
        }
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const { execute, status, result } = useAction(assignTaskAction);
            const value = row.getValue('agente') as { id: number, name: string };
            return (
                <div className="flex gap-2">
                    <Button
                        variant="bordered"
                        size="md"
                        onPress={() => execute({ id: '2', agentId: 2 })}
                    // onPress={() => console.log(row.original)}
                    >
                        guardar
                    </Button>
                </div>
            );
        },
    }
]

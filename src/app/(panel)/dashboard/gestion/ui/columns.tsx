"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Button, Select, SelectItem } from "@heroui/react";
import { Suspense, useState } from "react";
import Loading from "../loading";
import { useAction } from "next-safe-action/hooks";
import { assignTaskAction } from "@/server/actions/assign-task-action";
import useAdminStore from "@/store/adminStore";

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
            const [prioridad, setPrioridad] = useState(priority);
            const { currentTicketId, setTicketId, setAgentId, setPriority } = useAdminStore();
            const idTask = row.getValue('id') as number;
            // const openModal = modalStore(state => state.openModal);
            return (
                <Select
                    className="max-w-xs"
                    items={priorityOptions}
                    label="Prioridad"
                    isDisabled={currentTicketId === idTask ? false : true}
                    placeholder="Seleccionar prioridad"
                    value={prioridad}
                    color={prioridad === "low" ? "success" : prioridad === "medium" ? "warning" : "danger"}
                    defaultSelectedKeys={[prioridad]}
                    onChange={(value) => {
                        // console.log(value);
                        setPrioridad(value.target.value);
                        setPriority(value.target.value as 'low' | 'medium' | 'high');
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
            const { currentTicketId, setTicketId, setAgentId, setPriority } = useAdminStore();
            const agents = [...row.original.agentes, { id: 0, name: 'No asignado' }];
            const agent = row.original.agente;
            const [value, setValue] = useState<{ id: number, name: string }>(agent)
            const idTask = row.getValue('id') as number;
            // console.log(agents);
            // const openModal = modalStore(state => state.openModal);
            return (
                <Suspense fallback={<Loading />}>
                    <Select
                        className="max-w-xs"
                        items={agents}
                        isDisabled={currentTicketId === idTask ? false : true}
                        label="Agente"
                        placeholder="Seleccionar agente"
                        value={value.name}
                        defaultSelectedKeys={[agent.id.toString()]}
                        onChange={(value) => {
                            setValue({
                                id: Number(value.target.value),
                                name: agents.find((agent) => agent.id === Number(value.target.value))?.name!,
                            });
                            setAgentId(Number(value.target.value))
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
            const { currentTicketId, priority, agentId, setTicketId, setAgentId, setPriority } = useAdminStore();
            return (
                <div className="flex gap-2">
                    {currentTicketId === row.getValue('id') ? (
                        <Button
                            variant="bordered"
                            size="md"
                            disabled={status === 'executing'}
                            // onPress={() => execute({ id: 2, agentId: 2 })}
                            onPress={() => {
                                console.log(priority);
                                console.log(agentId);
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
                                setTicketId(row.getValue('id') as number);
                            }}
                        >
                            Editar
                        </Button>
                    )}

                </div>
            );
        },
    }
]

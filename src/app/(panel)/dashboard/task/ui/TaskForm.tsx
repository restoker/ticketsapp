'use client';
import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Avatar,
    Badge,
    Input,
    Form,
    Textarea,
    addToast,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { taskSchema } from "@/types/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CardProps } from "@heroui/react";

import { Icon } from "@iconify/react";
import { useAction } from "next-safe-action/hooks";
import { createTaskAction } from "@/server/actions/create-task-action";

// import countries from "./countries";

const TaskForm = (props: CardProps & { email: string, name: string }) => {

    const { execute, result, status } = useAction(createTaskAction, {
        onSuccess: ({ data }) => {
            if (data?.ok) {
                addToast({
                    title: data.msg,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: 'success',
                    classNames: {
                        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
                        content: "text-black",
                        description: "text-black",
                        title: "text-black",
                    },
                    closeIcon: (
                        <svg
                            fill="none"
                            height="32"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="32"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    ),
                });
                reset();
            } else {
                addToast({
                    title: data?.msg,
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: 'danger',
                    classNames: {
                        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
                        content: "text-black",
                        title: "text-black",
                        description: "text-black",
                    },
                    closeIcon: (
                        <svg
                            fill="none"
                            height="32"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="32"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    ),
                });
            }
        },
        onError: () => {
            addToast({
                title: 'Algo salio mal',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: 'danger',
                classNames: {
                    closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
                    content: "text-black",
                    description: "text-black",
                    title: "text-black",
                },
                closeIcon: (
                    <svg
                        fill="none"
                        height="32"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="32"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                ),
            });
        }
    });

    const { handleSubmit, control, setValue, reset } = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            email: props.email,
        },
    });

    const onSubmit = (data: any) => {
        // console.log(data);
        execute(data);
    }

    return (
        <>
            <Card className="max-w-2xl p-2 bg-black" {...props}>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                    <p className="text-large">Crear Ticket</p>
                    <div className="flex gap-4 py-4">
                        <Badge
                            showOutline
                            classNames={{
                                badge: "w-5 h-5",
                            }}
                            color="primary"
                            content={
                                <Button
                                    isIconOnly
                                    className="p-0 text-primary-foreground"
                                    radius="full"
                                    size="sm"
                                    variant="light"
                                >
                                    <Icon icon="solar:pen-2-linear" />
                                </Button>
                            }
                            placement="bottom-right"
                            shape="circle"
                        >
                            <Avatar className="h-14 w-14" src="https://cdn.cosmos.so/03c3c2be-9f18-4718-8a01-9c952941298b?format=jpeg" />
                        </Badge>
                        <div className="flex flex-col items-start justify-center">
                            <p className="font-medium">{props.name}</p>
                            <span className="text-small text-default-500">{props.email}</span>
                        </div>
                    </div>
                    <p className="text-small text-default-400">
                        Agrega el titulo y la descripción del ticket, para designarlo a un agente y pueda resolverlo.
                    </p>
                </CardHeader>
                <CardBody>
                    <Form validationBehavior="native" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full grid-cols-1 gap-4">
                            {/* Username */}
                            <Controller
                                control={control}
                                name="title"
                                render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                                    <Input
                                        ref={ref}
                                        isInvalid={invalid}
                                        errorMessage={error?.message}
                                        isRequired
                                        label="Titulo"
                                        name={name}
                                        value={value}
                                        type="text"
                                        variant="bordered"
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    />
                                )}
                                rules={{ required: "Titulo es requerido." }}
                            />
                            {/* Email */}
                            <Controller
                                control={control}
                                name="description"
                                render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                                    <Textarea
                                        isClearable
                                        ref={ref}
                                        isInvalid={invalid}
                                        errorMessage={error?.message}
                                        isRequired
                                        label="Descripción"
                                        name={name}
                                        variant="bordered"
                                        placeholder="Agregue una descripción especificando su problema."
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        onClear={() => setValue(name, "")}
                                    />
                                )}
                                rules={{ required: "Descripción es requerida." }}
                            />

                        </div>

                        <div className="mt-6 flex w-full justify-end gap-2">
                            <Button
                                radius="full"
                                variant="bordered"
                                onClick={() => reset()}
                            >
                                Cancelar
                            </Button>
                            <Button color="primary" radius="full" type="submit">
                                Crear Ticket
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}

export default TaskForm
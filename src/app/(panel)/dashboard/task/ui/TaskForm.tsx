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
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { taskSchema } from "@/types/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CardProps } from "@heroui/react";

import { Icon } from "@iconify/react";

// import countries from "./countries";

const TaskForm = (props: CardProps) => {

    const { handleSubmit } = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            email: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
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
                            <Avatar className="h-14 w-14" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                        </Badge>
                        <div className="flex flex-col items-start justify-center">
                            <p className="font-medium">Tony Reichert</p>
                            <span className="text-small text-default-500">Professional Designer</span>
                        </div>
                    </div>
                    <p className="text-small text-default-400">
                        The photo will be used for your profile, and will be visible to other users of the
                        platform.
                    </p>
                </CardHeader>
                <CardBody>
                    <Form validationBehavior="native" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full grid-cols-1 gap-4">
                            {/* Username */}
                            <Input
                                isRequired
                                label="Titulo"
                                labelPlacement="outside"
                                placeholder="Ingrese el título"
                            />
                            {/* Email */}
                            <Input
                                isRequired
                                label="Descripción"
                                labelPlacement="outside"
                                placeholder="Ingrese la descripción"
                            />

                        </div>

                        <div className="mt-6 flex w-full justify-end gap-2">
                            <Button radius="full" variant="bordered">
                                Cancel
                            </Button>
                            <Button color="primary" radius="full" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}

export default TaskForm
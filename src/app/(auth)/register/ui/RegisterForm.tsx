'use client';

import React from "react";
import { Button, Input, Checkbox, Link, Divider, Form, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./acme";
import { useAction } from 'next-safe-action/hooks'
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerAction } from "@/server/actions/signup-action";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const router = useRouter()
    const toggleVisibility = () => setIsVisible(!isVisible);

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log("handleSubmit");
    // };
    const { execute, status } = useAction(registerAction, {
        onSuccess: ({ data }) => {
            if (data) {
                if (data.ok) {
                    addToast({
                        title: data.msg,
                        timeout: 3000,
                        shouldShowTimeoutProgress: true,
                        color: 'success',
                        classNames: {
                            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
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
                    router.push('/login');
                }
                if (!data.ok) {
                    addToast({
                        title: data.msg,
                        timeout: 3000,
                        shouldShowTimeoutProgress: true,
                        color: 'danger',
                        icon: (<svg height={24} viewBox="0 0 24 24" width={24}>
                            <g
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={10}
                                strokeWidth={1.5}
                            >
                                <path
                                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                                    data-name="Stroke 1"
                                />
                                <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                            </g>
                        </svg>),
                        classNames: {
                            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
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
            }
        },
        onError: ({ error }) => {
            addToast({
                title: error.serverError,
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: 'danger',
                icon: (<svg height={24} viewBox="0 0 24 24" width={24}>
                    <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                    >
                        <path
                            d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                            data-name="Stroke 1"
                        />
                        <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                    </g>
                </svg>),
                classNames: {
                    closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
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
        },
    });

    const { handleSubmit, control } = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        // console.log(data);
        execute(data);
    };

    return (
        <>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="flex flex-col items-center pb-6">
                    <img src="https://cdn.cosmos.so/a480584a-2c25-42f5-a380-b080f07e787a?format=jpeg" alt="" className="size-20 w-auto object-cover" />
                    <p className="text-xl font-medium">Crear una cuenta</p>
                    <p className="text-small text-default-500">para continuar con Task-master</p>
                </div>
                <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 py-6 shadow-small">
                    <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                                <Input
                                    ref={ref}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                    isRequired
                                    label="Name"
                                    name={name}
                                    value={value}
                                    placeholder="Ingresa tu nombre"
                                    type="text"
                                    variant="bordered"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                            rules={{ required: "El nombre es requerido." }}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                                <Input
                                    ref={ref}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                    isRequired
                                    label="Email Address"
                                    name={name}
                                    value={value}
                                    placeholder="Ingresa tu email"
                                    type="email"
                                    variant="bordered"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                            rules={{ required: "El email es requerido." }}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                                <Input
                                    ref={ref}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                    isRequired
                                    endContent={
                                        <button type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <Icon
                                                    className="pointer-events-none text-2xl text-default-400"
                                                    icon="solar:eye-closed-linear"
                                                />
                                            ) : (
                                                <Icon
                                                    className="pointer-events-none text-2xl text-default-400"
                                                    icon="solar:eye-bold"
                                                />
                                            )}
                                        </button>
                                    }
                                    label="Password"
                                    name={name}
                                    value={value}
                                    placeholder="Ingresa tu contraseña"
                                    type={isVisible ? "text" : "password"}
                                    variant="bordered"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                            rules={{ required: "El password es requerido." }}
                        />


                        <Button
                            className="w-full"
                            color="primary"
                            type="submit"
                            disabled={status === 'executing'}
                        >
                            Registrarse
                        </Button>
                    </Form>
                    <div className="flex items-center gap-4">
                        <Divider className="flex-1" />
                        <p className="shrink-0 text-tiny text-default-500">OR</p>
                        <Divider className="flex-1" />
                    </div>
                    {/* <div className="flex flex-col gap-2">
                        <Button
                            startContent={<Icon icon="flat-color-icons:google" width={24} />}
                            variant="bordered"
                        >
                            Continue with Google
                        </Button>
                        <Button
                            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                            variant="bordered"
                        >
                            Continue with Github
                        </Button>
                    </div> */}
                    <p className="text-center text-small">
                        Ya tienes una cuenta?&nbsp;
                        <Link href="/login" size="sm">
                            Iniciar sesión
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterForm
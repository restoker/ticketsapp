'use client';
import React, { useEffect, useState } from 'react'
import { Button, Input, Link, Divider, ResizablePanel, Form, addToast } from "@heroui/react";
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { loginSchema } from '@/types/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { loginAction } from '@/server/actions/login-action';
import { useRouter } from 'next/navigation';

const orDivider = (
    <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
    </div>
);

const LoginForm = () => {
    const router = useRouter();
    const [reveal, setReveal] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 10 },
    };

    const { handleSubmit, control } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const { execute, result, status } = useAction(loginAction, {
        onSuccess: ({ data }) => {
            if (data) {
                if (data.ok) {
                    addToast({
                        title: data.msg,
                        timeout: 4000,
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
                    window.location.replace('/');
                    // router.replace('/');
                } else {
                    addToast({
                        title: data.msg,
                        timeout: 4000,
                        shouldShowTimeoutProgress: true,
                        color: 'danger',
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
    });

    useEffect(() => {
        if (status === 'idle') return;
        if (result.data?.ok) {
            // redirect('/');
            router.replace('/');
        } else {
            addToast({
                title: result.data?.msg || 'Something went wrong',
                timeout: 4000,
                shouldShowTimeoutProgress: true,
                color: 'danger',
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

    }, [result]);

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        execute(data)
    }

    return (
        <>
            <ResizablePanel>
                <h1 className="mb-4 text-xl font-medium">Log In</h1>
                <AnimatePresence initial={false} mode="popLayout">
                    <LazyMotion features={domAnimation}>
                        {isFormVisible ? (
                            <m.div
                                animate="visible"
                                className="flex flex-col gap-y-3"
                                exit="hidden"
                                initial="hidden"
                                variants={variants}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <Form validationBehavior="native" onSubmit={handleSubmit(onSubmit)}>
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
                                                type="email"
                                                variant="bordered"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            />
                                        )}
                                        rules={{ required: "Email is required." }}
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
                                                label="Password"
                                                name={name}
                                                value={value}
                                                type="password"
                                                variant="bordered"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            />
                                        )}
                                        rules={{ required: "Password is required." }}
                                    />
                                    <Button disabled={status === 'executing'} className="w-full" color="primary" type="submit">
                                        Log In
                                    </Button>
                                </Form>
                                {orDivider}
                                <Button
                                    fullWidth
                                    startContent={
                                        <Icon
                                            className="text-default-500"
                                            icon="solar:arrow-left-linear"
                                            width={18}
                                        />
                                    }
                                    variant="flat"
                                    onPress={() => setIsFormVisible(false)}
                                >
                                    Otras opciones
                                </Button>
                            </m.div>
                        ) : (
                            <>
                                <Button
                                    fullWidth
                                    color="primary"
                                    startContent={
                                        <Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />
                                    }
                                    type="button"
                                    onPress={() => setIsFormVisible(true)}
                                >
                                    Continuar con Email
                                </Button>
                                {orDivider}
                                <m.div
                                    animate="visible"
                                    className="flex flex-col gap-y-2"
                                    exit="hidden"
                                    initial="hidden"
                                    variants={variants}
                                >
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            fullWidth
                                            startContent={<Icon icon="flat-color-icons:google" width={24} />}
                                            variant="flat"
                                        >
                                            Continuar con Google
                                        </Button>
                                        <Button
                                            fullWidth
                                            startContent={
                                                <Icon className="text-default-500" icon="fe:github" width={24} />
                                            }
                                            variant="flat"
                                        >
                                            Continuar con Github
                                        </Button>
                                    </div>
                                    <p className="mt-3 text-center text-small">
                                        ¿Necesitas crear una cuenta?&nbsp;
                                        <Link href="/register" size="sm">
                                            Registrate
                                        </Link>
                                    </p>
                                </m.div>
                            </>
                        )}
                    </LazyMotion>
                </AnimatePresence>
            </ResizablePanel>
        </>
    )
}

export default LoginForm
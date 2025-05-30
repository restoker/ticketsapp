'use client';

import React from "react";
import { Button, Input, Checkbox, Link, Divider, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./acme";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IFormInput {
    name: string;
    email: string;
    password: string;
}
const RegisterForm = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log("handleSubmit");
    // };


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
        console.log(data);
    };

    return (
        <>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="flex flex-col items-center pb-6">
                    <AcmeIcon size={60} />
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
                                    placeholder="Enter your name"
                                    type="text"
                                    variant="bordered"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                            rules={{ required: "Name is required." }}
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
                                    placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    type={isVisible ? "text" : "password"}
                                    variant="bordered"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                            rules={{ required: "Password is required." }}
                        />


                        <Button className="w-full" color="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="flex items-center gap-4">
                        <Divider className="flex-1" />
                        <p className="shrink-0 text-tiny text-default-500">OR</p>
                        <Divider className="flex-1" />
                    </div>
                    <div className="flex flex-col gap-2">
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
                    </div>
                    <p className="text-center text-small">
                        Already have an account?&nbsp;
                        <Link href="#" size="sm">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterForm
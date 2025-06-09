'use client';
import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="h-dvh w-full flex justify-center items-center">
            <Spinner classNames={{ label: "text-foreground mt-4" }} label="🫠 Cargando..." variant="wave" />
        </div>
    );
}
"use client";

import React from "react";
import {
    addToast,
    Button,
} from "@heroui/react";
import PromptContainerWithConversation from "./prompt-container-with-conversation";
import { useAction } from "next-safe-action/hooks";
import { closeTicketAction } from "@/server/actions/close-ticket-action";


type Preset = {
    id: string;
    name: string;
};

const presets: Preset[] = [
    {
        id: "1",
        name: "Preset 1",
    },
    {
        id: "2",
        name: "Preset 2",
    },
    {
        id: "3",
        name: "Preset 3",
    },
    {
        id: "4",
        name: "Preset 4",
    },
    {
        id: "5",
        name: "Preset 5",
    },
    {
        id: "6",
        name: "Preset 6",
    },
    {
        id: "7",
        name: "Preset 7",
    },
    {
        id: "8",
        name: "Preset 8",
    },
    {
        id: "9",
        name: "Preset 9",
    },
    {
        id: "10",
        name: "Preset 10",
    },
];

export type TicketComments = {
    id: number;
    comment: string;
    userId: number;
    ticketId: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    users: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
};


const Playground = ({ userId, role, comments, ticketId }: { userId: number; role: string; comments: TicketComments[]; ticketId: number }) => {


    const { execute, status } = useAction(closeTicketAction, {
        onSuccess: ({ data }) => {
            if (data) {
                if (data.ok) {
                    addToast({
                        title: data.msg,
                        variant: "bordered",
                        color: "success",
                        timeout: 3000,
                        shouldShowTimeoutProgress: true,
                        closeIcon: (
                            <svg
                                fill="none"
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
                    })
                }
                if (!data.ok) {
                    addToast({
                        title: data.msg,
                        variant: "bordered",
                        color: "danger",
                        timeout: 3000,
                        shouldShowTimeoutProgress: true,
                        closeIcon: (
                            <svg
                                fill="none"
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
                    })
                }
            }
        },
        onError: () => {
            addToast({
                title: "Error al cerrar el ticket",
                variant: "bordered",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                closeIcon: (
                    <svg
                        fill="none"
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
            })
        }
    })

    return (
        <section className="h-dvh w-full">
            <header className="flex w-full flex-col items-center gap-4 pb-6 lg:flex-row lg:justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-large font-medium">Chat</h1>
                </div>
                {role === 'agent' ? <div className="flex items-center gap-2">
                    {/* <Button size="sm" variant="flat">
                        Save
                    </Button> */}

                    <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => execute({ ticketId, agentId: userId })}
                    >
                        Cerrar ticket
                    </Button>
                </div> : null}
            </header>
            <main className="flex">
                {/* Controls */}
                {/* <div className="hidden w-1/4 flex-none flex-col gap-4 lg:flex">{controlsContent}</div> */}
                {/* Chat */}
                <div className="relative flex w-full flex-col gap-2 lg:w-3/4">
                    <PromptContainerWithConversation
                        className="max-w-full px-0 lg:pl-10"
                        scrollShadowClassname="h-[40vh] lg:h-[50vh]"
                        ticketId={ticketId}
                        comments={comments}
                    />
                </div>
            </main>
        </section>
    )
}

export default Playground


// const controlsContent = (
//     <>
//         <Textarea
//             fullWidth
//             label="System"
//             placeholder="You are a helpful Acme AI code assistant"
//             value={systemMessage}
//             onValueChange={setSystemMessage}
//         />
//         <Select
//             label="Model"
//             selectedKeys={selectedModel ? ([selectedModel] as unknown as Selection) : []}
//             onSelectionChange={onModelChange}
//         >
//             <SelectSection showDivider title="Open AI">
//                 {DEFAULT_MODELS.map((model) => (
//                     <SelectItem key={model}>{model}</SelectItem>
//                 ))}
//             </SelectSection>
//             <SelectSection title="Fine Tunes">
//                 {fineTuneModels.map((fineTunedModel) => (
//                     <SelectItem key={fineTunedModel}>{fineTunedModel}</SelectItem>
//                 ))}
//             </SelectSection>
//         </Select>
//         <div className="mt-2 flex w-full flex-col gap-6 px-1">
//             <Slider
//                 aria-label="Temperature"
//                 label="Temperature"
//                 maxValue={1}
//                 minValue={0}
//                 size="sm"
//                 step={0.01}
//                 value={temperature}
//                 onChange={(value) => {
//                     setTemperature(value as number);
//                 }}
//             />
//             <Slider
//                 aria-label="Max Length"
//                 label="Max Length"
//                 maxValue={2048}
//                 minValue={0}
//                 size="sm"
//                 step={1}
//                 value={maxLength}
//                 onChange={(value) => setMaxLength(value as number)}
//             />
//             <Slider
//                 aria-label="Top P"
//                 label="Top P"
//                 maxValue={1}
//                 minValue={0}
//                 size="sm"
//                 step={0.01}
//                 value={topP}
//                 onChange={(value) => {
//                     setTopP(value as number);
//                 }}
//             />
//             <Slider
//                 aria-label="Frequency Penalty"
//                 label="Frequency Penalty"
//                 maxValue={2}
//                 minValue={0}
//                 size="sm"
//                 step={0.01}
//                 value={frequencyPenalty}
//                 onChange={(value) => {
//                     setFrequencyPenalty(value as number);
//                 }}
//             />
//             <Slider
//                 aria-label="Presence Penalty"
//                 label="Presence Penalty"
//                 maxValue={2}
//                 minValue={0}
//                 size="sm"
//                 step={0.01}
//                 value={presencePenalty}
//                 onChange={(value) => {
//                     setPresencePenalty(value as number);
//                 }}
//             />
//         </div>
//     </>
// );
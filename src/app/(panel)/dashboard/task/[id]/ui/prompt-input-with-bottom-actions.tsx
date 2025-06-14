"use client";

import React from "react";
import { Button, Tooltip, ScrollShadow, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import PromptInput from "./prompt-input";
import { useAction } from "next-safe-action/hooks";
import { createCommentAction } from "@/server/actions/create-comment-action";

export default function Component() {
  const ideas = [
    {
      title: "El problema persiste",
      description: "El problema no se a solucionado a pesar de las soluciones propuestas",
    },
  ];

  const { execute, status } = useAction(createCommentAction, {
    onSuccess: ({ data }) => {
      if (data) {
        if (data.ok) {
          addToast({
            title: data.msg,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            color: "success",
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

        if (!data.ok) {
          addToast({
            title: data.msg,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            color: "danger",
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
                <path d="M6 6l12 12" />
              </svg>
            ),
          });
        }
      }
    }
  })

  const [prompt, setPrompt] = React.useState<string>("");


  const createTicketComment = async () => {
    if (prompt.trim().length === 0 || prompt.trim() === "" || prompt.trim().length > 200) return addToast({
      title: "Error",
      description: "El comentario no puede estar vacio",
      variant: "bordered",
      color: "danger",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
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
          <path d="M6 6l12 12" />
        </svg>
      ),
    });

    execute({
      idTicket: 1,
      idUser: 1,
      comment: prompt
    })
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
        <div className="flex gap-2">
          {ideas.map(({ title, description }, index) => (
            <Button key={index} className="flex h-14 flex-col items-start gap-0" variant="flat" onPress={() => setPrompt(title)}>
              <p>{title}</p>
              <p className="text-default-500">{description}</p>
            </Button>
          ))}
        </div>
      </ScrollShadow>
      <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
        <PromptInput
          classNames={{
            inputWrapper: "!bg-transparent shadow-none",
            innerWrapper: "relative",
            input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
          }}
          endContent={
            <div className="flex items-end gap-2">
              <Tooltip showArrow content="Send message">
                <Button
                  isIconOnly
                  color={!prompt ? "default" : "primary"}
                  isDisabled={!prompt}
                  radius="full"
                  size="sm"
                  variant="solid"
                  onPress={createTicketComment}
                >
                  <Icon
                    className={cn(
                      "[&>path]:stroke-[2px]",
                      !prompt ? "text-default-600" : "text-primary-foreground",
                    )}
                    icon="solar:arrow-up-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
          minRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onValueChange={setPrompt}
        />
        <div className="flex w-full items-center justify-between  gap-2 overflow-scroll px-4 pb-4">
          <p className="py-1 text-tiny text-default-400">{prompt.length}/200</p>
        </div>
      </form>
    </div>
  );
}

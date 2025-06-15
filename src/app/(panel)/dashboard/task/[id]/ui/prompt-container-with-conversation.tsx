"use client";

import React from "react";
import { ScrollShadow, Tab, Tabs } from "@heroui/react";
import { cn } from "@heroui/react";
import PromptInputWithBottomActions from "./prompt-input-with-bottom-actions";

import Conversation from "./conversation";
import { TicketComments } from "./Playground";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

export default function Component({
  className,
  scrollShadowClassname,
  ticketId,
  comments,
}: {
  className?: string;
  scrollShadowClassname?: string;
  ticketId: number;
  comments: TicketComments[];
}) {
  return (
    <div className={cn("flex h-full w-full max-w-full flex-col gap-8", className)}>
      <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-small border-divider pb-2 sm:justify-between">
        <p className="text-base font-medium">Describa su problema</p>
        {/* <Tabs className="justify-center">
          <Tab key="creative" title="Creative" />
          <Tab key="technical" title="Technical" />
          <Tab key="precise" title="Precise" />
        </Tabs> */}
      </div>
      {comments.length === 0
        ?
        <div className="flex h-full flex-col items-center justify-center">
          <ChatBubbleBottomCenterIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-16 animate-bounce" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No hay comentarios</h3>
          <p className="mt-1 text-sm text-gray-200">Inicia escribiendo tu problema en el imput de abajo.</p>
        </div>
        :
        <ScrollShadow className={cn("flex h-full flex-col", scrollShadowClassname)}>
          <Conversation comments={comments} />
        </ScrollShadow>}
      <div className="flex flex-col gap-2">
        <PromptInputWithBottomActions ticketId={ticketId} />
        {/* <p className="px-2 text-tiny text-default-400">
          Acme AI can make mistakes. Consider checking important information.
        </p> */}
      </div>
    </div>
  );
}

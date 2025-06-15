import React from "react";

import MessageCard from "./message-card";
import { TicketComments } from "./Playground";

export default function Component({ comments }: { comments: TicketComments[] }) {
  // console.log(comments);
  return (
    <div className="flex flex-col gap-4 px-1">
      {comments.map(({ comment, userId, users }, index) => (
        <MessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={
            users.role === "agent"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={comment}
          messageClassName={users.role === "user" ? "bg-content3 text-content3-foreground" : ""}
          showFeedback={users.role === "agent"}
        />
      ))}
    </div>
  );
}

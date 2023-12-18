"use client";

import { ChatMessagesProps } from "@/interfaces/chat-interface";
import React, { Fragment } from "react";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { MessageWithMemberWithProfile } from "@/types/message-type";

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="tsxt-xs text-zinc-500 dark:text-zinc-400">
          Loading messages ...{" "}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="tsxt-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome name={name} type={type} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group: any, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <div key={message.id}>{message.content}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

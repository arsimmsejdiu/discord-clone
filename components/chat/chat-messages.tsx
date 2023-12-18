"use client";

import { ChatMessagesProps } from "@/interfaces/chat-interface";
import React from "react";
import { ChatWelcome } from "@/components/chat/chat-welcome";

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
  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex-1"/>
      <ChatWelcome 
        name={name}
        type={type}
      />
    </div>
  );
};

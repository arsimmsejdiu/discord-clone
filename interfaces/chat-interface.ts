import { ChannelType, Member, MemberRole } from "@prisma/client";

export interface ChatHeaderProps {
  serverId: string | undefined;
  name: string | undefined;
  type: "channel" | "conversation";
  channelType: ChannelType;
  imageUrl?: string;
  role: MemberRole;
}

export interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export interface ChatMessagesProps {
  name: string,
  member: Member,
  chatId: string,
  apiUrl: string,
  socketUrl: string,
  socketQuery: Record<string, string>,
  paramKey: "channelId" | "coversationId",
  paramValue: string,
  type: "channel" | "conversation"
}

export interface ChatWelcomeProps {
  name: string,
  type: "channel" | "conversation"
}

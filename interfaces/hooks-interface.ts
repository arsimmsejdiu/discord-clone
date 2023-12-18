import { ModalType } from "@/types/hook-type";
import { Channel, ChannelType, Server } from "@prisma/client";

export interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

export interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export interface ChatQueryProps {
  queryKey: string,
  apiUrl: string,
  paramKey: "channelId" | "coversationId",
  paramValue: string
}

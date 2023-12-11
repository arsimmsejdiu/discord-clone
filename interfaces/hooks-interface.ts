import { Channel, ChannelType, Server } from "@prisma/client";

export interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
  }
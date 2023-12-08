import { ChannelType, MemberRole } from "@prisma/client"

export interface ChatHeaderProps {
    serverId: string | undefined,
    name: string | undefined,
    type: "channel" | "conversation",
    channelType: ChannelType,
    imageUrl?: string
    role: MemberRole
}
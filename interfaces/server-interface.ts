import { ServerWithMembersWithProfiles } from "@/types";
import { Channel, ChannelType, Member, MemberRole, Profile, Server } from "@prisma/client";

export interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

export interface ServerSidebarProps {
  serverId: string | undefined;
}

export interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

export interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}
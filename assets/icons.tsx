import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

export const iconMap = {
  [ChannelType.TEXT]: (
    <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
  ),
  [ChannelType.AUDIO]: (
    <Mic className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
  ),
};

export const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

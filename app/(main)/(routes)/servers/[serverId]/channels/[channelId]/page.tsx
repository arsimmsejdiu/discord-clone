import ChatHeader from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, Member } from "@prisma/client";
import { redirect } from "next/navigation";
import { ChatInput } from "@/components/chat/chat-input";
import { ChannelIdPageProps } from "@/interfaces/channel-interface";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  }); // find a user that is inside this server with this profile id

  if (!channel && !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel?.name}
        serverId={channel?.serverId}
        channelType={channel?.type as ChannelType}
        type="channel"
        role={"GUEST"}
      />
      {channel?.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member as Member}
            name={channel?.name as string}
            type="channel"
            chatId={channel?.id as string}
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel?.id as string,
              serverId: channel?.serverId as string,
            }}
            paramKey="channelId"
            paramValue={channel?.id as string}
          />
          <ChatInput
            name={channel?.name as string}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel ? channel.id : params.channelId,
              serverId: channel ? channel.serverId : params.serverId,
            }}
          />
        </>
      )}
      {channel?.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel?.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;

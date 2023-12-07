import ChatHeader from '@/components/chat/chat-header'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

interface ChannelIdPageProps {
  params: {
    serverId: string,
    channelId: string
  } // these id come from the folder structure where we have a folder with [serverId] and inside we have a folder [channelId]
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {
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
    }
  }); // find a user that is inside this server with this profile id

  if(!channel && !member) {
    redirect("/")
  }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col'>
      <ChatHeader 
        name={channel?.name}
        serverId={channel?.serverId}
        channelType={channel?.type as ChannelType}
        type="channel"
      />
    </div>
  )
}

export default ChannelIdPage
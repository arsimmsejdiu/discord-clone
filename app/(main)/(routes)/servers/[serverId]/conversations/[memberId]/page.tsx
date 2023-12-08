import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversations";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({params}: MemberIdPageProps) => {
  const profile = await currentProfile();

  if(!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where : {
      serverId: params.serverId,
      profileId: profile.id
    },
    include:{
      profile: true
    }
  });

  if (!currentMember) {
    return redirect("/")
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const {memberOne, memberTwo} = conversation;

  /* So basically what i am trying to do is i am comparing both memberOne and memberTwo, we are looking into their profileId, 
    and if it matchtes our current profile.id, i am picking the opposite memberm
    because i want to get the other member from the currentProfile. 
  */
  
  /* We don't know which one is gonna be us and which one is gonna be the person we are talking to,
    because either they could have initiated the conversation or we could have initiated the conversation. 
    If we initiated the converation, then we are the memberOne, otherwise they are.
  */

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne; 

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader 
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
        channelType={"AUDIO"}
        role={otherMember.role}
      />
    </div>
  );
};

export default MemberIdPage;

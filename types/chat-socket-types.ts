import { Member, Message, Profile } from "@prisma/client";

export type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

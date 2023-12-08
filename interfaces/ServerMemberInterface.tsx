import { Member, Profile } from "@prisma/client";
import { Server } from "http";

export interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
  }
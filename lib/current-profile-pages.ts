import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  } // this means we cannot find the current profile

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};

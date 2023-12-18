import { currentProfile } from "@/lib/current-profile";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";
import { MESSAGE_BATCH } from "@/assets";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH,
        skip: 1, // We're going to skip one, because we don't want it to repeat the certain message that the cursor is at
        cursor: {
          id: cursor,
        },
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH,
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if(messages.length === MESSAGE_BATCH) {
        nextCursor = messages[MESSAGE_BATCH - 1].id
    }

    return NextResponse.json({
        items: messages,
        nextCursor
    })
  } catch (error) {
    console.log("[MESSAGES_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

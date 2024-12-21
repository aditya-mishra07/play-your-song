import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DownvoteSchema = z.object({
  songId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }

  const result = DownvoteSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Error while upvoting!",
      },
      {
        status: 411,
      }
    );
  }
  await prisma.upvote.delete({
    where: {
      userId_songId: {
        userId: user.id,
        songId: result.data.songId,
      },
    },
  });

  return NextResponse.json({
    message: "Song upvoted",
  });
}

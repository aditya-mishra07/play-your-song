import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { type } from "os";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const CreateSongSchema = z.object({
  creatorId: z.string(),
  url: z
    .string()
    .regex(
      /^(https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}(&[\w=&]+)*|https:\/\/open\.spotify\.com\/(track|album)\/[a-zA-Z0-9]{22})$/
    ),
});

export async function POST(req: NextRequest) {
  const result = CreateSongSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.errors,
      },
      {
        status: 411,
      }
    );
  }

  const song = result.data;
  const extractedId = song.url.split("?v=")[1];
  const type = song.url.includes("youtube") ? "Youtube" : "Spotify";
  const { title, thumbnail } = await youtubesearchapi.GetVideoDetails(
    extractedId
  );
  const thumbnails = thumbnail.thumbnails;
  thumbnails.sort((a: { width: number }, b: { width: number }) =>
    a.width < b.width ? -1 : 1
  );

  await prisma.song.create({
    data: {
      userId: song.creatorId,
      type,
      url: song.url,
      title,
      smallImg:
        (thumbnails.length > 1
          ? thumbnails[thumbnails.length - 2].url
          : thumbnails[thumbnails.length - 1].url) ?? "",
      bigImg: thumbnails[thumbnails.length - 1].url ?? "",
    },
  });

  return NextResponse.json({
    message: "Song created!",
  });
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  if (!creatorId) {
    return NextResponse.json(
      { message: "invalid query parameter" },
      {
        status: 422,
      }
    );
  }
  const songs = await prisma.song.findMany({
    where: {
      userId: creatorId,
    },
  });

  return NextResponse.json({
    songs,
  });
}

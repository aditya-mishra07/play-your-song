import { NextRequest } from "next/server";
import { z } from "zod";

const CreateSongSchema = z.object({
  creatorId: z.string(),
});

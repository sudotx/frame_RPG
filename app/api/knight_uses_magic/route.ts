import {
  errorFrame,
  knightCastsOutOfControlSpells,
  knightsGuild,
  parseFrameRequest,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  frameRequest = await req.json();
  const a = await parseFrameRequest(frameRequest!);
  if (!a) {
    return new NextResponse(errorFrame);
  }

  if (!frameRequest) {
    throw new Error("could not deserialize request from frame");
  }

  const buttonId = frameRequest.untrustedData.buttonIndex;

  if (buttonId === 1) {
    return new NextResponse(knightCastsOutOfControlSpells);
  } else {
    return new NextResponse(knightsGuild);
  }
}

export const dynamic = "force-dynamic";

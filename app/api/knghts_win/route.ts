import {
  errorFrame,
  knightsWin,
  parseFrameRequest,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  try {
    frameRequest = await req.json();
    if (!frameRequest) {
      throw new Error("could not deserialize request from frame");
    }
  } catch (error) {
    return new NextResponse(errorFrame);
  }

  const { fid, isValid } = await parseFrameRequest(frameRequest);
  if (!fid || !isValid) return new NextResponse(errorFrame);

  return new NextResponse(knightsWin);
}

export const dynamic = "force-dynamic";

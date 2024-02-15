import { FaceOff, errorFrame, parseFrameRequest } from "@/lib/farcaster";
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

  return new NextResponse(FaceOff);
}

export const dynamic = "force-dynamic";

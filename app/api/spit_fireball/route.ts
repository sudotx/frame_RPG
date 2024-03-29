import {
  dragonSpitsFireball,
  errorFrame,
  parseFrameRequest,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  frameRequest = await req.json();

  const buttonIndex = frameRequest?.untrustedData.buttonIndex;
  if (!frameRequest) {
    throw new Error("could not deserialize request from frame");
  }

  if (buttonIndex === 1) {
    return new NextResponse(dragonSpitsFireball);
  } else {
    return new NextResponse(errorFrame);
  }
}

export const dynamic = "force-dynamic";

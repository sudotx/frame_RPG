import {
  errorFrame,
  knightLooksForWizard,
  knightsHorseBackFrame,
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

  // const { fid, isValid } = await parseFrameRequest(frameRequest);
  // if (!fid || !isValid) return new NextResponse(errorFrame);
  if (buttonIndex === 1) {
    return new NextResponse(knightsHorseBackFrame);
  } else {
    return new NextResponse(knightLooksForWizard);
  }
}

export const dynamic = "force-dynamic";

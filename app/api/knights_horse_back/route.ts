import {
  TimeTravellersHorseBack,
  knightsHorseBackFrame,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  frameRequest = await req.json();
  if (!frameRequest) {
    throw new Error("could not deserialize request from frame");
  }
  const buttonId = frameRequest?.untrustedData.buttonIndex;

  // const { fid, isValid } = await parseFrameRequest(frameRequest);
  // if (!fid || !isValid) return new NextResponse(errorFrame);

  if (buttonId === 1) {
    return new NextResponse(knightsHorseBackFrame);
  } else {
    return new NextResponse(TimeTravellersHorseBack);
  }
}

export const dynamic = "force-dynamic";

import {
  errorFrame,
  knightsHorseBackFrame,
  parseFrameRequest,
  testFrame,
} from "@/lib/farcaster";
import { createTransactionIntent } from "@/lib/nft";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;
  // Parse and validate request from Frame for fid
  let buttonId = frameRequest?.untrustedData.buttonIndex;
  try {
    frameRequest = await req.json();
    if (!frameRequest)
      throw new Error("Could not deserialize request from frame");
  } catch (e) {
    return new NextResponse(errorFrame);
  }

  const { fid, isValid } = await parseFrameRequest(frameRequest);
  if (!fid || !isValid) return new NextResponse(errorFrame);

  const address = req.url.split("/").slice(-1)[0];
  if (typeof address !== "string") return new NextResponse(errorFrame);

  // Send NFT to the user's wallet
  const tx = createTransactionIntent(address);
  if (!tx) return new NextResponse(errorFrame);

  // if (buttonId === 1) {
  //   return new NextResponse(knightsHorseBackFrame);
  // } else if (buttonId === 2) {
  //   return new NextResponse(testFrame);
  // } else {
  //   return new NextResponse(errorFrame);
  // }
  return new NextResponse(knightsHorseBackFrame);
}

export const dynamic = "force-dynamic";

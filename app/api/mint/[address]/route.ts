import { errorFrame, knightsHorseBackFrame } from "@/services/farcaster";
import { createTokenMintIntent } from "@/services/nft";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;
  // Parse and validate request from Frame for fids
  frameRequest = await req.json();
  if (!frameRequest)
    throw new Error("Could not deserialize request from frame");

  const address = req.url.split("/").slice(-1)[0];
  if (typeof address !== "string") return new NextResponse(errorFrame);

  // Send NFT to the user's wallet
  const tx = createTokenMintIntent(address);
  if (!tx) {
    return new NextResponse(errorFrame);
  } else {
    return new NextResponse(knightsHorseBackFrame);
  }
}

export const dynamic = "force-dynamic";

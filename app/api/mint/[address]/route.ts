import {
  errorFrame,
  knightsHorseBackFrame,
  parseFrameRequest,
} from "@/services/farcaster";
import { createTransactionIntent } from "@/services/nft";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;
  // Parse and validate request from Frame for fids
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
  if (!tx) {
    return new NextResponse(errorFrame);
  } else {
    return new NextResponse(knightsHorseBackFrame);
  }
}

export const dynamic = "force-dynamic";

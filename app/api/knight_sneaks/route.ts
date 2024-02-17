import { ShowWin, knightSneakAttack } from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  frameRequest = await req.json();
  if (!frameRequest) {
    throw new Error("could not deserialize request from frame");
  }
  const buttonId = frameRequest.untrustedData.buttonIndex;

  if (buttonId === 1) {
    return new NextResponse(knightSneakAttack);
  } else {
    return new NextResponse(ShowWin);
  }
}

export const dynamic = "force-dynamic";

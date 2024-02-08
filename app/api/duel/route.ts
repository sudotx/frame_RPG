import { FRAME_BASE_URL } from "@/lib/farcaster";
import { NextRequest, NextResponse } from "next/server";
import {
  createAccountObject,
  createContractObject,
  createSessionKey,
  list10PLayers,
} from "@/lib/embedded-wallet";
import { FrameRequest } from "@coinbase/onchainkit";

export async function POST(req: NextRequest): Promise<Response> {
  return NextResponse.redirect(FRAME_BASE_URL, { status: 302 });
  // set frame to populate when a duel is in session
  // frame should show user address, and dueler address
  // both tokens fight with contract function
  // winner wins, loser loses
}

export const dynamic = "force-dynamic";

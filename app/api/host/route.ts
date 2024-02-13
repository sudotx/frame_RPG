import { FRAME_BASE_URL } from "@/lib/farcaster";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  return NextResponse.redirect(FRAME_BASE_URL, { status: 302 });
  // user can host a duel, if no one is open currently
  // others can fight host, and duels for win

  // call host on the game contract, saves the details of the game.
  // saves the game details and optimisticly populates the frame
  // ter
}

export const dynamic = "force-dynamic";

import { createOrFindSmartWalletForFid } from "@/lib/embedded-wallet";
import {
  DuelingFrame,
  errorFrame,
  getOwnerAddressFromFid,
  parseFrameRequest,
} from "@/lib/farcaster";
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

  const address = req.url.split("/").slice(-1)[0];
  if (typeof address !== "string") return new NextResponse(errorFrame);

  // Query Farcaster Registry contract to get owner address from fid
  const ownerAddress = await getOwnerAddressFromFid(fid);
  if (!ownerAddress) return new NextResponse(errorFrame);

  // Generate an embedded wallet associated with the fid
  const embeddedWalletAddress = await createOrFindSmartWalletForFid(
    fid,
    ownerAddress
  );
  if (!embeddedWalletAddress) return new NextResponse(errorFrame);

  return new NextResponse(DuelingFrame(embeddedWalletAddress));
}

export const dynamic = "force-dynamic";

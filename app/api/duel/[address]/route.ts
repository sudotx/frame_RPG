import { createOrFindSmartWalletForFid } from "@/services/embedded-wallet";
import {
  dragonSpitsFireball,
  duelDragonFrame,
  errorFrame,
  getOwnerAddressFromFid,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  frameRequest = await req.json();
  if (!frameRequest) {
    throw new Error("could not deserialize request from frame");
  }

  const buttonId = frameRequest.untrustedData.buttonIndex;

  const fid = frameRequest.untrustedData.fid;

  // Query Farcaster Registry contract to get owner address from fid
  const ownerAddress = await getOwnerAddressFromFid(fid);
  if (!ownerAddress) return new NextResponse(errorFrame);

  // Generate an embedded wallet associated with the fid
  const embeddedWalletAddress = await createOrFindSmartWalletForFid(
    fid,
    ownerAddress
  );
  if (!embeddedWalletAddress) return new NextResponse(errorFrame);

  if (buttonId === 1) {
    return new NextResponse(duelDragonFrame(embeddedWalletAddress));
  } else {
    return new NextResponse(dragonSpitsFireball);
  }
}

export const dynamic = "force-dynamic";

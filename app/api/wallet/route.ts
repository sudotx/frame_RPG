import { createOrFindSmartWalletForFid } from "@/lib/embedded-wallet";
import {
  createWalletFrame,
  errorFrame,
  getOwnerAddressFromFid,
  mintFrame,
  parseFrameRequest,
  startFrame,
} from "@/lib/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  // let buttonId = frameRequest?.untrustedData.buttonIndex;
  // Parse and validate request from Frame for fid
  try {
    frameRequest = await req.json();

    if (!frameRequest)
      throw new Error("Could not deserialize request from frame");
  } catch {
    return new NextResponse(errorFrame);
  }
  const { fid, isValid } = await parseFrameRequest(frameRequest);
  if (!fid || !isValid) return new NextResponse(errorFrame);

  // // Query Farcaster Registry contract to get owner address from fid
  // const ownerAddress = await getOwnerAddressFromFid(fid);
  // if (!ownerAddress) return new NextResponse(errorFrame);

  // // Generate an embedded wallet associated with the fid
  // const embeddedWalletAddress = await createOrFindSmartWalletForFid(
  //   fid,
  //   ownerAddress
  // );
  // if (!embeddedWalletAddress) return new NextResponse(errorFrame);
  return new NextResponse(
    mintFrame("0x0000000000000000000000000000000000000000")
  );

  // return new NextResponse(createWalletFrame(embeddedWalletAddress));
}

export const dynamic = "force-dynamic";

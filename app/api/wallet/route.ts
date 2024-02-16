import { createOrFindSmartWalletForFid } from "@/services/embedded-wallet";
import {
  errorFrame,
  getOwnerAddressFromFid,
  mintFrame,
  parseFrameRequest,
  testFrame,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  // Parse and validate request from Frame for fid
  // frameRequest = await req.json();

  // if (!frameRequest) {
  //   throw new Error("Could not deserialize request from frame");
  // }

  // const { fid, isValid } = await parseFrameRequest(frameRequest);
  // if (!fid || !isValid) return new NextResponse(errorFrame);

  // // Query Farcaster Registry contract to get owner address from fid
  // const ownerAddress = await getOwnerAddressFromFid(fid);
  // if (!ownerAddress) return new NextResponse(errorFrame);

  // // Generate an embedded wallet associated with the fid
  // const embeddedWalletAddress = await createOrFindSmartWalletForFid(
  //   fid,
  //   ownerAddress
  // );
  // if (!embeddedWalletAddress) return new NextResponse(errorFrame);

  // return new NextResponse(testFrame);
  return new NextResponse(
    mintFrame(
      "0x59d6d3118ccb1e9c54f9c701ca1e7140087236f86ab9ccdd9f0731a9ea84708f" as `0x${string}`
    )
  );
}

export const dynamic = "force-dynamic";

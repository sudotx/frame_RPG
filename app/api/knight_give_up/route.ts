import { createOrFindSmartWalletForFid } from "@/services/embedded-wallet";
import {
  HordeOfDragonsInvade,
  KnightPlaysRps,
  KnightUsesMagic,
  dragonSpitsFireball,
  dragonWins,
  duelDragonFrame,
  errorFrame,
  getOwnerAddressFromFid,
  knightFindsForWizard,
  knightsWin,
  parseFrameRequest,
} from "@/services/farcaster";
import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { zeroAddress } from "viem";

export async function POST(req: NextRequest): Promise<Response> {
  let frameRequest: FrameRequest | undefined;

  frameRequest = await req.json();
  if (!frameRequest) {
    throw new Error("could not deserialize request from frame");
  }

  const buttonId = frameRequest.untrustedData.buttonIndex;

  // const { fid, isValid } = await parseFrameRequest(frameRequest);
  // if (!fid || !isValid) return new NextResponse(errorFrame);

  // const address = req.url.split("/").slice(-1)[0];
  // if (typeof address !== "string") return new NextResponse(errorFrame);

  // // Query Farcaster Registry contract to get owner address from fid
  // const ownerAddress = await getOwnerAddressFromFid(fid);
  // if (!ownerAddress) return new NextResponse(errorFrame);

  // // Generate an embedded wallet associated with the fid
  // const embeddedWalletAddress = await createOrFindSmartWalletForFid(
  //   fid,
  //   ownerAddress
  // );
  // if (!embeddedWalletAddress) return new NextResponse(errorFrame);

  if (buttonId === 1) {
    return new NextResponse(HordeOfDragonsInvade);
  } else {
    return new NextResponse(knightFindsForWizard);
  }
}

export const dynamic = "force-dynamic";

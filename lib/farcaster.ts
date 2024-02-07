import { FrameRequest } from "@coinbase/onchainkit";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import { createPublicClient, getContract, http } from "viem";
import { optimism } from "viem/chains";

export const FRAME_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://untitled-unmastered.vercel.app";
const ID_REGISTRY_CONTRACT_ADDRESS: `0x${string}` =
  "0x00000000fc6c5f01fc30151999387bb99a9f489b"; // Optimism Mainnet
const ZERO_ADDRESS: `0x${string}` =
  "0x0000000000000000000000000000000000000000";
const HUB_URL = "nemes.farcaster.xyz:2283";

export enum FrameImageUrls {
  START = "https://untitled-unmastered.vercel.app/landing.png",
  WALLET = "https://untitled-unmastered.vercel.app/wallet.png",
  SUCCESS = "https://untitled-unmastered.vercel.app/success.png",
  ERROR = "https://untitled-unmastered.vercel.app/error.png",
}

export const createFrame = (
  imageUrl: string,
  buttonText: string,
  apiPath: string,
  isRedirect = false,
  buttonText2?: string
) => {
  return `
        <!DOCTYPE html>
        <html>
            <head>
            <meta name="fc:frame" content="vNext">
            <meta name="fc:frame:image" content="${imageUrl}">
            <meta name="fc:frame:post_url" content="${FRAME_BASE_URL}/${apiPath}">
            <meta name="fc:frame:button:1" content="${buttonText}">
            <meta name="fc:frame:button:1" content="${buttonText2}">
            <meta name="fc:frame:button:1:action" content="${isRedirect ? "post_redirect" : "post"}">
            </head>
        </html>`;
};

export const createWalletFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.WALLET,
    "Mint your NFT",
    `api/mint/${address}`,
    true,
    "Mint your NFT2"
  );
};

export const successFrame = createFrame(
  FrameImageUrls.SUCCESS,
  "Done",
  "api/done",
  false,
  "Done2"
);
export const errorFrame = createFrame(
  FrameImageUrls.ERROR,
  "Try again?",
  "api/wallet",
  true,
  "Try again?2"
);

export const WaitingForOpponent = createFrame(
  FrameImageUrls.ERROR,
  "Waiting For Opponent",
  "api/wallet",
  false
);
export const ShowWin = createFrame(
  FrameImageUrls.ERROR,
  "Congratulations anon",
  "api/wallet",
  false
);
export const ShowLose = createFrame(
  FrameImageUrls.ERROR,
  "Try again?",
  "api/wallet",
  false
);
export const Hosting = createFrame(
  FrameImageUrls.ERROR,
  "Hosting!",
  "api/wallet",
  false
);
export const Dueling = createFrame(
  FrameImageUrls.ERROR,
  "Dueling",
  "api/wallet",
  false
);

export const parseFrameRequest = async (request: FrameRequest) => {
  const hub = getSSLHubRpcClient(HUB_URL);
  let fid: number | undefined;
  let isValid: boolean = true;

  try {
    const decodedMessage = Message.decode(
      Buffer.from(request.trustedData.messageBytes, "hex")
    );
    const result = await hub.validateMessage(decodedMessage);
    if (!result.isOk() || !result.value.valid || !result.value.message) {
      isValid = false;
    } else {
      fid = result.value.message.data?.fid;
    }
  } catch (error) {
    console.error(error);
  }

  return { fid: fid, isValid: isValid };
};

// get owner address
export const getOwnerAddressFromFid = async (fid: number) => {
  let ownerAddress: `0x${string}` | undefined;
  try {
    const publicClient = createPublicClient({
      chain: optimism,
      transport: http(),
    });
    const idRegistry = getContract({
      address: ID_REGISTRY_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [{ internalType: "uint256", name: "fid", type: "uint256" }],
          name: "custodyOf",
          outputs: [
            { internalType: "address", name: "owner", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      client: publicClient,
    });
    ownerAddress = await idRegistry.read.custodyOf([BigInt(fid)]);
  } catch (error) {
    console.error(error);
  }
  return ownerAddress !== ZERO_ADDRESS ? ownerAddress : undefined;
};

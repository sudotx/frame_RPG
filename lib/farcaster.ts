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
  SUCCESS = "https://untitled-unmastered.vercel.app/success.png",
  WALLET = "https://untitled-unmastered.vercel.app/wallet.png",
  LOADING = "https://untitled-unmastered.vercel.app/dragonburnsknight.jpg",
  DRAGON_SPITS_FIRBALL_AT_KNIGHT = "https://untitled-unmastered.vercel.app/dragonbreathefire.jpg",
  FRIENDLY_WITH_DRAGON = "https://untitled-unmastered.vercel.app/dragonandknightfrends.jpg",
  MINT_PAGE_WITH_BLACKSMITH = "https://untitled-unmastered.vercel.app/blacksmith.jpg",
  START = "https://untitled-unmastered.vercel.app/dragonfaceoff.jpg",
  FACE_OFF = "https://untitled-unmastered.vercel.app/dragonfaceoff2.jpg",
  DRAGON_WINS = "https://untitled-unmastered.vercel.app/dragonburnsknight.jpg",
  DRAGON_SOARING_FREE = "https://untitled-unmastered.vercel.app/dragonwin.jpg",
  KNIGHT_HORSE_BACK = "https://untitled-unmastered.vercel.app/horseback.jpg",
  KNIGHTS_GUILD = "https://untitled-unmastered.vercel.app/knightguild.jpg",
  KNIGHT_WIN = "https://untitled-unmastered.vercel.app/knightwin.jpg",
  RECRUIT = "https://untitled-unmastered.vercel.app/recruitingknights.jpg",
  ERROR = "https://untitled-unmastered.vercel.app/showlose.png",
}

export const createFrame = (
  imageUrl: string,
  buttonText: string,
  apiPath: string,
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
            <meta name="fc:frame:button:1:action">
            <meta name="fc:frame:button:2" content="${buttonText2}">
            <meta name="fc:frame:button:2:action">
            </head>
        </html>`;
};

export const createWalletFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.MINT_PAGE_WITH_BLACKSMITH,
    "Mint your Weapon",
    `api/mint/${address}`
  );
};
export const mintFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.MINT_PAGE_WITH_BLACKSMITH,
    "Mint your Weapon",
    `api/mint/${address}`,
    "How about a spear?"
  );
};

// after this show a loading frame
export const duelDragonFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.FACE_OFF,
    "Prepare to fight the dragon",
    `api/mint/${address}`
  );
};

export const startFrame = createFrame(
  FrameImageUrls.START,
  "Loading",
  `api/recruit`
);
export const dragonSpitsFireball = createFrame(
  FrameImageUrls.DRAGON_SPITS_FIRBALL_AT_KNIGHT,
  "Run Away",
  `api/dragon_wins`,
  "Try stabbing the beast"
);
export const dragonWins = createFrame(
  FrameImageUrls.DRAGON_WINS,
  "I guess that did not work",
  `api/done`,
  "Try Again?"
);
export const recruitFrame = createFrame(
  FrameImageUrls.RECRUIT,
  "Loading",
  `api/knights_horse_back`
);
export const FaceOff = createFrame(
  FrameImageUrls.FACE_OFF,
  "Try fighting a Dragon",
  `api/spit_fireball`,
  "Try using your words"
);
export const knightsWin = createFrame(
  FrameImageUrls.KNIGHT_WIN,
  "Loading",
  `api/win`
);
export const knightsGuild = createFrame(
  FrameImageUrls.KNIGHTS_GUILD,
  "Loading",
  `api/knights_guild`
);
export const knightsHorseBackFrame = createFrame(
  FrameImageUrls.KNIGHT_HORSE_BACK,
  "On your way to fight a dragon",
  `api/face_off`,
  "unreal right haha"
);

export const errorFrame = createFrame(
  FrameImageUrls.ERROR,
  "Try again?",
  "api/done",
  "Stay Right Here?"
);

export const ShowWin = createFrame(
  FrameImageUrls.KNIGHT_WIN,
  "Congratulations anon",
  "api/finish"
);

export const ShowLose = createFrame(
  FrameImageUrls.DRAGON_WINS,
  "Try again?",
  "api/start"
);

export const DuelingFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.FACE_OFF,
    "Shall we begin",
    `api/duel/${address}`
  );
};

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

import { FrameRequest } from "@coinbase/onchainkit";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import { getAddressForFid } from "frames.js";

export const FRAME_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://untitled-unmastered.vercel.app";
const HUB_URL = "hub.pinata.cloud";
// const HUB_URL = "nemes.farcaster.xyz:2283";

export enum FrameImageUrls {
  MINT_PAGE_WITH_BLACKSMITH = "https://untitled-unmastered.vercel.app/blacksmith.jpg",
  DRAGON_HORDE = "https://untitled-unmastered.vercel.app/dragon_horde.jpg",
  FRIENDLY_WITH_DRAGON = "https://untitled-unmastered.vercel.app/dragonandknightfrends.jpg",
  DRAGON_SPITS_FIRBALL_AT_KNIGHT = "https://untitled-unmastered.vercel.app/dragonbreathefire.jpg",
  DRAGON_WINS = "https://untitled-unmastered.vercel.app/dragonburnsknight.jpg",
  START = "https://untitled-unmastered.vercel.app/dragonfaceoff.jpg",
  FACE_OFF = "https://untitled-unmastered.vercel.app/dragonfaceoff2.jpg",
  DRAGON_SOARING_FREE = "https://untitled-unmastered.vercel.app/dragonwin.jpg",
  FLEEING_KNIGHT = "https://untitled-unmastered.vercel.app/fleeing_knight.png",
  KNIGHT_HORSE_BACK = "https://untitled-unmastered.vercel.app/horseback.jpg",
  KNIGHTS_BAND_TOGETHER = "https://untitled-unmastered.vercel.app/knight_band_with_dragons.jpg",
  KNIGHT_FIGHTS_DRAGON = "https://untitled-unmastered.vercel.app/knight_fight_with_dragon.jpg",
  KNIGHT_FINDS_WIZARD = "https://untitled-unmastered.vercel.app/knight_finds_wizard.jpg",
  KNIGHT_GIVE_UP = "https://untitled-unmastered.vercel.app/knight_give_up.jpg",
  KNIGHT_LOSS = "https://untitled-unmastered.vercel.app/knight_loss.jpg",
  KNIGHT_OUT_OF_CONTROL = "https://untitled-unmastered.vercel.app/knight_ooc.jpg",
  KNIGHT_PLAYS_RPS = "https://untitled-unmastered.vercel.app/knight_plays_rps.jpg",
  KNIGHT_SCARED = "https://untitled-unmastered.vercel.app/knight_scared.jpg",
  SMITH_GIVES_SPEAR = "https://untitled-unmastered.vercel.app/knight_spear.jpg",
  KNIGHT_USES_MAGIC = "https://untitled-unmastered.vercel.app/knight_uses_magic.jpg",
  KNIGHTS_GUILD = "https://untitled-unmastered.vercel.app/knightguild.jpg",
  KNIGHT_MEET_TIMETRV = "https://untitled-unmastered.vercel.app/knights_meet_timetravellers.jpg",
  KNIGHT_MEETS_WIZARD = "https://untitled-unmastered.vercel.app/knights_meet_wizard.jpg",
  KNIGHT_WIN = "https://untitled-unmastered.vercel.app/knightwin.jpg",
  APPROACHING = "https://untitled-unmastered.vercel.app/looking_at_drogo_lair.jpg",
  PHOENIX_DESTROY = "https://untitled-unmastered.vercel.app/phoenix_destroy.jpg",
  RECRUIT = "https://untitled-unmastered.vercel.app/recruitingknights.jpg",
  KNIGHT_SNEAK_ATTACK = "https://untitled-unmastered.vercel.app/sneak_attack.jpg",
  WIZARD_TEACHES_KNIGHT = "https://untitled-unmastered.vercel.app/wizard_teaches_knight.jpg",
}

// general frame architecture
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

export const fourButtonFrame = (
  imageUrl: string,
  apiPath: string,
  buttonText: string,
  buttonText2: string,
  buttonText3: string,
  buttonText4: string
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
      <meta name="fc:frame:button:3" content="${buttonText3}">
      <meta name="fc:frame:button:3:action">
      <meta name="fc:frame:button:4" content="${buttonText4}">
      <meta name="fc:frame:button:4:action">
      </head>
  </html>`;
};

export const threeButtonFrame = (
  imageUrl: string,
  apiPath: string,
  buttonText: string,
  buttonText2: string,
  buttonText3: string
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
      <meta name="fc:frame:button:3" content="${buttonText3}">
      <meta name="fc:frame:button:3:action">
      </head>
  </html>`;
};

export const oneButtonFrame = (
  imageUrl: string,
  apiPath: string,
  buttonText: string
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
      </head>
  </html>`;
};
// use to structure

export const mintFrame = (address: string) => {
  return oneButtonFrame(
    FrameImageUrls.MINT_PAGE_WITH_BLACKSMITH,
    `api/mint/${address}`,
    "Grab A Weapon"
  );
};

export const RecruitFrame = (address: string) => {
  return oneButtonFrame(
    FrameImageUrls.RECRUIT,
    `api/mint/${address}`,
    "Join In??"
  );
};

export const duelDragonFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.FACE_OFF,
    "Prepare To Fight",
    `api/duel/${address}`,
    "Or Maybe A Spell"
  );
};

export const dragonSpitsFireball = createFrame(
  FrameImageUrls.DRAGON_SPITS_FIRBALL_AT_KNIGHT,
  "RunAway",
  `api/dragon_wins`,
  "Suprise Attack"
);

export const dragonWins = createFrame(
  FrameImageUrls.DRAGON_WINS,
  "Guess That Didnt Work",
  `api/done`,
  "Try Again?"
);

export const FaceOff = createFrame(
  FrameImageUrls.FACE_OFF,
  "Try Fighting",
  `api/spit_fireball`,
  "Try Using Words"
);

export const knightsWin = createFrame(
  FrameImageUrls.KNIGHT_WIN,
  "Congrats, Anon",
  `api/done`,
  "Go Again?"
);

export const knightsGuild = createFrame(
  FrameImageUrls.KNIGHTS_GUILD,
  "Join?",
  `api/knights_guild`,
  "Dont"
);

export const knightsHorseBackFrame = createFrame(
  FrameImageUrls.KNIGHT_HORSE_BACK,
  "On Your Way",
  `api/knight_approaches`,
  "Look For The Wizard"
);

export const approachDragonLair = createFrame(
  FrameImageUrls.APPROACHING,
  "Almost There",
  `api/face_off`,
  "Cast One A Spell"
);

export const knightCastsOutOfControlSpells = createFrame(
  FrameImageUrls.KNIGHT_OUT_OF_CONTROL,
  "???",
  `api/war`,
  "???"
);

export const phoenixDestroysWorld = createFrame(
  FrameImageUrls.PHOENIX_DESTROY,
  "Its All Over",
  `api/done`,
  "Try Again?"
);

export const wizardTeachesKnightMagic = createFrame(
  FrameImageUrls.WIZARD_TEACHES_KNIGHT,
  "Wizard Teaches The Knight",
  `api/knights_guild`,
  "Think You're Ready?"
);

export const knightLooksForWizard = createFrame(
  FrameImageUrls.KNIGHT_MEETS_WIZARD,
  "???",
  `api/knight_finds_wizard`,
  "???"
);

export const knightFindsForWizard = oneButtonFrame(
  FrameImageUrls.KNIGHT_FINDS_WIZARD,
  `api/knight_uses_magic`,
  "Learn Magic"
);

export const TimeTravellersHorseBack = createFrame(
  FrameImageUrls.KNIGHT_MEET_TIMETRV,
  "???",
  `api/done`,
  "???"
);

export const blacksmithHandsOverSpearToDude = createFrame(
  FrameImageUrls.SMITH_GIVES_SPEAR,
  "Give Up?",
  `api/war`,
  "Fight On?"
);

export const knightHavingAHardTime = createFrame(
  FrameImageUrls.KNIGHT_SCARED,
  "Give up?",
  `api/knight_having_hard_time`,
  "Keep Pushing"
);

export const enemyCountryInvades = createFrame(
  FrameImageUrls.KNIGHTS_BAND_TOGETHER,
  "Join the fight",
  `api/war`,
  "Join the Opps"
);

export const HordeOfDragonsInvade = oneButtonFrame(
  FrameImageUrls.KNIGHTS_BAND_TOGETHER,
  `api/war`,
  "???"
);

export const knightSneakAttack = createFrame(
  FrameImageUrls.KNIGHT_SNEAK_ATTACK,
  "Almost there",
  `api/knight_flees`,
  "you ready?"
);

export const knightRunsAway = createFrame(
  FrameImageUrls.FLEEING_KNIGHT,
  "Go back home",
  `api/knight_having_a_hard_time`,
  "???"
);

export const errorFrame = createFrame(
  FrameImageUrls.FRIENDLY_WITH_DRAGON,
  "Try again?",
  "api/done",
  "Stay Here?"
);

export const ShowWin = oneButtonFrame(
  FrameImageUrls.KNIGHT_WIN,
  "api/knghts_win",
  "Congrats anon"
);

export const ShowLose = createFrame(
  FrameImageUrls.DRAGON_SOARING_FREE,
  "Try again?",
  "api/done",
  "???"
);

export const KnightUsesMagic = createFrame(
  FrameImageUrls.KNIGHT_USES_MAGIC,
  "you cast some spell",
  "api/knight_uses_magic",
  "Play a round of RPS"
);

export const KnightPlaysRps = createFrame(
  FrameImageUrls.KNIGHT_PLAYS_RPS,
  "Rock",
  "api/knight_play_rps",
  "Paper"
);

export const knightGiveUp = createFrame(
  FrameImageUrls.KNIGHT_GIVE_UP,
  "Try again?",
  "api/knight_flees",
  "Go back home"
);

export const oneOne = createFrame(
  FrameImageUrls.DRAGON_SOARING_FREE,
  "???",
  "api/knights_flees",
  "???"
);

export const twoTwo = createFrame(
  FrameImageUrls.KNIGHT_LOSS,
  "???",
  "api/knights_flees",
  "???"
);

export const KnightLoss = createFrame(
  FrameImageUrls.KNIGHT_LOSS,
  "???",
  "api/done",
  "???"
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

  ownerAddress = await getAddressForFid({
    fid: fid,
    options: {
      fallbackToCustodyAddress: true,
    },
  });

  return ownerAddress;
  // return ownerAddress !== zeroAddress ? ownerAddress : undefined;
};

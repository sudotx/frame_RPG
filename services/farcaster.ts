import { FrameRequest } from "@coinbase/onchainkit";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import { getAddressForFid } from "frames.js";
import { zeroAddress } from "viem";

export const FRAME_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://untitled-unmastered.vercel.app";
const HUB_URL = "hub.pinata.cloud";
// const HUB_URL = "nemes.farcaster.xyz:2283";

export enum FrameImageUrls {
  MINT_PAGE_WITH_BLACKSMITH = "https://untitled-unmastered.vercel.app/blacksmith.jpg",
  FRIENDLY_WITH_DRAGON = "https://untitled-unmastered.vercel.app/dragonandknightfrends.jpg",
  DRAGON_SPITS_FIRBALL_AT_KNIGHT = "https://untitled-unmastered.vercel.app/dragonbreathefire.jpg",
  START = "https://untitled-unmastered.vercel.app/dragonfaceoff.jpg",
  FACE_OFF = "https://untitled-unmastered.vercel.app/dragonfaceoff2.jpg",
  DRAGON_SOARING_FREE = "https://untitled-unmastered.vercel.app/dragonwin.jpg",
  DRAGON_WINS = "https://untitled-unmastered.vercel.app/dragonburnsknight.jpg",
  FLEEING_KNIGHT = "https://untitled-unmastered.vercel.app/fleeing_knight.png",
  KNIGHT_HORSE_BACK = "https://untitled-unmastered.vercel.app/horseback.jpg",
  KNIGHTS_GUILD = "https://untitled-unmastered.vercel.app/knightguild.jpg",
  KNIGHT_WIN = "https://untitled-unmastered.vercel.app/knightwin.jpg",
  APPROACHING = "https://untitled-unmastered.vercel.app/looking_at_drogo_lair.jpg",
  RECRUIT = "https://untitled-unmastered.vercel.app/recruitingknights.jpg",
  DRAGON_HORDE = "https://untitled-unmastered.vercel.app/dragon_horde.jpg",
  KNIGHTS_BAND_TOGETHER = "https://untitled-unmastered.vercel.app/knight_band_with_dragons.jpg",
  PHOENIX_DESTROY = "https://untitled-unmastered.vercel.app/phoenix_destroy.jpg",
  KNIGHT_OUT_OF_CONTROL = "https://untitled-unmastered.vercel.app/knight_ooc.jpg",
  WIZARD_TEACHES_KNIGHT = "https://untitled-unmastered.vercel.app/wizards_teaches_knight.jpg",
  KNIGHT_MEETS_WIZARD = "https://untitled-unmastered.vercel.app/knights_meet_wizard.jpg",
  KNIGHT_FINDS_WIZARD = "https://untitled-unmastered.vercel.app/knights_finds_wizards.jpg",
  KNIGHT_MEET_TIMETRV = "https://untitled-unmastered.vercel.app/knights_meet_timetravellers.jpg",
  SMITH_GIVES_SPEAR = "https://untitled-unmastered.vercel.app/knight_spear.jpg",
  KNIGHT_SCARED = "https://untitled-unmastered.vercel.app/knight_scared.jpg",
  KNIGHT_FIGHTS_DRAGON = "https://untitled-unmastered.vercel.app/knight_fight_with_dragon.jpg",
  KNIGHT_SNEAK_ATTACK = "https://untitled-unmastered.vercel.app/sneak_attack.jpg",
  KNIGHT_USES_MAGIC = "https://untitled-unmastered.vercel.app/knight_uses_magic.jpg",
  KNIGHT_PLAYS_RPS = "https://untitled-unmastered.vercel.app/knight_plays_rps.jpg",
  KNIGHT_GIVE_UP = "https://untitled-unmastered.vercel.app/knight_give_up.jpg",
  KNIGHT_LOSS = "https://untitled-unmastered.vercel.app/knight_loss.jpg",
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
    "Mint Yourself A Weapon"
  );
};

export const RecruitFrame = (address: string) => {
  return oneButtonFrame(
    FrameImageUrls.RECRUIT,
    `api/mint/${address}`,
    "Join The Fight??"
  );
};

export const duelDragonFrame = (address: string) => {
  return createFrame(
    FrameImageUrls.FACE_OFF,
    "Prepare To Fight The Dragon Head on",
    `api/duel/${address}`,
    "Or Cast A Spell"
  );
};

export const dragonSpitsFireball = createFrame(
  FrameImageUrls.DRAGON_SPITS_FIRBALL_AT_KNIGHT,
  "Run Away",
  `api/dragon_wins`,
  "Try Another Attack"
);

export const dragonWins = createFrame(
  FrameImageUrls.DRAGON_WINS,
  "I Guess That Did Not Work",
  `api/done`,
  "Try Again?"
);

export const FaceOff = createFrame(
  FrameImageUrls.FACE_OFF,
  "Try Fighting The Dragon",
  `api/spit_fireball`,
  "Try Using Your Words"
);

export const knightsWin = createFrame(
  FrameImageUrls.KNIGHT_WIN,
  "Congrats On Getting This Far, You Deserve This W",
  `api/done`,
  "Go Again?"
);

export const knightsGuild = createFrame(
  FrameImageUrls.KNIGHTS_GUILD,
  "Join The Guild?",
  `api/knights_guild`,
  "Protect The Land"
);

export const knightsHorseBackFrame = createFrame(
  FrameImageUrls.KNIGHT_HORSE_BACK,
  "On Your Way To Fight A Dragon",
  `api/knight_approaches`,
  "Try Looking For Mordor, The Great"
);

export const approachDragonLair = createFrame(
  FrameImageUrls.APPROACHING,
  "Almost There",
  `api/face_off`,
  "Cast One Of The Spells You Just Learnt"
);

export const knightCastsOutOfControlSpells = createFrame(
  FrameImageUrls.KNIGHT_OUT_OF_CONTROL,
  "Oh, Well You Unleashed Dormamu Unto This World",
  `api/knights_ooc`,
  "Cast Another One Of The Spells You Just Learnt"
);

export const phoenixDestroysWorld = createFrame(
  FrameImageUrls.PHOENIX_DESTROY,
  "Its All Over",
  `api/done`,
  "Try Again?"
);

export const wizardTeachesKnightMagic = createFrame(
  FrameImageUrls.WIZARD_TEACHES_KNIGHT,
  "Wizard Teaches The Knight To Better Use Words",
  `api/done`,
  "Think You're Ready Now"
);

export const knightLooksForWizard = createFrame(
  FrameImageUrls.KNIGHT_MEETS_WIZARD,
  "???",
  `api/done`,
  "Exclaim"
);

export const knightFindsForWizard = createFrame(
  FrameImageUrls.KNIGHT_FINDS_WIZARD,
  "Learn Magic",
  `api/knight_finds_wizard`,
  "Just Hangout"
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
  FrameImageUrls.APPROACHING,
  "Join the fight",
  `api/done`,
  "Join the Opposition"
);

export const HordeOfDragonsInvade = createFrame(
  FrameImageUrls.KNIGHTS_BAND_TOGETHER,
  "???",
  `api/war`,
  "???"
);

export const knightSneakAttack = createFrame(
  FrameImageUrls.KNIGHT_SNEAK_ATTACK,
  "Almost there",
  `api/knights_flees`,
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
  "Stay Right Here?"
);

export const ShowWin = createFrame(
  FrameImageUrls.KNIGHT_WIN,
  "Congratulations anon",
  "api/knghts_win",
  "They shall sing of your deeds in the streets"
);

export const ShowLose = createFrame(
  FrameImageUrls.DRAGON_WINS,
  "Try again?",
  "api/done",
  "???"
);

export const KnightUsesMagic = createFrame(
  FrameImageUrls.KNIGHT_USES_MAGIC,
  "you cast volley of lead on the dragon",
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
  FrameImageUrls.KNIGHT_LOSS,
  "Rock",
  "api/knights_flees",
  "Paper"
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

  return ownerAddress !== zeroAddress ? ownerAddress : undefined;
};

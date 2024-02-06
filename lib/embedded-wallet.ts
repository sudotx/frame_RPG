import axios, { AxiosRequestConfig } from "axios";
// create an embed wallet using open fort
import {
  CreateAccountRequest,
  PlayerMetadataValue,
} from "@openfort/openfort-node";
import { NextResponse } from "next/server";

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
const PRIVY_API_URL =
  process.env.PRIVY_API_URL || "https://auth.privy.io/api/v1";

const config: AxiosRequestConfig = {
  headers: {
    "privy-app-id": PRIVY_APP_ID,
    Authorization: `Basic ${btoa(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`)}`,
  },
};

// PERFORM FOLLOWING USING OPENFORT //

// create a player id for a player
export const createPlayer = async () =>
  // email
  // password(deterministic from the FID)
  // address of user
  {
    // create a new player instance
  };

// signup a player
export const signUp = async () => {};

// log a player in
export const logIn = async () => {};

// retrieve key for an authenticated pplayer
export const retrieveKey = async () => {};

// authorize player with a token
export const authorizePlayer = async () => {};

// retreive a player with its token
export const retrievePlayer = async () => {};

// create an account object
export const createAccountObject = async () => {};

// get an existing account based on fid, address
export const getExistingAccount = async () => {};

// get nft list of player
export const getNFTlist = async () => {};

// retreive nft assets of an account
export const retrieveNFTAssets = async () => {};

// retreive assets of an account
export const getPlayerDetails = async () => {};

// retrieve details of existing player
export const getPlayerAssetDetails = async () => {};

// updates a player object
export const updatePlayer = async () => {};

// create a session key
export const createSessionKey = async () => {};

// list session key of a player
export const listSessionKey = async () => {};

// create web3 conncetion object
export const createWeb3Conncetion = async () => {};

export const createOrFindEmbeddedWalletForFid = async (
  fid: number,
  ownerAddress: string
) => {
  const { address, conflictingDid } = await createEmbeddedWalletForFid(
    fid,
    ownerAddress
  );
  if (address) return address;

  // If no conflicting DID was found for the user, it is an unrecoverable error
  if (!conflictingDid) return undefined;

  // If a conflicting DID was found, check if they have an embedded wallet already
  const existingAddress =
    await findExistingEmbeddedWalletForDid(conflictingDid);
  if (existingAddress) return existingAddress;

  // If no existing embedded wallet, delete the user and recreate it with an embedded wallet
  const newAddress = await deleteAndCreateUserWithEmbeddedWallet(
    conflictingDid,
    fid,
    ownerAddress
  );
  return newAddress;
};

const createEmbeddedWalletForFid = async (
  fid: number,
  ownerAddress: string
) => {
  let embeddedWalletAddress: `0x${string}` | undefined;
  let conflictingDid: string | undefined;
  const proposedUser = {
    create_embedded_wallet: true,
    linked_accounts: [
      {
        type: "farcaster",
        fid: fid,
        owner_address: ownerAddress,
      },
    ],
  };

  try {
    const response = await axios.post(
      `${PRIVY_API_URL}/users`,
      proposedUser,
      config
    );
    const linkedAccounts = response.data.linked_accounts;
    conflictingDid = response.data.id;
    const embeddedWallet = linkedAccounts.find(
      (account: any) => account.type === "wallet"
    );
    embeddedWalletAddress = embeddedWallet ? embeddedWallet.address : undefined;
  } catch (e) {
    conflictingDid = (e as any).response.data.cause;
  }

  return { address: embeddedWalletAddress, conflictingDid: conflictingDid };
};

export const findExistingEmbeddedWalletForDid = async (did: string) => {
  try {
    const response = await axios.get(`${PRIVY_API_URL}/users/${did}`, config);
    const linkedAccounts = response.data.linked_accounts;
    const embeddedWallet = linkedAccounts.find(
      (account: any) => account.type === "wallet"
    );
    return embeddedWallet ? embeddedWallet.address : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const deleteAndCreateUserWithEmbeddedWallet = async (
  did: string,
  fid: number,
  ownerAddress: string
) => {
  try {
    await axios.delete(`${PRIVY_API_URL}/users/${did}`, config);
  } catch (error) {
    // Unable to delete user
    return undefined;
  }

  // Will not try to delete again
  const { address } = await createEmbeddedWalletForFid(fid, ownerAddress);
  return address;
};

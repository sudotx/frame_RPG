import Openfort from "@openfort/openfort-node";
import axios, { AxiosRequestConfig } from "axios";

const OPENFORT_APP_ID = process.env.OPENFORT_APP_ID;
const OPENFORT_APP_SECRET = process.env.OPENFORT_APP_SECRET;
const OPENFORT_API_URL =
  process.env.OPENFORT_APP_URL || "https://api.openfort.xyz/v1/";

const config: AxiosRequestConfig = {
  headers: {
    "OPENFORT-app-id": OPENFORT_APP_ID,
    Authorization: `Basic ${btoa(`${OPENFORT_APP_ID}:${OPENFORT_APP_SECRET}`)}`,
  },
};
const openfort = new Openfort(OPENFORT_APP_SECRET + "");

export const createPlayer = async (name: string) => {
  // create a new player instance
  try {
    const resp = await openfort.players.create({
      name: name,
    });
    return resp;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const createAccountObject = async (chainId: number) => {
  // create a new player instance
  try {
    const response = await openfort.accounts.create({ chainId: chainId });
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const retreiveDetailsOnExistingPlayer = async (id: string) => {
  const resp = await openfort.players.get({
    id: id,
  });
  return resp;
};

// retreive a player with its token
export const retrievePlayer = async (id: string) => {
  const response = await openfort.accounts.get({
    id: id,
  });
  return response;
};

// create a session key
export const createSessionKey = async (
  address: string,
  chainId: number,
  after: number,
  until: number,
  player: string
) => {
  const resp = await openfort.sessions.create({
    address: address,
    chainId: chainId,
    validAfter: after,
    validUntil: until,
    player: player,
  });
  return resp.id;
};

export const getPlayerNFTs = async (id: string, chainId: number) => {
  const resp = await openfort.inventories.getPlayerNftInventory({
    playerId: id,
    chainId: chainId,
  });

  return resp;
};

export const getAContract = async (id: string) => {
  const resp = await openfort.contracts.get({
    id: id,
  });

  return resp;
};
export const list10PLayers = async () => {
  const resp = await openfort.players.list();

  return resp;
};

export const createContractObject = async (
  name: string,
  chainId: number,
  address: string
) => {
  const response = await openfort.contracts.create({
    name: name,
    chainId: chainId,
    address: address,
  });
  return response;
};

// list session key of a player
export const returnsSessionFromSessionID = async (id: string) => {
  const resp = await openfort.sessions.get({
    id: id,
  });

  return resp;
};

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
      `${OPENFORT_API_URL}/users`,
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
    const response = await axios.get(
      `${OPENFORT_API_URL}/users/${did}`,
      config
    );
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
    await axios.delete(`${OPENFORT_API_URL}/users/${did}`, config);
  } catch (error) {
    // Unable to delete user
    return undefined;
  }

  // Will not try to delete again
  const { address } = await createEmbeddedWalletForFid(fid, ownerAddress);
  return address;
};

import Openfort from "@openfort/openfort-node";
import { arbitrumSepolia } from "viem/chains";

const OPENFORT_APP_SECRET = process.env.OPENFORT_APP_SECRET;

const openfort = new Openfort(OPENFORT_APP_SECRET + "");

export const createOrFindSmartWalletForFid = async (
  fid: number,
  ownerAddress: string
) => {
  const existingAddress = await findExistingSmartWalletForFid(String(fid));
  if (existingAddress) return existingAddress;

  const { address } = await createSmartWalletForFid(String(fid), ownerAddress);
  return address;
};

const createSmartWalletForFid = async (fid: string, ownerAddress: string) => {
  let smartWalletAddress: string | undefined;

  try {
    const player = await openfort.players.create({
      name: fid,
      description: "Knight smart wallet",
    });
    const account = await openfort.accounts.create({
      player: player.id,
      chainId: arbitrumSepolia.id,
      externalOwnerAddress: ownerAddress,
    });

    smartWalletAddress = account ? account.address : undefined;
  } catch (e) {
    console.error(e);
  }

  return { address: smartWalletAddress };
};

export const findExistingSmartWalletForFid = async (fid: string) => {
  try {
    const response = await openfort.players.list({
      name: fid,
      expand: ["accounts"],
    });
    if (!response || response.data.length === 0) return undefined;
    const accounts = response.data[0].accounts;
    const smartWallet = accounts?.find(
      (account: any) => account.chainId === arbitrumSepolia.id
    );
    return smartWallet ? smartWallet.address : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

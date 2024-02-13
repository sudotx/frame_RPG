import Openfort from "@openfort/openfort-node";

const OPENFORT_APP_SECRET = process.env.OPENFORT_APP_SECRET;

const openfort = new Openfort(OPENFORT_APP_SECRET + "");

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
      description: "Smart Wallet",
    });
    const account = await openfort.accounts.create({
      player: player.id,
      chainId: 84532,
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
      (account: any) => account.chainId === 84532
    );
    return smartWallet ? smartWallet.address : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

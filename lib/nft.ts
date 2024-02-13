import { createPublicClient, getContract, http } from "viem";
import { baseSepolia } from "viem/chains";

import Openfort from "@openfort/openfort-node";

const CONTRACT_ID = process.env.CONTRACT_ID!;
const POLICY_ID = process.env.POLICY_ID!;
const DEVELOPER_ACCOUNT_ID = process.env.DEVELOPER_ACCOUNT_ID!;
const OPENFORT_API_KEY = process.env.OPENFORT_API_KEY!;
const openfort = new Openfort(OPENFORT_API_KEY);

const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as `0x${string}`; // Optimism Sepolia Testnet

export const createTransactionIntent = async (
  recipient: string,
  fid: number
) => {
  try {
    const tx = await openfort.transactionIntents.create({
      chainId: 84532,
      policy: POLICY_ID,
      account: DEVELOPER_ACCOUNT_ID,
      optimistic: true,
      interactions: [
        {
          contract: CONTRACT_ID,
          functionName: "mint",
          functionArgs: [recipient, fid.toString()],
        },
      ],
    });

    return tx;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getOwnerNFTFromFid = async (address: `0x${string}`) => {
  let ownerAddress: bigint | undefined;
  try {
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });
    const nftContract = getContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      client: publicClient,
    });
    ownerAddress = await nftContract.read.balanceOf([address]);
  } catch (error) {
    console.error(error);
  }
  return ownerAddress === BigInt(0) ? true : false;
};

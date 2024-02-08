import { createWalletClient, encodeFunctionData, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { optimismSepolia } from "viem/chains";

const NFT_WALLET_MNEMONIC = process.env.NFT_WALLET_MNEMONIC as string;
const NFT_GAME_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as `0x${string}`; // Optimism Sepolia Testnet

const JOIN_GAME_ABI = {
  inputs: [
    {
      internalType: "address",
      name: "to",
      type: "address",
    },
  ],
  name: "mint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};
const START_GAME_ABI = {
  inputs: [
    {
      internalType: "address",
      name: "to",
      type: "address",
    },
  ],
  name: "mint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};

export const joinGame = async (id: string, tokenId: string) => {
  try {
    const client = createWalletClient({
      chain: optimismSepolia,
      transport: http(),
    });
    const account = mnemonicToAccount(NFT_WALLET_MNEMONIC);
    const tx = await client.sendTransaction({
      account: account,
      to: NFT_GAME_ADDRESS,
      data: encodeFunctionData({
        abi: [JOIN_GAME_ABI],
        functionName: "joinGame",
        args: [id, tokenId],
      }),
    });
    return tx;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const startGame = async (tokenId: string) => {
  try {
    const client = createWalletClient({
      chain: optimismSepolia,
      transport: http(),
    });
    const account = mnemonicToAccount(NFT_WALLET_MNEMONIC);
    const tx = await client.sendTransaction({
      account: account,
      to: NFT_GAME_ADDRESS,
      data: encodeFunctionData({
        abi: [START_GAME_ABI],
        functionName: "startGame",
        args: [tokenId],
      }),
    });
    return tx;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

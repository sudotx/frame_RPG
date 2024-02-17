import Openfort from "@openfort/openfort-node";
import { arbitrumSepolia } from "viem/chains";

const CONTRACT_ID = process.env.GAME_CONTRACT_ID!;
const POLICY_ID = process.env.GAME_POLICY_ID!;
const DEVELOPER_ACCOUNT_ID = process.env.DEVELOPER_ACCOUNT_ID!;
const OPENFORT_API_KEY = process.env.OPENFORT_API_KEY!;
const openfort = new Openfort(OPENFORT_API_KEY);

export const createTransactionIntent = async (recipient: string) => {
  try {
    const tx = await openfort.transactionIntents.create({
      chainId: arbitrumSepolia.id,
      policy: POLICY_ID,
      account: DEVELOPER_ACCOUNT_ID,
      optimistic: true,
      interactions: [
        {
          contract: CONTRACT_ID,
          functionName: "mint",
          functionArgs: [recipient],
        },
      ],
    });

    return tx;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

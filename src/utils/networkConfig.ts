import { getFullnodeUrl } from "@mysten/sui/client";
import {
  DEVNET_PACKAGE_ID,
  TESTNET_PACKAGE_ID,
  MAINNET_PACKAGE_ID,
} from "./constants";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: { counterPackageId: DEVNET_PACKAGE_ID },
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: { counterPackageId: TESTNET_PACKAGE_ID },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: { counterPackageId: MAINNET_PACKAGE_ID },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };

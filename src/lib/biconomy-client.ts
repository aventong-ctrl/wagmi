// import { sepolia } from "viem/chains";
// import { type WalletClient } from "viem";
// // import { BICONOMY_CONFIG } from "@/config/biconomy";
// import { smartData } from "@/common/smartData";

// export const createBiconomyAccount = async (walletClient: WalletClient) => {
//   // 使用 dynamic import 导入 createSmartAccountClient
//   const { createSmartAccountClient } = await import("@biconomy/account");
//   const smartAccount = await createSmartAccountClient({
//     signer: walletClient,
//     bundlerUrl: smartData.bundlerUrl,
//     paymasterUrl: smartData.paymasterUrl,
//     chainId: sepolia.id,
//   });
//   return smartAccount;
// };

import { sepolia } from "viem/chains";
import { type WalletClient } from "viem";
import { smartData } from "@/common/smartData";

export const createBiconomyAccount = async (walletClient: WalletClient) => {
  // 在导入 Biconomy SDK 前确保 process 对象存在
  if (typeof process === "undefined") {
    (globalThis as any).process = {
      env: {},
    };
  }

  // 使用 dynamic import 导入 createSmartAccountClient
  const { createSmartAccountClient } = await import("@biconomy/account");
  const smartAccount = await createSmartAccountClient({
    signer: walletClient,
    bundlerUrl: smartData.bundlerUrl,
    paymasterUrl: smartData.paymasterUrl, // 确保这个 URL 是正确的
    chainId: sepolia.id,
  });
  return smartAccount;
};

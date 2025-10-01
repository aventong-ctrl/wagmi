import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const walletConnectProjectId = (import.meta as any)?.env?.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;

if (!walletConnectProjectId) {
  throw new Error("Missing WalletConnect projectId. Please set WALLETCONNECT_PROJECT_ID in your environment.");
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [injected(), walletConnect({ projectId: walletConnectProjectId })],
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

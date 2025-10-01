import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [injected(), walletConnect({ projectId: "YOUR_WALLETCONNECT_PROJECT_ID" })],
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

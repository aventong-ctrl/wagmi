// src/components/AaveBalance.tsx
import { useAccount, useReadContract } from "wagmi";
import { poolAbi } from "@/abis/Pool";

const AAVE_POOL_ADDRESS = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

export function AaveBalance() {
  const { address } = useAccount();
  console.log("address", address);

  const { data, isLoading, error } = useReadContract({
    address: AAVE_POOL_ADDRESS,
    abi: poolAbi,
    functionName: "getUserReserveData",
    args: [USDC_ADDRESS, address!],
    query: {
      enabled: !!address,
    },
  });

  if (!address) return <div>Connect wallet</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const [currentATokenBalance] = data || [];
  const formattedBalance = Number(currentATokenBalance) / 1e6; // USDC decimals = 6

  return (
    <div>
      <h3>Your USDC Deposit in Aave:</h3>
      <p>{formattedBalance.toFixed(2)} USDC</p>
    </div>
  );
}

import { useAccount, useBalance, useConnect, useDisconnect, useSendTransaction, useSignMessage, useChainId } from "wagmi";
import { parseEther, formatUnits } from "viem";
import { useState } from "react";

export default function App() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connectors, connect, isPending: isConnectPending, status: connectStatus, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
    chainId,
    query: { enabled: Boolean(address) },
  });
  const { sendTransactionAsync, isPending: isTxPending, status: txStatus, error: txError } = useSendTransaction();
  const { signMessageAsync, isPending: isSignPending, error: signError } = useSignMessage();

  const [to, setTo] = useState("");
  const [showSign, setShowSign] = useState("");
  const [amount, setAmount] = useState("0.001");
  const [message, setMessage] = useState("Hello from wagmi + viem");

  async function toSign() {
    const sig = await signMessageAsync({ message });
    setShowSign(sig);
  }

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">wagmi + viem</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Wallet Connection</h2>
        {isConnected ? (
          <div className="space-y-1">
            <div className="text-sm text-gray-700 dark:text-gray-300">已连接: {address}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">链 ID: {chainId}</div>
            <div className="text-sm">
              余额: {balance ? formatUnits(balance.value, balance.decimals) : "-"} {balance?.symbol}
            </div>
            <button
              className="mt-2 inline-flex items-center rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={() => disconnect()}
            >
              断开连接
            </button>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2">
              {connectors.map((c) => (
                <button
                  key={(c as any).uid ?? c.id}
                  disabled={isConnectPending}
                  onClick={() => connect({ connector: c as any })}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  连接 {c.name}
                </button>
              ))}
            </div>
            <div className="text-sm text-red-500 mt-2">{connectError?.message}</div>
            <div className="text-sm mt-1">状态: {connectStatus}</div>
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">签名消息</h2>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          disabled={!isConnected || isSignPending}
          onClick={toSign}
          className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          签名
        </button>
        <div className="text-sm text-red-500 mt-2">{showSign ? showSign : signError?.message}</div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">发送交易 (原生 ETH)</h2>
        <div className="flex gap-2 mb-2">
          <input
            placeholder="收款地址 0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            placeholder="数量 (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <button
          disabled={!isConnected || isTxPending}
          onClick={async () => {
            if (!to) return alert("请输入收款地址");
            try {
              const hash = await sendTransactionAsync({
                to: to as `0x${string}`,
                value: parseEther(amount),
              });
              alert(`已发送, 交易哈希: ${hash}`);
            } catch (err) {
              console.error(err);
            }
          }}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          发送
        </button>
        <div className="text-sm mt-1">状态: {txStatus}</div>
        <div className="text-sm text-red-500 mt-1">{txError?.message}</div>
      </section>

      <hr className="my-6 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        提示：默认启用 Injected 和 WalletConnect 连接器。若需 WalletConnect，请前往 `src/wagmi.ts` 填写 `projectId`。
      </p>
    </div>
  );
}

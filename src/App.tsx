import { useAccount, useBalance, useConnect, useDisconnect, useSendTransaction, useSignMessage, useChainId } from "wagmi";
import { parseEther } from "viem";
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
  const [amount, setAmount] = useState("0.001");
  const [message, setMessage] = useState("Hello from wagmi + viem");

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "24px auto",
        padding: 16,
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <h1>wagmi + viem </h1>

      <section style={{ marginBottom: 24 }}>
        <h2>钱包连接</h2>
        {isConnected ? (
          <div>
            <div>已连接: {address}</div>
            <div>链 ID: {chainId}</div>
            <div>
              余额: {balance?.formatted} {balance?.symbol}
            </div>
            <button onClick={() => disconnect()}>断开连接</button>
          </div>
        ) : (
          <div>
            {connectors.map((c) => (
              <button
                key={(c as any).uid ?? c.id}
                disabled={isConnectPending}
                onClick={() => connect({ connector: c as any })}
                style={{ marginRight: 8 }}
              >
                连接 {c.name}
              </button>
            ))}
            <div style={{ color: "tomato" }}>{connectError?.message}</div>
            <div>状态: {connectStatus}</div>
          </div>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>签名消息</h2>
        <input value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <button
          disabled={!isConnected || isSignPending}
          onClick={async () => {
            const sig = await signMessageAsync({ message });
            alert(`签名: ${sig}`);
          }}
        >
          签名
        </button>
        <div style={{ color: "tomato" }}>{signError?.message}</div>
      </section>

      <section>
        <h2>发送交易 (原生 ETH)</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input placeholder="收款地址 0x..." value={to} onChange={(e) => setTo(e.target.value)} style={{ flex: 1 }} />
          <input placeholder="数量 (ETH)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: 160 }} />
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
        >
          发送
        </button>
        <div>状态: {txStatus}</div>
        <div style={{ color: "tomato" }}>{txError?.message}</div>
      </section>

      <hr style={{ margin: "24px 0" }} />
      <p style={{ color: "#666" }}>提示：默认启用 Injected 和 WalletConnect 连接器。若需 WalletConnect，请前往 `src/wagmi.ts` 填写 `projectId`。</p>
    </div>
  );
}

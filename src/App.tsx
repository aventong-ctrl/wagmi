import ConnectMan from "./components/ConnectMan";
import Transaction from "./components/Transaction";
import Signature from "./components/SignatureMan";

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      {/* 连接 */}
      <ConnectMan />

      {/* 签名 */}
      <Signature />

      {/* 交易 */}
      <Transaction />

      <hr className="my-6 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        提示：默认启用 Injected 和 WalletConnect 连接器。若需 WalletConnect，请前往 `src/wagmi.ts` 填写 `projectId`。
      </p>
    </div>
  );
}

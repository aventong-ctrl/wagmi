# wagmi + viem 学习项目

基于 Vite + React + TypeScript，集成 wagmi v2 与 viem，包含常见 Web3 交互示例：

- 连接钱包（Injected、WalletConnect）
- 查询余额
- 签名消息
- 发送原生 ETH 交易

## 快速开始

1. 安装依赖（推荐 pnpm）

```bash
pnpm install
```

2. 配置 WalletConnect（可选）

- 前往 `src/wagmi.ts`，将 `projectId` 替换为你的 WalletConnect 项目 ID。

3. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173`。

## 项目结构

```
├─ index.html
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ src
│  ├─ main.tsx          # 入口，挂载 Provider 与 App
│  ├─ App.tsx           # 示例页面（连接、签名、发送交易）
│  └─ wagmi.ts          # wagmi 配置（chains、connectors、transports）
└─ package.json
```

## 说明

- 默认启用 Injected 和 WalletConnect 连接器。
- 未配置 `WalletConnect projectId` 时，WalletConnect 仍会显示，但可能无法正常连接。
- `chains` 默认包含 `mainnet` 与 `sepolia`，可以按需调整。

## 常见问题

- 若浏览器无注入钱包（如 MetaMask），Injected 连接器将显示不可用。
- 发送交易需确保当前链与账户余额充足；测试建议使用 `sepolia`。

## 许可证

MIT

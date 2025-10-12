# 合约部署指南

## 概述

本指南将帮助您在 Sepolia 测试网上部署和测试智能合约，以便与本地 wagmi 项目进行交互。

## 准备工作

### 1. 获取测试 ETH

在 Sepolia 测试网上，您需要 ETH 来支付 gas 费用。可以通过以下水龙头获取：

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

### 2. 设置钱包

确保您的钱包（如 MetaMask）已连接到 Sepolia 测试网：

- 网络名称: Sepolia test network
- RPC URL: https://sepolia.infura.io/v3/YOUR_PROJECT_ID
- 链 ID: 11155111
- 符号: ETH
- 区块浏览器: https://sepolia.etherscan.io

## 部署方法

### 方法 1: 使用 Remix IDE（推荐）

1. 访问 [Remix IDE](https://remix.ethereum.org/)
2. 创建新文件 `SimpleContract.sol`
3. 复制以下合约代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 private value;

    function getValue() public view returns (uint256) {
        return value;
    }

    function setValue(uint256 _value) public {
        value = _value;
    }

    function increment() public {
        value += 1;
    }

    function decrement() public {
        value -= 1;
    }
}
```

4. 编译合约（选择 Solidity 版本 0.8.0+）
5. 切换到 "Deploy & Run Transactions" 标签
6. 选择 "Injected Provider - MetaMask"
7. 确保网络是 Sepolia
8. 点击 "Deploy" 按钮
9. 在 MetaMask 中确认交易
10. 部署完成后，复制合约地址

### 方法 2: 使用 Foundry

1. 安装 Foundry：

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. 创建新项目：

```bash
forge init simple-contract
cd simple-contract
```

3. 替换 `src/SimpleContract.sol` 的内容
4. 编译合约：

```bash
forge build
```

5. 部署到 Sepolia：

```bash
forge create src/SimpleContract.sol:SimpleContract \
  --rpc-url https://sepolia.infura.io/v3/YOUR_PROJECT_ID \
  --private-key YOUR_PRIVATE_KEY
```

## 更新项目配置

部署合约后，需要更新项目中的合约地址：

1. 打开 `src/components/SimpleContractTester.tsx`
2. 找到 `SIMPLE_CONTRACT_ADDRESS` 常量
3. 替换为您部署的合约地址

```typescript
const SIMPLE_CONTRACT_ADDRESS = "0x您的合约地址" as `0x${string}`;
```

## 测试合约功能

1. 启动开发服务器：

```bash
pnpm dev
```

2. 访问 http://localhost:5173/simple-contract
3. 连接您的钱包
4. 测试各种合约功能：
   - 读取当前值
   - 设置新值
   - 增加/减少值

## 常见问题

### Q: 交易失败怎么办？

A: 检查以下几点：

- 确保有足够的 ETH 支付 gas 费用
- 确保网络是 Sepolia 测试网
- 检查合约地址是否正确

### Q: 如何获取合约的 ABI？

A: 在 Remix 中，编译合约后可以在 "artifacts" 文件夹中找到 ABI。或者使用 `forge inspect` 命令。

### Q: 如何验证合约？

A: 在 [Sepolia Etherscan](https://sepolia.etherscan.io/) 上验证您的合约，这样可以在区块浏览器中查看合约源码。

## 更多合约示例

### ERC20 代币合约

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("Test Token", "TEST") {
        _mint(msg.sender, 1000000 * 10**18); // 铸造 100万代币
    }
}
```

### 简单的投票合约

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {
    mapping(address => bool) public hasVoted;
    mapping(string => uint256) public votes;
    string[] public candidates;

    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "Already voted");
        hasVoted[msg.sender] = true;
        votes[candidate]++;
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }
}
```

## 安全注意事项

1. **永远不要在主网上测试**：始终在测试网上进行测试
2. **保护私钥**：不要在任何地方暴露您的私钥
3. **验证合约**：部署前仔细检查合约代码
4. **使用测试代币**：只使用测试代币进行交互

## 有用的资源

- [Remix IDE](https://remix.ethereum.org/)
- [Foundry 文档](https://book.getfoundry.sh/)
- [OpenZeppelin 合约库](https://docs.openzeppelin.com/contracts/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [wagmi 文档](https://wagmi.sh/)

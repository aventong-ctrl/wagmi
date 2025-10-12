# MetaMask 钱包设置指南

## 🦊 安装 MetaMask

如果您还没有安装 MetaMask，请：

1. 访问 [MetaMask 官网](https://metamask.io/)
2. 点击 "Download" 按钮
3. 选择您的浏览器（Chrome、Firefox、Edge 等）
4. 按照提示安装扩展

## 🔧 创建新钱包

### 步骤 1：创建账户

1. 打开 MetaMask 扩展
2. 点击 "Create a new wallet"
3. 阅读并同意服务条款
4. 创建密码（请记住这个密码）

### 步骤 2：备份助记词

1. 点击 "Click here to reveal secret words"
2. **重要**：按顺序记录 12 个助记词
3. 在确认页面按顺序选择助记词
4. 完成钱包创建

⚠️ **安全提示**：

- 永远不要分享您的助记词
- 将助记词写在纸上并妥善保管
- 不要截图或保存在电脑上

## 🌐 添加 Sepolia 测试网

### 方法 1：使用 Chainlist（推荐）

1. 访问 [Chainlist](https://chainlist.org/)
2. 在搜索框中输入 "Sepolia"
3. 找到 "Sepolia test network"
4. 点击 "Add to MetaMask"
5. 在 MetaMask 中点击 "Approve"
6. 点击 "Switch network"

### 方法 2：手动添加

1. 打开 MetaMask
2. 点击顶部的网络下拉菜单
3. 选择 "Add network"
4. 点击 "Add a network manually"
5. 填写以下信息：

```
网络名称: Sepolia test network
RPC URL: https://rpc.sepolia.org
链 ID: 11155111
货币符号: ETH
区块浏览器 URL: https://sepolia.etherscan.io
```

6. 点击 "Save"

## 💰 获取测试 ETH

### 推荐的水龙头

1. **[Sepolia Faucet](https://sepoliafaucet.com/)**
   - 每天可领取 0.5 ETH
   - 需要 Twitter 或 GitHub 验证
   - 最可靠的水龙头

2. **[QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia)**
   - 每天可领取 0.1 ETH
   - 需要邮箱验证
   - 简单易用

3. **[Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)**
   - 每天可领取 0.1 ETH
   - 需要邮箱验证
   - 稳定可靠

### 获取步骤

1. 确保您的钱包已连接到 Sepolia 测试网
2. 复制您的钱包地址（点击账户名即可复制）
3. 访问任一水龙头网站
4. 粘贴您的钱包地址
5. 完成验证（Twitter/GitHub/邮箱）
6. 等待测试 ETH 到账（通常几分钟内）

## ✅ 验证设置

完成设置后，您应该看到：

- ✅ MetaMask 显示 "Sepolia test network"
- ✅ 链 ID 为 11155111
- ✅ 有测试 ETH 余额（用于支付 gas 费用）
- ✅ 钱包地址以 "0x" 开头

## 🔍 在项目中验证

当您访问合约测试页面时，系统会自动检查：

- 🟢 **绿色提示**：网络连接正常，可以开始测试
- 🔴 **红色提示**：网络错误，需要切换到 Sepolia 测试网

## 🚨 常见问题

### Q: 为什么看不到 Sepolia 网络？

A: 确保您使用的是最新版本的 MetaMask，并尝试手动添加网络。

### Q: 水龙头没有给我 ETH？

A: 检查以下几点：

- 确保地址正确
- 等待几分钟（有时需要时间）
- 尝试其他水龙头
- 确保没有达到每日限额

### Q: 交易失败怎么办？

A: 可能的原因：

- 没有足够的 ETH 支付 gas 费用
- 网络拥堵
- 合约地址错误

### Q: 如何查看交易详情？

A: 在 [Sepolia Etherscan](https://sepolia.etherscan.io/) 上输入交易哈希或钱包地址。

## 🔒 安全提醒

1. **永远不要在主网测试**：确保始终在测试网上进行测试
2. **保护私钥**：不要在任何地方分享您的私钥或助记词
3. **验证网站**：只使用官方和可信的网站
4. **小额测试**：先用小额进行测试

## 📱 移动端设置

如果您使用 MetaMask 移动应用：

1. 下载 [MetaMask 移动应用](https://metamask.io/download/)
2. 导入现有钱包或创建新钱包
3. 在设置中添加 Sepolia 测试网
4. 使用相同的 RPC 设置

## 🆘 需要帮助？

如果遇到问题：

1. 查看 [MetaMask 官方文档](https://docs.metamask.io/)
2. 访问 [MetaMask 支持中心](https://support.metamask.io/)
3. 检查 [Sepolia 网络状态](https://sepolia.etherscan.io/)

---

现在您已经准备好开始测试智能合约交互了！🎉

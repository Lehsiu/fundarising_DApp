# ChainDonation DApp

ChainDonation 是一個基於 Ethereum 的捐款平台，企業可發起募資專案，捐款人可透過錢包直接捐款。專案達標後，企業需上傳收據作為捐款用途證明，並透過 Pinata/IPFS 去中心化儲存。

---

## 🚀 專案架構

| 技術         | 用途                         |
|--------------|------------------------------|
| Next.js      | 前端框架（含 API routes）    |
| Web3.js      | 與智能合約互動               |
| Pinata + IPFS| 上傳收據與圖片（去中心化儲存） |
| Solidity     | 募資智能合約（Fundraising.sol） |

---

## 📦 安裝與啟動

```bash
git clone https://github.com/your-repo/chain-donation.git
cd chain-donation

# 安裝依賴
npm install

# 建立 .env 檔
cp .env .env.backup
# 接著在 .env 中填入 PINATA_JWT

# 開發模式啟動
npm run dev


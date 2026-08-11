# Robocore 官網 — 營運／決策文件（集中存放）

**專案根目錄：** `/Users/sang/Documents/Robocore HK website`  
**正式站：** https://robocore.ai/  
**GitHub：** https://github.com/rbcweb/robocore-hk-website  

本資料夾集中存放 **官網相關決策與營運說明**（design、deploy、domain）。  
**唔影響** 日常 build／push／DNS：只係文件整理，無改網站 runtime 行為。

| 檔案 | 內容 |
|------|------|
| [`PROJECT_MEMORY.md`](../../PROJECT_MEMORY.md) | 專案總記憶（首選閱讀） |
| [`design-system.md`](design-system.md) | 設計基準（日後更新必須跟） |
| [`deploy-workflow.md`](deploy-workflow.md) | 本地先 → 用戶 OK → push `main` |
| [`domain-live.md`](domain-live.md) | robocore.ai DNS／GitHub／Wix 注意 |
| [`../WIX_REDIRECT_SETUP.md`](../WIX_REDIRECT_SETUP.md) | 舊 Wix redirect 包（域名已直指 GitHub 後非主路徑） |

## Grok 跨 session 記憶

`~/.grok/memory/user/robocore-*.md` 只保留 **短 pointer**，指向本資料夾，避免兩份內容分叉。  
**以本 repo `docs/ops/` + `PROJECT_MEMORY.md` 為準。**

## 唔好搬／唔好亂改（影響運作）

- 網站原始碼：`src/`、`*.html`、`public/`、`vite.config.js`、`scripts/`
- Deploy：`.github/workflows/deploy.yml`、`public/CNAME`
- DNS／MX／業務子域名（見 `domain-live.md`）
- `node_modules/`、`dist/`（build 產物）

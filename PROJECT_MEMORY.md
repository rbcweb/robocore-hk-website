# 專案記憶（更新 2026-08-03）

> 本檔供人類與之後 AI session 快速接手。Grok 跨 session 記憶亦已寫入 `~/.grok/memory/`。

## 概要

- **名稱：** Robocore HK 官網重新設計（博歌科技）
- **本地：** `/Users/sang/Documents/Robocore HK website`
- **GitHub：** https://github.com/rbcweb/robocore-hk-website （帳號 `rbcweb`）
- **正式網址（2026-08-03 起）：** **https://robocore.ai/** （冇 www；同公司咭片一致）
- **舊 GitHub project URL：** `https://rbcweb.github.io/robocore-hk-website/`（仍會 redirect 去 custom domain，**唔再係主入口**）
- **部署：** push `main` → GitHub Actions `.github/workflows/deploy.yml` → Pages

## 技術

- Vite 多頁靜態站、繁中/EN、`src/js/shell.js` mega menu、`src/js/i18n.js`、`src/js/paths.js`（clean URL）
- **Build：** `BASE_PATH=/`（custom domain 根路徑）；`npm run build` = `vite build && node scripts/clean-urls.mjs`
- **Clean URLs：** 頁面輸出為 `dist/slug/index.html` → 網址 `/slug/`；舊 `slug.html` 保留 redirect stub
- **CNAME：** `public/CNAME` = `robocore.ai`
- 配色：`#141416` + accent `#1DF0A2`
- 地址：九龍灣臨興街 21 號美羅中心二期 17 樓 1721 室
- Email：一律 **`info@robocore.ai`** 細楷

---

## ⭐ 2026-08-03 重要上線紀錄（必讀）

### 1. 正式域名 = robocore.ai（GitHub Pages 主機）

- 老細要求對外用 **`robocore.ai`**（咭片無 www）
- 網站內容在 **GitHub Pages**；域名 DNS 仍由 **Wix** 管理（nameserver `ns0/ns1.wixdns.net`）
- DNS（Wix Manage DNS Records）：
  - **apex `robocore.ai` A** → GitHub：`185.199.108.153` / `.109` / `.110` / `.111`
  - **`www` CNAME** → `rbcweb.github.io`
  - **MX / Outlook 電郵、TXT（SPF/MS）唔好郁**
  - **唔好郁** 其他業務子域名：`api-cn`、`robserver`、`stream`、`temiscript`、`sg` 等
- GitHub Pages → Custom domain：`robocore.ai`（DNS check successful）
- Deploy 必須 **`BASE_PATH=/`**；否則 CSS/JS 會 404（舊 project path `/robocore-hk-website/` 只適用 github.io 子路徑）

### 2. Wix 紅字提示「point away from Wix」

- **預期行為**：域名已指去 GitHub，唔再用 Wix 做網站主機
- **唔好撳** Try Again / Transfer to Wix（會搞亂 DNS）
- 官網唔使再理 Wix Editor 出站；**域名續費 + 電郵 + 其他子域名** 仍要管
- 舊 Wix 內容可留作備份，訪客已唔會見到

### 3. HTTPS

- `https://robocore.ai` 可用
- GitHub **Enforce HTTPS** 若未勾：有得勾就勾；勾唔到可等證書
- 用戶瀏覽器可能已自動 http→https（HSTS／瀏覽器升級）；伺服器端 Enforce 仍建議最終勾上

### 4. Clean URLs（無 `.html`）

| 例 | 網址 |
|----|------|
| 首頁 | `https://robocore.ai/` |
| 產品 | `https://robocore.ai/products/` |
| 詳情 | `https://robocore.ai/temiv3/` |

- 實作：`scripts/clean-urls.mjs` + `src/js/paths.js`；連結用 `pageHref()` / `/slug/`
- Dev：`vite.config.js` middleware 把 `/slug/` 對應 `slug.html`
- 舊 `*.html` 書籤會 redirect 去 `/slug/`

### 5. Browser tab 標題

- **全站** 只顯示：`Robocore Hong Kong`
- 唔再顯示「首頁 | …」「智能產品 | …」等前綴

### 6. Nav / mega 無綠色背景燈（2026-08-03）

- 頂部 tab（產品／新聞／方案／加入／聯絡）hover／active：**只有字色 temi 綠**，**無** 綠底、box-shadow 光暈、text-shadow
- Mega 產品列、extras 同樣：**無** 綠底燈，字色可轉 accent
- 產品卡 **`is-current` 柔光**、Solutions icon 柔光、Contact 輸入綠字 **仍然保留**（唔屬 nav tab 背景燈）

---

## 重要決策（累積）

- temi 與 Pudu 導覽對等；無獨立 Temi Family 主選單、無 temi Center 掣
- 智能產品 Apple 式 mega（含產品類型標籤；**EN 為準**）
- CC1 Pro = AI 四合一清潔（VSLAM+、50 Ah、5k–8k m²）；MT1 Max = 戶外／半戶外掃吸（85 kg、675 mm 高、60 Ah、IP54）；T300／T600 = 工業配送（約 300／600 kg）
- Logo 必須用 `BASE_URL` / `asset()`，唔好 hardcode 錯 base
- 導航順序：產品 → **新聞** → 方案 → 加入 → 聯絡
- 英文新聞 CEO：**Roy Lim**（中：林朗熙）；唔好自創英文名
- Design foundation 已鎖定（見下）；除非用戶明確改版

## 設計基礎（日後更新必須跟）

> 現有視覺／互動即 baseline。除非用戶明確要求改版，**唔好另起一套 design**。  
> 詳細亦見 `~/.grok/memory/user/robocore-design-system.md`

| 範疇 | 準則 |
|------|------|
| 配色 | 深底 `#141416` + temi 綠 `#1DF0A2` |
| 字體 | 全站同一 `--font` stack |
| **Nav／mega tab** | **只有字色 accent**；**無** 綠底／光暈背景（2026-08-03） |
| 產品卡 | hover 微浮；選中 `is-current` 先有 temi 綠柔光（hover 唔加綠邊） |
| 分隔線 | 首頁 section 薄、暗、兩邊淡出的 temi 綠漸變橫線 |
| Spec | 純文字（綠 label + 灰字），無表／無線／無框 |
| Solutions icon | 無灰框／無綠描邊外框，只有柔光 + 圖形 |
| News chip | 短字、width fit-content |
| 新聞內文 | 摘要 + 圖 + 來源 + 原文連結；IG 只外連 |
| 網址 | clean path `/slug/`，無 `.html`；正式域名 `robocore.ai` |
| Tab 標題 | 一律 `Robocore Hong Kong` |
| Contact 輸入 | 打字／caret temi 綠 |
| Email | `info@robocore.ai` 細楷 |
| 人名 | CEO EN **Roy Lim** |

## 更新方式

1. **Local 先做**（改 code / build / 預覽）
2. **等用戶明確 OK** 先推官方（「ok push」「可以上」等）
3. 批准後：`git push origin main` → Pages 約 1 分鐘

⚠️ 未獲用戶批准前 **唔好** 自動 push。  
⚠️ 新功能／新頁必須套用 design foundation + clean URL + `robocore.ai`。

## 相關檔案（全部以本專案目錄為準）

**專案路徑：** `/Users/sang/Documents/Robocore HK website`

| 用途 | 路徑 |
|------|------|
| 本記憶（總覽） | `PROJECT_MEMORY.md` |
| 設計基準 | `docs/ops/design-system.md` |
| Deploy 流程 | `docs/ops/deploy-workflow.md` |
| Domain／DNS | `docs/ops/domain-live.md` |
| 營運文件索引 | `docs/ops/README.md` |
| Deploy workflow | `.github/workflows/deploy.yml`（`BASE_PATH=/`） |
| Clean URL script | `scripts/clean-urls.mjs` |
| Path helpers | `src/js/paths.js` |
| Wix redirect 舊文件 | `docs/WIX_REDIRECT_SETUP.md`（域名已直指 GitHub 後非主路徑） |
| Grok 跨 session | `~/.grok/memory/user/robocore-*.md` **只係 pointer** → 指向 `docs/ops/`（唔再維護第二份全文） |

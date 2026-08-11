# Robocore Hong Kong Website

重新設計的 **博歌科技（Robocore）香港** 官方網站。  
技術：Vite 多頁靜態站 · 繁中／英文 · 品牌配色（深色 + mint `#1DF0A2`）

## 本機開發

```bash
npm install
npm run dev
```

```bash
npm run build    # 產出 dist/
npm run preview
```

## GitHub Pages

本 repo 已設 GitHub Actions：push 到 `main` 會自動 build 並部署 Pages。

1. 在 GitHub 開 **Settings → Pages**
2. **Source** 選 **GitHub Actions**
3. 部署完成後網址：

   `https://<你的帳號>.github.io/robocore-hk-website/`

### 而家：Wix redirect → GitHub Pages

舊站內容仍喺 Wix；訪客可跳去新站。完整步驟同可貼上 code：

→ **[`docs/WIX_REDIRECT_SETUP.md`](docs/WIX_REDIRECT_SETUP.md)**

### 自訂域名（已啟用）

- **正式網址：** https://robocore.ai （冇 www；www 亦應 CNAME 到 `rbcweb.github.io`）
- **DNS：** apex `A` → GitHub Pages IPs；`www` → `rbcweb.github.io`（域名 DNS 多在 Wix 管理）
- **Build：** `BASE_PATH=/`（見 `.github/workflows/deploy.yml`）；`public/CNAME` = `robocore.ai`
- 舊 project 路徑 `https://rbcweb.github.io/robocore-hk-website/` 不再作主入口

### Clean URLs（無 `.html`）

| 頁 | 網址 |
|----|------|
| 首頁 | `https://robocore.ai/` |
| 產品 | `https://robocore.ai/products/` |
| 詳情例 | `https://robocore.ai/temiv3/` |

Build：`vite build` 後 `scripts/clean-urls.mjs` 把 `foo.html` → `foo/index.html`，並保留 `foo.html` 短 redirect 兼容舊連結。

## 營運／決策文件（集中）

| 檔案 | 用途 |
|------|------|
| [`PROJECT_MEMORY.md`](PROJECT_MEMORY.md) | 專案總記憶 |
| [`docs/ops/`](docs/ops/) | design、deploy、domain 詳情 |
| [`docs/WIX_REDIRECT_SETUP.md`](docs/WIX_REDIRECT_SETUP.md) | 舊 Wix redirect 說明 |

## 聯絡

- Email: info@robocore.ai  
- 地址: 九龍灣臨興街 21 號美羅中心二期 17 樓 1721 室

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

### 之後用 Wix domain（DNS）

1. GitHub Pages → Custom domain 填入你哋域名（例如 `www.robocore.ai`）
2. 喺 Wix domain DNS 加 GitHub 提示嘅 **CNAME / A 記錄**
3. 自訂域名生效後，可將 `BASE_PATH` 改為 `/` 再 deploy（見 `vite.config.js`）

## 聯絡

- Email: Info@robocore.ai  
- 地址: 九龍灣臨興街 21 號美羅中心二期 17 樓 1721 室

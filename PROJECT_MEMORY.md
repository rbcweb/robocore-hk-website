# 專案記憶（2026-07-24）

> 本檔供人類與之後 AI session 快速接手。Grok 跨 session 記憶亦已寫入 `~/.grok/memory/`。

## 概要

- **名稱：** Robocore HK 官網重新設計
- **本地：** `/Users/sang/Documents/Robocore HK website`
- **GitHub：** https://github.com/rbcweb/robocore-hk-website
- **線上：** https://rbcweb.github.io/robocore-hk-website/
- **部署：** push `main` → GitHub Actions 自動 Pages

## 技術

- Vite 多頁靜態站、繁中/EN、`src/js/shell.js` mega menu、`src/js/i18n.js`
- 配色：`#141416` + accent `#1DF0A2`
- 地址：九龍灣臨興街 21 號美羅中心二期 17 樓 1721 室

## 重要決策

- temi 與 Pudu 導覽對等；無獨立 Temi Family 主選單、無 temi Center 掣
- 智能產品 Apple 式下拉（含產品類型標籤）
- CC1 = 掃地洗地；MT1 = 大型垃圾
- Domain 計劃：Wix 管 domain，站放 GitHub Pages，之後 DNS 指過去
- **Wix redirect 設定包：** `docs/WIX_REDIRECT_SETUP.md` + `docs/wix-custom-code-redirect.html` + `docs/wix-redirects.csv`（需用戶 login Wix 貼 code；無法 API 代登）
- Logo 必須用 `BASE_URL`（`asset()`），唔好 hardcode `/assets/`

## 更新方式

1. **Local 先做**（改 code / build / 預覽）
2. **等用戶明確 OK** 先推官方
3. 用戶批准後先：`git push origin main` → GitHub Pages 約 1 分鐘更新

⚠️ 未獲用戶批准前 **唔好** 自動 push 官方站。

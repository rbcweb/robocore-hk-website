# 將 Wix（robocore.ai）導向 GitHub 新站

**新站：** https://rbcweb.github.io/robocore-hk-website/  
**舊站：** 仍完整保存在 Wix Editor，redirect **唔會刪** 內容。

> 我無法登入你的 Wix 帳號。以下已備好對照表與可貼上的 code；你 login 後約 5 分鐘可完成。

---

## 重要限制（Wix 官方）

- **首頁 `/` 不能**用 URL Redirect Manager 做 301（Wix 不支援）。
- 因此：**首頁 + 全站** 用 **Custom Code**（方法 A，必做）。
- 其他舊路徑可加 **301 Redirect Manager**（方法 B，建議做，對 SEO 較好）。

---

## 方法 A（必做）：全站 Custom Code（含首頁）

1. 登入 [Wix Dashboard](https://manage.wix.com/) → 揀 **robocore.ai** 個 site  
2. 左邊 **Settings** → **Custom Code**（或 **Tracking & Analytics → Custom Code**）  
3. **+ Add Custom Code**  
4. 貼上下面整段 code  
5. 設定：
   - **Name：** `Redirect to GitHub Pages`
   - **Add Code to Pages：** **All pages**
   - **Place Code in：** **Head**
   - **Load code once**（如有選項）
6. **Apply** → 回到 site → **Publish**

### 可貼上的 code

完整檔案：`docs/wix-custom-code-redirect.html`（下面同內容）

```html
<script>
(function () {
  var BASE = "https://rbcweb.github.io/robocore-hk-website/";
  // Old Wix path (no trailing slash) → new site path
  var MAP = {
    "/": "",
    "/home": "",
    "/products": "products.html",
    "/solutions": "solutions.html",
    "/temifamily": "temifamily.html",
    "/temi-family": "temifamily.html",
    "/temiv3": "temiv3.html",
    "/temi-v3": "temiv3.html",
    "/temigo": "temigo.html",
    "/temi-go": "temigo.html",
    "/temigopro": "temigopro.html",
    "/temi-go-pro": "temigopro.html",
    "/temiplatform": "temiplatform.html",
    "/temi-platform": "temiplatform.html",
    "/blackjack": "blackjack.html",
    "/fourcast": "fourcast.html",
    "/zpine": "zpine.html",
    "/liftmodule": "liftmodule.html",
    "/lift-module": "liftmodule.html",
    "/pudu": "pudu.html",
    "/contactus": "contactus.html",
    "/contact": "contactus.html",
    "/contact-us": "contactus.html",
    "/joinus": "joinus.html",
    "/join-us": "joinus.html",
    "/news": "news.html",
    "/temiwarranty": "temiwarranty.html",
    "/temi-warranty": "temiwarranty.html",
    "/yunji": "products.html"
  };

  var path = (location.pathname || "/").replace(/\/+$/, "") || "/";
  path = path.toLowerCase();
  var dest = Object.prototype.hasOwnProperty.call(MAP, path) ? MAP[path] : "";
  var target = BASE + dest + (location.search || "") + (location.hash || "");
  location.replace(target);
})();
</script>
```

**取消 redirect：** 刪除或關閉呢段 Custom Code → Publish。舊站即時返嚟。

---

## 方法 B（建議）：URL Redirect Manager（子頁 301）

> 唔包括首頁。外部網址可填完整 URL。

1. Dashboard → **SEO & GEO**（或 **Marketing & SEO**）  
2. 向下 **Tools and settings** → **URL Redirect Manager**  
3. **+ New Redirect** → **Single redirect**  
4. 逐條加（或用 Import CSV，若你個計劃有）：

| Old URL（Wix 路徑） | New URL（外部完整） |
|---------------------|---------------------|
| `/products` | `https://rbcweb.github.io/robocore-hk-website/products.html` |
| `/solutions` | `https://rbcweb.github.io/robocore-hk-website/solutions.html` |
| `/temifamily` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html` |
| `/temiv3` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html#temiv3` |
| `/temigo` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html#temigo` |
| `/temigopro` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html#temigopro` |
| `/temiplatform` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html#temiplatform` |
| `/blackjack` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html#blackjack` |
| `/fourcast` | `https://rbcweb.github.io/robocore-hk-website/temifamily.html#fourcast` |
| `/zpine` | `https://rbcweb.github.io/robocore-hk-website/zpine.html` |
| `/liftmodule` | `https://rbcweb.github.io/robocore-hk-website/liftmodule.html` |
| `/pudu` | `https://rbcweb.github.io/robocore-hk-website/pudu.html` |
| `/contactus` | `https://rbcweb.github.io/robocore-hk-website/contactus.html` |
| `/joinus` | `https://rbcweb.github.io/robocore-hk-website/joinus.html` |
| `/news` | `https://rbcweb.github.io/robocore-hk-website/news.html` |
| `/temiwarranty` | `https://rbcweb.github.io/robocore-hk-website/temiwarranty.html` |

CSV 檔：`docs/wix-redirects.csv`（Wix 支援 import 時可一次上載）。

若 Wix 舊 slug 唔同（例如 `/all-products`），以 Editor 左側頁面 URL 為準，改 Old URL。

---

## 驗證

用 **無痕視窗**（未 login Wix）：

1. https://www.robocore.ai/ → 應跳去 GitHub 首頁  
2. https://www.robocore.ai/products → 應跳去 `.../products.html`  
3. 登入 Wix Editor → 舊頁 **仍然存在**  

若未跳轉：確認 Custom Code 已 **Apply + Publish**，等 1–2 分鐘，硬性重新整理。

---

## 之後（可選）：Domain 直指 GitHub

Redirect 穩定後，可將 DNS 指去 GitHub Pages，訪客就唔使經 Wix 再跳。  
需要改 `BASE_PATH=/` 再 deploy。詳見 `README.md`。

---

## 舊站會唔會冇？

| | |
|--|--|
| Wix Editor 內容 | **保留** |
| 訪客 | 見到新站 |
| 還原 | 刪 Custom Code + 刪 301 → Publish |

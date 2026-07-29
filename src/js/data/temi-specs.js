/** temi product specifications — EN is source of truth; ZH mirrors meaning
 *  Physical figures from public product literature (subject to change by manufacturer).
 */
import { puduSpecs } from "./pudu-specs.js";

export const temiSpecs = {
  temiv3: [
    { label: { zh: "類型", en: "Type" }, value: { zh: "多功能智能服務機械人", en: "Multi-purpose smart service robot" } },
    { label: { zh: "尺寸（高 × 寬 × 深）", en: "Dimensions (H × W × D)" }, value: { zh: "100 × 35 × 45 cm", en: "100 × 35 × 45 cm" } },
    { label: { zh: "重量", en: "Weight" }, value: { zh: "約 12 kg", en: "Approx. 12 kg" } },
    { label: { zh: "螢幕", en: "Display" }, value: { zh: "13.3 吋電容多點觸控", en: "13.3\" capacitive multi-touch" } },
    { label: { zh: "最高速度", en: "Max. speed" }, value: { zh: "約 1 m/s", en: "Approx. 1 m/s" } },
    { label: { zh: "電池續航", en: "Battery runtime" }, value: { zh: "混合使用約 8 小時；低電量自動回充", en: "About 8 hours mixed use; auto-dock when low" } },
    { label: { zh: "導航", en: "Navigation" }, value: { zh: "室內全自主導航、避障與路徑規劃", en: "Full indoor autonomy, obstacle avoidance & path planning" } },
    { label: { zh: "感測", en: "Sensing" }, value: { zh: "LiDAR、深度相機、RGB 相機、ToF 等", en: "LiDAR, depth cameras, RGB cameras, ToF sensors" } },
    { label: { zh: "跟隨", en: "Follow" }, value: { zh: "AI 自動跟隨", en: "AI auto-follow" } },
    { label: { zh: "通訊", en: "Communication" }, value: { zh: "遠程視頻通話與影音", en: "Remote video calling & A/V" } },
    { label: { zh: "連接", en: "Connectivity" }, value: { zh: "Wi‑Fi、5G", en: "Wi‑Fi, 5G" } },
    { label: { zh: "平台", en: "Platform" }, value: { zh: "開放 SDK；temi Center 管理", en: "Open SDK; temi Center management" } },
    { label: { zh: "充電", en: "Charging" }, value: { zh: "自動回充", en: "Auto docking / recharge" } },
    { label: { zh: "應用場景", en: "Use cases" }, value: { zh: "接待、導覽、遠程協作、服務輔助", en: "Reception, guiding, remote collab, service assist" } },
  ],
  temiplatform: [
    { label: { zh: "類型", en: "Type" }, value: { zh: "開放式導航底盤", en: "Open navigation chassis" } },
    { label: { zh: "定位", en: "Positioning" }, value: { zh: "temi 家族通用機械人底盤", en: "Universal chassis for the temi family" } },
    { label: { zh: "導航", en: "Navigation" }, value: { zh: "自主定位與避障（temi 平台）", en: "Autonomous localization & avoidance (temi platform)" } },
    { label: { zh: "開發", en: "Development" }, value: { zh: "完全開放 SDK", en: "Fully open SDK" } },
    { label: { zh: "擴展", en: "Expandability" }, value: { zh: "可自由組合設備與配件", en: "Freely combine devices & accessories" } },
    { label: { zh: "介面", en: "Interfaces" }, value: { zh: "支援模組化上裝與外接設備", en: "Modular top mounts & external devices" } },
    { label: { zh: "管理", en: "Management" }, value: { zh: "temi Center 平台支援", en: "Supported by temi Center" } },
    { label: { zh: "兼容", en: "Compatibility" }, value: { zh: "與 temi 應用程式兼容", en: "Compatible with the temi app" } },
    { label: { zh: "應用場景", en: "Use cases" }, value: { zh: "客製化機械人方案、研發與整合", en: "Custom robot solutions, R&D & integration" } },
  ],
  temigo: [
    { label: { zh: "類型", en: "Type" }, value: { zh: "智能配送機械人", en: "Intelligent delivery robot" } },
    { label: { zh: "尺寸（直徑）", en: "Diameter" }, value: { zh: "約 50 cm", en: "Approx. 50 cm" } },
    { label: { zh: "介面板高度", en: "Interface plate height" }, value: { zh: "約 25 cm", en: "Approx. 25 cm" } },
    { label: { zh: "自重", en: "Net weight" }, value: { zh: "約 25 kg", en: "Approx. 25 kg" } },
    { label: { zh: "總重（含載荷）", en: "Total weight (with payload)" }, value: { zh: "最高約 75 kg", en: "Up to approx. 75 kg" } },
    { label: { zh: "載運方式", en: "Load type" }, value: { zh: "開放式托盤", en: "Open-tray" } },
    { label: { zh: "導航", en: "Navigation" }, value: { zh: "自主室內導航與避障", en: "Autonomous indoor navigation & avoidance" } },
    { label: { zh: "控制", en: "Control" }, value: { zh: "平板、語音、temi Center", en: "Tablet, voice, temi Center" } },
    { label: { zh: "開發", en: "Development" }, value: { zh: "開放 SDK", en: "Open SDK" } },
    { label: { zh: "應用場景", en: "Use cases" }, value: { zh: "餐廳、美食廣場、零售配送", en: "Restaurants, food courts, retail delivery" } },
    { label: { zh: "典型載物", en: "Typical payload" }, value: { zh: "餐飲、飲品、托盤物品", en: "Food, drinks, tray goods" } },
  ],
  temigopro: [
    { label: { zh: "類型", en: "Type" }, value: { zh: "高級四門配送機械人", en: "Premium quad-door delivery robot" } },
    { label: { zh: "高度", en: "Height" }, value: { zh: "122.8 cm", en: "122.8 cm" } },
    { label: { zh: "直徑", en: "Diameter" }, value: { zh: "54.8 cm", en: "54.8 cm" } },
    { label: { zh: "自重", en: "Net weight" }, value: { zh: "75.5 kg", en: "75.5 kg" } },
    { label: { zh: "總重（含載荷）", en: "Total weight (with payload)" }, value: { zh: "最高約 115 kg", en: "Up to approx. 115 kg" } },
    { label: { zh: "艙門", en: "Doors" }, value: { zh: "四電門，獨立控制", en: "Four electric doors, independently controlled" } },
    { label: { zh: "艙體配置", en: "Cabinets" }, value: { zh: "可配置 1／2／4 艙（可拆隔板）", en: "Configurable 1 / 2 / 4 cabinets (removable partitions)" } },
    { label: { zh: "最高線速度", en: "Max. linear speed" }, value: { zh: "1 m/s", en: "1 m/s" } },
    { label: { zh: "最大坡度", en: "Max. slope" }, value: { zh: "3°", en: "3°" } },
    { label: { zh: "電池續航", en: "Battery runtime" }, value: { zh: "正常使用約 4–5 小時；待機約 18 小時", en: "Normal use approx. 4–5 hrs; standby approx. 18 hrs" } },
    { label: { zh: "充電時間", en: "Charging time" }, value: { zh: "0–100% 約 5 小時", en: "0–100% approx. 5 hrs" } },
    { label: { zh: "電池容量", en: "Battery capacity" }, value: { zh: "20.8 Ah", en: "20.8 Ah" } },
    { label: { zh: "LiDAR 範圍", en: "LiDAR range" }, value: { zh: "約 40 m", en: "Approx. 40 m" } },
    { label: { zh: "地圖面積", en: "Map size" }, value: { zh: "約 15,000–20,000 m²", en: "Approx. 15,000–20,000 m²" } },
    { label: { zh: "控制", en: "Control" }, value: { zh: "螢幕、語音、temi Center", en: "Screen, voice, temi Center" } },
    { label: { zh: "應用場景", en: "Use cases" }, value: { zh: "餐廳、美食廣場、辦公室、零售跨層配送", en: "Restaurants, food courts, offices, retail multi-floor delivery" } },
  ],
  blackjack: [
    { label: { zh: "類型", en: "Type" }, value: { zh: "偵測與巡邏機械人", en: "Detection & patrol robot" } },
    { label: { zh: "底盤", en: "Chassis" }, value: { zh: "整合 temi 導航底盤", en: "Integrated temi navigation chassis" } },
    { label: { zh: "底盤尺寸參考", en: "Chassis size (ref.)" }, value: { zh: "約高 100 cm 級 temi 底盤平台", en: "Approx. 100 cm-class temi platform height" } },
    { label: { zh: "感測器", en: "Sensors" }, value: { zh: "可調高度感測器、振動加速度計", en: "Height-adjustable sensors, vibration accelerometer" } },
    { label: { zh: "攝影機", en: "Cameras" }, value: { zh: "內建 4K／360° 雙攝影機系統", en: "Built-in dual 4K / 360° camera system" } },
    { label: { zh: "導航", en: "Navigation" }, value: { zh: "自主巡邏與巡檢路徑", en: "Autonomous patrol & inspection routes" } },
    { label: { zh: "應用場景", en: "Use cases" }, value: { zh: "電梯巡檢、物業管理、保全巡邏", en: "Elevator inspection, property management, security patrol" } },
  ],
  fourcast: [
    { label: { zh: "類型", en: "Type" }, value: { zh: "流動廣告機械人", en: "Mobile advertising robot" } },
    { label: { zh: "底盤", en: "Chassis" }, value: { zh: "整合 temi 導航底盤", en: "Integrated temi navigation chassis" } },
    { label: { zh: "顯示", en: "Displays" }, value: { zh: "四邊 38.8 吋螢幕", en: "Four-sided 38.8\" screens" } },
    { label: { zh: "投影", en: "Projection" }, value: { zh: "整合投影機", en: "Integrated projector" } },
    { label: { zh: "感知", en: "Sensing" }, value: { zh: "深度相機、光達、懸崖感應、攝影機", en: "Depth camera, LiDAR, cliff sensors, cameras" } },
    { label: { zh: "導航", en: "Navigation" }, value: { zh: "高性能自主導航", en: "High-performance autonomous navigation" } },
    { label: { zh: "應用場景", en: "Use cases" }, value: { zh: "商場、展會、品牌推廣、活動宣傳", en: "Malls, exhibitions, brand promotion, events" } },
  ],
};

/** Specs as text only (no table / no lines) — temi + pudu */
export function renderSpecsTable(productId, lang = "zh") {
  const rows = temiSpecs[productId] || puduSpecs[productId];
  if (!rows?.length) return "";
  const body = rows
    .map((row) => {
      const label = row.label[lang] || row.label.en || row.label.zh;
      const value = row.value[lang] || row.value.en || row.value.zh;
      return `<li class="spec-item"><span class="spec-label">${label}</span><span class="spec-value">${value}</span></li>`;
    })
    .join("");
  return `<ul class="spec-list">${body}</ul>`;
}

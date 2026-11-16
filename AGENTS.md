# AGENTS.md — Kotoba Notes 專案開發規範

> 本文件是給協助開發本站的 AI Agent 閱讀的長期規則。新增或修改任何內容前，請先閱讀本文件與 `README.md`。

## 1. 專案目的與使用者

Kotoba Notes 是一個以繁體中文介紹日文的個人學習知識庫。目標是讓初學者能依「單字、文法、會話」分類，閱讀包含日文原文、平假名讀音與中文翻譯的筆記。這個專案的重點不只在目前頁面，也在於 AI 可以持續依同一套規則擴充內容。

- 主要讀者：使用繁體中文的日文初學者，初期內容以 JLPT N5 為主，未來可擴充 N4～N1。
- 使用語言：網站介面、說明、註解主要使用繁體中文；例句使用自然的日文。
- 技術限制：只使用靜態 HTML、CSS、原生 JavaScript，不使用後端、打包工具、第三方 UI 框架與遠端 API。
- 部署環境：GitHub Pages。所有資源使用相對路徑，例如 `./assets/css/style.css`，不可寫死網域或 `/` 根路徑。

## 2. 網站視覺風格

- 主色：墨綠 `#2b6556`；背景：米白 `#fbfaf6`；文字：深綠黑 `#1d302d`。
- 風格：簡潔、沉穩、留白充足、圓角卡片、柔和色塊，不使用大量動畫。
- 標題清晰分層：每頁僅一個 `h1`；區段採 `h2`，卡片標題採 `h3`。
- 手機、平板及桌面都必須可讀；360px 寬度不得出現水平捲動。
- 全站視覺樣式集中於 `assets/css/style.css`，新增頁面應沿用既有 class，而非複製一套 CSS。
- 提供可見的滑鼠與鍵盤互動狀態；所有導覽使用語意化連結或按鈕。

## 3. 專案目錄與檔案命名

```text
japanese-notes-site/
├── AGENTS.md                # AI Agent 開發約定（本文件）
├── README.md                # 人類開發者的安裝與部署說明
├── index.html               # 筆記列表、搜尋與分類
├── lesson.html              # 共用筆記內頁模板
├── data/
│   └── lessons.js           # 唯一的筆記內容資料來源
├── assets/
│   ├── css/style.css        # 全站共用設計
│   └── js/app.js            # 列表、搜尋、分類、筆記頁渲染
└── scripts/
    └── validate.mjs        # 內容結構檢查工具
```

- 所有目錄及檔名採英文小寫 `kebab-case`；除 `AGENTS.md`、`README.md` 等慣例檔名外，不用空白或中文檔名。
- 新增一般筆記時，只修改 `data/lessons.js`，**不要**為每篇筆記新增獨立 HTML，也不要改動共用樣式或渲染邏輯。
- 若需要新增一種「內容類別」，先更新本文件、`app.js` 的 `CATEGORIES`、首頁篩選器及對應 CSS，再建立內容。
- 不得任意移動檔案或破壞既有連結格式 `lesson.html?lesson=<slug>`。

## 4. 筆記資料 Schema（嚴格遵守）

所有筆記皆放在 `data/lessons.js` 的 `window.LESSONS = [...]` 陣列中。每筆資料必須具備下列欄位，不允許擅自更名或省略：

| 欄位 | 型別 | 規則 |
| --- | --- | --- |
| `slug` | string | 唯一 ID，只用英文小寫及連字號，例如 `basic-particles`，不可重複 |
| `title` | string | 繁體中文標題，應直觀、具體 |
| `category` | string | 僅能為 `vocabulary`、`grammar`、`conversation` |
| `level` | string | `N5`、`N4`、`N3`、`N2`、`N1` 其中之一 |
| `summary` | string | 1 句繁體中文摘要，說明本篇能學到什麼 |
| `updated` | string | `YYYY-MM-DD` 格式，填寫實際更新日 |
| `readingMinutes` | number | 正整數，估計閱讀分鐘數 |
| `sections` | array | 至少 1 個章節，每章節有 `heading`、`text`、`examples` |
| `sections[].heading` | string | 章節標題 |
| `sections[].text` | string | 繁體中文解說，清楚簡短 |
| `sections[].examples` | array | 至少 1 組例句，內含下列 3 個必填欄位 |
| `examples[].japanese` | string | 日文詞彙／完整例句，可使用漢字 |
| `examples[].reading` | string | 對應的**全平假名讀音**（標點可保留） |
| `examples[].chinese` | string | 繁體中文翻譯 |

新增資料範本（請複製到 `window.LESSONS` 陣列中，並注意逗號）：

```js
{
  slug: 'basic-greetings',
  title: '常見日文招呼語',
  category: 'conversation',
  level: 'N5',
  summary: '學習早安與初次見面的常見表達。',
  updated: '2026-11-16',
  readingMinutes: 3,
  sections: [
    {
      heading: '基本招呼',
      text: '依照場合與對象選擇適當的招呼語。',
      examples: [
        { japanese: 'おはようございます。', reading: 'おはようございます。', chinese: '早安。' }
      ]
    }
  ]
}
```

## 5. AI 新增筆記的標準工作流程

當使用者要求「新增一篇關於 X 的筆記」時，請依順序執行：

1. 閱讀 `AGENTS.md`、`data/lessons.js`，確認既有分類及 slug 不重複。
2. 選擇最貼近主題的 `category`，若既有分類足夠，不新增分類。
3. 以英文小寫連字號命名 slug；標題、摘要、解說、翻譯使用繁體中文。
4. 至少準備 1 個章節與 1 組三欄完整例句；檢查日文、讀音與中文意義一致，尤其注意助詞和長音。
5. 只把新的物件加入 `data/lessons.js`；保持現有資料格式、排序與欄位名稱。
6. 執行 `node scripts/validate.mjs`，必須全部通過。
7. 檢查首頁可看見新卡片，搜尋與分類運作正常，點入後 `lesson.html?lesson=<slug>` 能顯示全部章節，手機版也可閱讀。
8. 回覆使用者：新增的標題、slug、分類、驗證結果及有無其他變動。

## 6. AI 修改內容的規則

- 修正文法、翻譯或拼字時，僅更動相關筆記；其他筆記的 slug 和連結必須維持不變。
- 不可憑空宣稱日文正確；若不確定用法，清楚標記需人工核對，避免編造例句來源。
- 不加入未經要求的追蹤器、付費服務、帳號登入、外部字型或 API 金鑰。
- 保持搜尋可涵蓋標題、摘要、章節與例句；分類選項與資料分類須一致。
- 若不得不改變資料 Schema，先同步更新本文件、驗證腳本、渲染程式及所有既有筆記。
- 使用 `textContent` 輸出筆記文字；避免把資料直接插入 `innerHTML`，以降低 HTML 注入風險。
- 不得刪除使用者已建立的筆記，除非使用者明確要求。

## 7. 驗收標準（Definition of Done）

- [ ] `node scripts/validate.mjs` 沒有錯誤。
- [ ] 首頁至少顯示 1 篇筆記；搜尋與分類可正常使用。
- [ ] 所有筆記卡片皆能開啟各自的詳細內容。
- [ ] 未知 slug 有明確的「找不到筆記」訊息，並可返回首頁。
- [ ] 頁面標題、語言、色彩與版型符合本文件。
- [ ] GitHub Pages 上所有檔案的相對路徑正確，重新整理後頁面仍可正常瀏覽。
- [ ] 新增筆記只需修改 `data/lessons.js`，不必複製 HTML 模板。

## 8. 可重複使用的 AI 指令範例

> 請先閱讀 AGENTS.md，遵守現有命名規則和資料 Schema，在 `data/lessons.js` 新增一篇 `N5` 程度的「助詞 は 與 が」文法筆記。請包含至少兩個章節、各兩組日文／平假名／中文例句。不要改動其他頁面或舊資料，完成後執行驗證腳本並回報結果。

此流程能夠反覆套用到新的單字、文法、會話內容；使用者不需要每次重新說明網站長相、檔案位置與開發方法。

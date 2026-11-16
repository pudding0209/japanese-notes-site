# Kotoba Notes｜日文學習筆記

以原生 HTML、CSS、JavaScript 建立的靜態日文學習知識庫。包含筆記首頁、即時搜尋、分類篩選與共用文章內頁。開發與新增內容請先閱讀 [AGENTS.md](./AGENTS.md)。

## 頁面與功能

- `index.html`：展示所有筆記、搜尋及分類。
- `lesson.html?lesson=time-expressions`：依 slug 顯示對應內容，所有文章共用一份模板。
- `data/lessons.js`：所有筆記資料的唯一來源（目前提供 3 篇範例）。
- `scripts/validate.mjs`：檢查筆記欄位、分類、slug 與內容格式。

## 本機預覽

可以直接以瀏覽器開啟 `index.html`。若有 Python，可在專案資料夾執行：

```bash
python -m http.server 8000
```

再瀏覽 `http://localhost:8000`。檢查內容格式需安裝 Node.js：

```bash
node scripts/validate.mjs
```

## 如何新增筆記

1. 閱讀 `AGENTS.md` 的第 4、5 節。
2. 開啟 `data/lessons.js`，依既有物件格式新增一篇資料。
3. 新筆記會自動出現在首頁，並擁有獨立網址 `lesson.html?lesson=你的-slug`。
4. 執行 `node scripts/validate.mjs`，確保格式正確。

## GitHub Pages 部署教學

1. 登入 GitHub，新增一個 **Public** Repository，例如 `japanese-notes-site`。
2. 將本專案根目錄的所有檔案和資料夾上傳至 Repository 根目錄。**不要只上傳 ZIP 壓縮檔**。
3. 在 Repository 開啟 **Settings → Pages → Build and deployment**。
4. 選擇 **Deploy from a branch**，選擇分支 `main`、資料夾 `/(root)`，按 **Save**。
5. 等 GitHub Pages 部署完成後，公開網址通常為：`https://<你的帳號>.github.io/japanese-notes-site/`。請以 GitHub Pages 頁面顯示的實際網址為準。
6. 測試首頁、分類按鈕、搜尋與三篇筆記連結。

> 如果 Repository 名稱不是 `japanese-notes-site`，公開網址中的最後一段會跟著改變。

## 本次作業要點

本專案有 `AGENTS.md`，明確描述目的、視覺風格、資料 Schema、檔案結構、AI 新增內容流程及驗證標準。未來只需追加資料，便能自動套用相同模板，符合可延伸與可重複使用的概念。

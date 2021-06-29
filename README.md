# 簡介
簡單的餐廳清單，目的是讓使用者查詢並挑選餐廳

## 功能說明
### 餐廳的簡單資料
* 照片
* 名稱
* 分類
* 評分

### 餐廳的詳細資訊
* 類別
* 地址
* 電話
* 描述
* 圖片

### 搜尋功能
- 在搜尋欄內輸入關鍵字，按下Search鍵可以搜尋餐廳
搜尋後關鍵字依然會顯示在搜尋欄內

- 可以篩選出種類（例如：搜尋「義式」會出現「所有的義式餐廳」）

### 其他功能
按下左上的「我的餐廳清單」會返回首頁

---

## 環境建置
- 開發環境 Visual Studio Code v1.57.1
- 執行環境 Node.js v10.15.0
- 框架 Express.js v4.17.1
- 模板引擎 Express-handlebars v5.3.2
- 實用套件 Nodemon v2.0.7

---

## 安裝 

1. 在終端機輸入指令 Clone 此專案至電腦
```
git clone https://github.com/zeqas/AC_2-3_S3_A3.git
```
2. 進入專案目錄
```
cd AC_2-3_S3_A3
```
3. 安裝相關套件
```
npm install
```
4. 啟動專案
```
npm run dev
```
5. 出現以下訊息後，即可在 http://localhost:3000 開始使用
```
Express is listening on localhost:3000

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

## v2.0 

### 新增CRUD功能

1. 使用者可以新增一家餐廳
2. 使用者可以瀏覽一家餐廳的詳細資訊
3. 使用者可以瀏覽全部所有餐廳
4. 使用者可以依據餐廳名稱與類別搜尋特定餐廳
5. 使用者可以修改一家餐廳的資訊
6. 使用者可以刪除一家餐廳

---

## 環境建置
- 開發環境 Visual Studio Code v1.57.1
- 執行環境 Node.js v10.15.0
- 框架 Express.js v4.17.1
- 模板引擎 Express-handlebars v5.3.2
- 實用套件 Nodemon v2.0.7
- 重構套件 Method-override v3.0.0

---

## 安裝 

1. 在終端機輸入指令 Clone 此專案至電腦
```
git clone https://github.com/zeqas/restaurant_List.git
```
2. 進入專案目錄
```
cd restaurant_List_S3A3
```
3. 安裝相關套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 啟動專案
```
npm run dev
```
6. 出現以下訊息後，即可在 http://localhost:3000 開始使用
```
Express is listening on localhost:3000

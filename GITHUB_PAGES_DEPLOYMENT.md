# GitHub Pages 部署指南

本文檔說明如何將此網站部署到 GitHub Pages。

## 前置要求

1. GitHub 帳戶
2. Git 已安裝
3. 項目已初始化為 Git 倉庫

## 部署步驟

### 1. 創建 GitHub 倉庫

1. 登錄 GitHub
2. 創建新倉庫，命名為 `procurement-agency` 或您喜歡的名稱
3. 複製倉庫 URL

### 2. 初始化本地 Git 倉庫

```bash
cd /home/ubuntu/procurement_agency_site
git init
git add .
git commit -m "Initial commit: Procurement agency website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/procurement-agency.git
git push -u origin main
```

### 3. 配置 GitHub Pages

#### 選項 A：使用 `dist/public` 目錄（推薦）

1. 進入 GitHub 倉庫設置
2. 找到 "Pages" 部分
3. 在 "Build and deployment" 下：
   - Source: 選擇 "Deploy from a branch"
   - Branch: 選擇 `main`
   - Folder: 選擇 `/dist/public`
4. 點擊 "Save"

#### 選項 B：使用 GitHub Actions 自動構建

1. 在項目根目錄創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

2. 提交並推送到 GitHub：

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### 4. 驗證部署

1. 進入 GitHub 倉庫的 "Actions" 標籤
2. 查看構建日誌
3. 部署完成後，訪問 `https://YOUR_USERNAME.github.io/procurement-agency`

## 配置自定義域名（可選）

如果您有自己的域名：

1. 進入 GitHub 倉庫設置
2. 找到 "Pages" 部分
3. 在 "Custom domain" 輸入您的域名（例如 `procurement-agency.com`）
4. 在您的域名 DNS 設置中添加 CNAME 記錄，指向 `YOUR_USERNAME.github.io`

## 路由配置

由於這是 React SPA 應用，所有路由都通過 `index.html` 處理。GitHub Pages 會自動將不存在的文件請求重定向到 `index.html`，因此路由會正常工作。

## 常見問題

### Q: 頁面顯示 404 錯誤
A: 確保在 GitHub Pages 設置中選擇了正確的分支和文件夾 (`/dist/public`)

### Q: 樣式或資源未加載
A: 檢查 `vite.config.ts` 中的 `base` 配置。當前設置為 `./` 以支持相對路徑。

### Q: 表單提交不工作
A: FormSubmit 服務需要互聯網連接。確保您的郵箱地址在 `client/src/pages/Contact.tsx` 中正確配置。

### Q: 想要使用自己的域名
A: 在 GitHub Pages 設置中配置自定義域名，然後更新 DNS 記錄。

## 更新網站

每次您想更新網站時：

1. 修改代碼
2. 構建項目：`pnpm build`
3. 提交更改：
   ```bash
   git add .
   git commit -m "Update: [描述您的更改]"
   git push
   ```
4. GitHub Actions 會自動構建並部署（如果使用 GitHub Actions）

## 本地測試

在部署前，您可以在本地測試：

```bash
# 構建
pnpm build

# 預覽構建結果
pnpm preview
```

然後訪問 `http://localhost:3000`

## 支持

如有任何問題，請參考：
- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)


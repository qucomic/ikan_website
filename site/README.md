# 爱看 ikan 静态官网

直接打开 `index.html`，或在此目录执行 `python3 -m http.server 8080`，访问 http://localhost:8080 。无须安装依赖，无后端、无构建步骤，运行时不访问外部字体、CDN 或 API。

## 文件

- `index.html`：产品官网。
- `guide.html`：新手使用指南。
- `rules.html`、`manual/`：规则入门与完整规则手册。
- `styles.css`：响应式样式（含移动端菜单、减少动画支持）。
- `app.js`：菜单、三种界面示意切换、下载入口配置。
- `config.js`：正式下载地址，未配置时清晰显示待发布。
- `assets/`：来自 ikan 项目的品牌图标。
- `docs/`：来自 ikan 项目的 Markdown 文档。

## 配置下载

修改 `config.js` 中各平台的 `url` 为正式 HTTP 或 HTTPS 地址及 `label` 文案。Android 可直接填 APK 下载链接；iOS 和桌面可填对应发布说明页。留空或无效地址不启用。有效链接会在新标签页打开，首页下载提示会自动更新；请同步维护平台能力与版本文案。

## 静态部署

将以上 HTML、CSS、JS 及 `assets/`、`manual/`、`docs/` 原样上传到 GitHub Pages、Nginx 或任意静态托管目录。所有链接使用相对路径，支持域名根目录和子目录。无需 SPA 回退。

## 验证

`python3 check.py` 检查全部页面、资源、内部链接、锚点和 viewport。
`node --check app.js`、`node --check config.js` 检查 JavaScript 语法。

产品界面为 HTML/CSS 绘制的示意，书名与封面为虚构示例，并非真实 App 截图。下载区不承诺尚未正式发布的平台支持。规则手册源自当前 next 项目；已修正文档间一个旧 AES 锚点。

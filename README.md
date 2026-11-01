# SL · 研究与学习

公开网站：https://sl-knowledge.github.io/knowledge-site/

基于 Quartz 5 的中文 Markdown 网站，由 GitHub Actions 构建并发布到 GitHub Pages。

## 目录关系

本仓库位于 `D:\Document\Knowledge\knowledge-site`，与研究库 `my_knowledge` 并列，是独立 Git 仓库。
最初从研究库的 Public 复制了 5 篇稿件；原件保留。以后只手动维护本仓库的 `content/`，没有同步脚本，也没有指向研究库的链接或依赖。

`content/learning/`：学习方法；`content/economics/`：经济学；`content/language/`：语言与文字；`content/framework/`：理论框架；`content/about.md`：作者与版权；`content/index.md`：首页。

## 更新文章

直接编辑或替换 `content/` 中的对应文件，保留文件路径，使网址稳定。每次更新检查文章开头的 YAML：

```yaml
---
title: "文章标题"
description: "简短介绍"
author: SL
version: "0.2"
created: "2026-10-31"
updated: "2026-10-31"
publish: true
kind: article
---
```

`created` 保留初始日期；`updated` 改成实际修改日期。重大内容修订提升次版本（0.1 → 0.2），勘误提升修订号（0.2 → 0.2.1）。替换正文时也要保留并更新这些元数据。旧版由 Git 历史保留，不在网站重复展示。

新增文章放入对应栏目，补全元数据，并在栏目 index.md 中加入链接。首页精选卡片位于 `quartz/components/Publication.tsx`。

## 本地检查与预览

需要 Node.js 24 和 npm：

```powershell
cd D:\Document\Knowledge\knowledge-site
npm ci
npm run build
npm run preview
```

预览地址以命令输出为准，通常为 http://localhost:8080 。配置位于 `quartz.config.yaml`，样式位于 `quartz/styles/custom.scss`。

## 发布

GitHub 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。

本地编辑完成后：

```powershell
git add content
git commit -m "docs: update public notes"
git push origin main
```

如果修改了网站配置或样式，一并提交相应文件。每次推送 main 都会校验元数据、生成静态页面，再自动部署。查看仓库 Actions 的 Publish knowledge site；部署完成后刷新网站。

也可以直接在 GitHub 网页中编辑 content/ 下的 Markdown 并提交到 main，效果相同。

## 版权

原创文章：© 2026 SL. All rights reserved.，详见 CONTENT-LICENSE.md。
Quartz 代码：MIT，原始许可证保留于 LICENSE.txt。

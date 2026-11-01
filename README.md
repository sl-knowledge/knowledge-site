# SL · 研究与学习

公开网站：https://sl-knowledge.github.io/knowledge-site/

基于 Quartz 5 的中文 Markdown 网站，由 GitHub Actions 构建并发布到 GitHub Pages。

## 目录关系

本仓库位于 `D:\Document\Knowledge\knowledge-site`，与研究库 `my_knowledge` 并列，是独立 Git 仓库。
最初从研究库的 Public 复制了 5 篇稿件；原件保留。以后只手动维护本仓库的 `content/`，没有同步脚本，也没有指向研究库的链接或依赖。

`content/learning/`：学习方法；`content/economics/`：经济学；`content/language/`：语言与文字；`content/framework/`：理论框架；`content/safety/`：安全研究；`content/about.md`：作者与版权；`content/index.md`：首页。

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

迁移已发布文章的栏目时，在 frontmatter 的 `aliases` 列表中保留旧路径（例如 `framework/viability-theory`），使旧网址跳转至新网址。

新增文章放入对应栏目，补全元数据，并在栏目 index.md 中加入链接。首页研究方向和最近发表入口位于 `quartz/components/Publication.tsx`。

## 安全与投资内容的研究边界

完整声明位于 `content/disclaimer.md`，全站页脚始终提供入口。安全、航空和设备操作相关内容的 frontmatter 使用 `researchScope: safety`；投资、交易和企业投资案例使用 `researchScope: investment`。英文文章同时设置 `language: en`。

构建时会在对应正文开头自动插入统一的中英文研究用途声明，网页正文和搜索全文使用同一份提示。RSS输出文章摘要，因此description也须保留“研究资料，不构成操作指引／投资或交易建议”的简明声明；英文摘要使用对应的not operational guidance／not investment or trading advice。安全栏目及现有投资专题缺失标记或摘要声明时，内容校验会失败。新增其他栏目中的敏感主题，也须主动设置标记。

声明不代替正文审读：不提供可直接执行的操作步骤、交易参数或未经验证的部署方案；研究问题、教学模型和候选策略均须说明条件与验证状态。学习文章若仅包含局部航空示例，可在示例旁加入具体用途说明。

## 访问量统计（Umami）

`quartz.config.yaml` 使用内置 `umami` provider，追踪脚本来自 `https://cloud.umami.is/script.js`，公开Website ID为 `8486d200-3738-4f33-a408-d8415cf6d20f`。这是页面追踪标识，不是后台API密钥；后台凭据不要写进本仓库。

在Umami Cloud中打开 `knowledge-site` 查看浏览量。Domain填写 `sl-knowledge.github.io`，网站路径 `/knowledge-site/` 不属于Domain。页脚显示全站累计浏览量（PV），与后台使用同一数据来源。

跟踪脚本仅在正式域名注入，通过 `data-persist` 保留跨页脚本并防止重复注入。Umami自动记录History API导航，不另行在Quartz的 `nav` 事件上调用 `track()`。URL参数、章节锚点不采集；不添加自定义点击、身份识别、性能、错误或回放采集。预览环境不加载统计脚本。

页脚总数由 GitHub Actions 在每次发布及每小时第17分钟读取一次（调度可能延迟），然后写入 `public/static/pageviews.json`。浏览器只请求本站的汇总JSON，不接触Umami分享凭据，也不另行上报计数。总数按2026-11-01起至查询时刻计算，以Umami现有数据为准，受服务的数据保留期影响，并非永久归档计数器。

在Umami的knowledge-site → Edit → Share URL生成仅开放Overview的分享链接，并将完整链接保存在本仓库的Actions Secret `UMAMI_SHARE_URL`。分享链接持有人能查看被授权的统计视图，因此不要写入仓库、工作流命令或网页。脚本支持Cloud的美国/欧洲区分享URL，并核对其Website ID；如果以后切换服务或分享链接格式，应相应更新脚本。

`scripts/update-public-pageviews.mjs`只发布浏览量、统计起点和更新时间，不发布访客、来源、分享链接或token。服务临时失败时读取线上旧快照并保留原更新时间；首次取数和旧快照均不可用时构建失败，避免发布假的0。页面读取失败显示“暂不可用”。诊断时检查Actions日志和Secret设置，不要打印完整API响应或凭据。撤销分享链接后也应移除Secret并停用更新步骤；撤销不会自动删除已公开的历史汇总数字。

可运行 `node --test scripts/pageviews.test.mjs` 验证凭据隔离、错误回退、零值及站内导航缓存。

更换站点ID或统计服务时同步更新关于页说明。关闭统计可将 `analytics` 恢复为 `null`。过去未安装追踪器的浏览无法补记；拦截和网络失败也会使统计低于实际访问。

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

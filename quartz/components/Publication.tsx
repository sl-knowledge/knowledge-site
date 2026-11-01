import { QuartzComponent, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

export const SiteNavigation: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return <nav class="site-navigation" aria-label="主导航">
    <a class="internal nav-home" href={`${root}/`}>SL / 研究与学习</a>
    <div><a class="internal" href={`${root}/learning/`}>学习方法</a><a class="internal" href={`${root}/economics/`}>经济学</a><a class="internal" href={`${root}/language/`}>语言与文字</a><a class="internal" href={`${root}/framework/`}>理论框架</a><a class="internal" href={`${root}/about`}>关于</a></div>
  </nav>
}

const entries = [
  ["01", "学习方法", "框架驱动的学习循环", "从表示到推导，从现实差异到下一轮提问。一页可执行的学习模板。", "learning/framework-driven-learning", "v0.1"],
  ["02", "经济学", "第一性原理经济学习法", "从两个主体相互生产、相互满足需求的最小模型出发。", "economics/first-principles-learning", "v0.2"],
  ["03", "学习方法", "认知失衡：问题从哪里来", "为什么有了预期，才会看见差异，进而提出自己的问题？", "learning/cognitive-disequilibrium", "v0.1"],
  ["04", "学习方法", "把提出问题的控制权交给学习者", "通过问题生成支架，把自主提问逐步交还给学习者。", "learning/asking-better-questions", "v0.1"],
  ["05", "经济学", "经济活动的本质与可持续循环", "沿着生产、需求与交换，追问一个经济循环怎样持续。", "economics/sustainable-circulation", "v0.1"],
  ["06", "语言与文字", "文字的起源：语言结构如何长出书写系统", "一个生成器和三个参数，探索书写系统形成与分化。", "language/origins-of-writing", "v0.1"],
  ["07", "语言与文字", "概念打包与字的约束：汉字如何固化汉语的单音节语素结构", "从同态码与任意码出发，追问汉字、表达与学习的关系。", "language/concept-packaging-and-characters", "v0.1"],
  ["08", "学习方法", "给中文母语学习英语者的建议", "把另一种编码方式转成可调用的英语习惯。", "learning/english-for-chinese-speakers", "v0.1"],
  ["09", "理论框架", "约束、可行性与未来选择：复杂系统分析框架", "区分可达与可生存，用压力测试和反馈修订理解。", "framework/constraints-and-future-options", "v0.1"],
  ["10", "理论框架", "过去的成功，为什么可能成为下一次转型的约束？", "从索尼与苹果的数字音乐案例出发，区分资源、组织约束、事前准备、竞争窗口与历史偶然性。", "framework/success-and-transition", "v0.1"],
  ["11", "理论框架", "东方雨虹：业务重构，怎样才算真正改善？", "把渠道结构变化、信用资本效率和海外能力迁移分别验证，研究经营变化如何转成持续现金回报。", "framework/business-reconstruction-yuhong", "v0.1"],
  ["12", "理论框架", "自由与逍遥：在约束中保留未来选择", "从可达路径、恢复能力、适应时间与自主承诺，思考个人如何面对变化并认真选择生活。", "framework/freedom-and-future-options", "v0.1"],
  ["13", "理论框架", "人机协作研究系统：让证据、预测与修订长期运行", "从一次回答走向可追溯、可更新、可验证的长期研究状态。", "framework/human-ai-research-system", "v0.1"],
]

export const PublicationMeta: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const fm: Record<string, unknown> = fileData.frontmatter ?? {}
  const notes = allFiles.filter(file => file.frontmatter?.kind === "article")
  const metadata = (slug: string): Record<string, unknown> => allFiles.find(file => file.slug === slug)?.frontmatter ?? {}
  const root = pathToRoot(fileData.slug!)
  if (fm.kind === "home") return <section class="home-hero">
    <p class="eyebrow">SL’S FIELD NOTES · 持续修订中</p>
    <h1>从小模型出发，<br />理解更大的世界。</h1>
    <p class="hero-description">关于学习、经济、语言与复杂系统的研究笔记。<br />让推导形成预期，让现实修正理解。</p>
    <div class="hero-bottom"><span>{String(notes.length).padStart(2, "0")} 篇公开笔记 / 04 个研究方向</span><span>首辑 · 2026.10</span></div>
    <div class="collection-heading"><h2>从这里开始阅读</h2><span>SELECTED NOTES</span></div>
    <div class="notes-grid">{entries.map(([no, category, title, description, slug, version]) =>
      <a class="internal note-card" href={`${root}/${slug}`} key={slug}>
        <div class="card-top"><span>{category}</span><span>{no}</span></div>
        <h3>{String(metadata(slug).title ?? title)}</h3><p>{String(metadata(slug).description ?? description)}</p>
        <div class="card-bottom"><span>v{String(metadata(slug).version ?? version.slice(1))} · {String(metadata(slug).author ?? "SL")}</span><span aria-hidden="true">↗</span></div>
      </a>
    )}</div>
  </section>
  const date = (value: unknown) => String(value ?? "").slice(0, 10)
  return <div class="publication-meta" aria-label="文章版本信息">
    <span class="version-badge">v{String(fm.version ?? "0.1")}</span>
    <span>作者 {String(fm.author ?? "SL")}</span>
    <span>创建 <time dateTime={date(fm.created)}>{date(fm.created)}</time></span>
    <span>更新 <time dateTime={date(fm.updated)}>{date(fm.updated)}</time></span>
  </div>
}

export const PublicationFooter: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return <footer class="publication-footer"><p>© 2026 SL. All rights reserved.</p>
    <div><a class="internal" href={`${root}/about`}>关于与版权</a><a href="https://github.com/sl-knowledge/knowledge-site">GitHub</a><a href="https://quartz.jzhao.xyz/">Built with Quartz</a></div>
  </footer>
}

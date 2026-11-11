import { QuartzComponent, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { readingSections, articleReadings, readingFor, readingHref } from "./ReadingNavigation"
import release from "../site-release.json"
import englishEdition from "../english-edition.json"
// @ts-ignore
import pageviewsScript from "./scripts/pageviews.inline"

// The English edition mirrors this site's paths page for page. A page that is
// not translated yet has no counterpart, so the switch falls back to the
// English home page instead of leading to an address that does not exist.
const englishPages = new Set<string>(englishEdition.pages)
export const englishUrl = (slug: string): string => {
  if (!englishPages.has(slug)) return englishEdition.site
  if (slug === "index") return `${englishEdition.site}/`
  if (slug.endsWith("/index")) return `${englishEdition.site}/${slug.slice(0, -"/index".length)}/`
  return `${englishEdition.site}/${slug}`
}

export const SiteNavigation: QuartzComponent = ({ fileData }) => {
  const root = pathToRoot(fileData.slug!)
  const current = String(fileData.slug)
  const reading = readingFor(current)
  return <nav class="site-navigation" aria-label="主导航">
    <a class="internal nav-home" href={`${root}/`}>SL / 研究与学习</a>
    <div>{readingSections.map(section => <a class="internal" key={section.id} href={readingHref(root, section.slug)} aria-current={current === section.slug ? "page" : reading?.section === section.id ? "location" : undefined}>{section.title}</a>)}<a class="internal" href={`${root}/about`} aria-current={current === "about" ? "page" : undefined}>关于</a><a class="language-switch" href={englishUrl(current)} hreflang="en" lang="en">English</a></div>
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
  ["09", "五部书稿", "约束、可行性与未来选择：复杂系统分析框架", "区分可达与可生存，用压力测试和反馈修订理解。", "framework/book/constraints-and-future-options", "v0.1"],
  ["10", "案例研究", "过去的成功，为什么可能成为下一次转型的约束？", "从索尼与苹果的数字音乐案例出发，区分资源、组织约束、事前准备、竞争窗口与历史偶然性。", "framework/cases/success-and-transition", "v0.1"],
  ["11", "案例研究", "东方雨虹：业务重构，怎样才算真正改善？", "把渠道结构变化、信用资本效率和海外能力迁移分别验证，研究经营变化如何转成持续现金回报。", "framework/cases/business-reconstruction-yuhong", "v0.1"],
  ["12", "系统、生命与价值", "自由与逍遥：在约束中保留未来选择", "从可达路径、恢复能力、适应时间与自主承诺，思考个人如何面对变化并认真选择生活。", "framework/foundations/freedom-and-future-options", "v0.1"],
  ["13", "五部书稿", "人机协作研究系统：让证据、预测与修订长期运行", "从一次回答走向可追溯、可更新、可验证的长期研究状态。", "framework/book/human-ai-research-system", "v0.1"],
  ["14", "五部书稿", "我们如何知道什么值得进入模型", "从开放世界证据到竞争解释、预测检验和最小修订。", "framework/book/what-belongs-in-a-model", "v0.1"],
  ["15", "五部书稿", "不确定世界中的行动", "把预测放进后果结构，比较等待、承诺和可更新的行动策略。", "framework/book/acting-under-uncertainty", "v0.1"],
  ["16", "五部书稿", "投资的三个系统：公司、市场与投资者", "保留十二章主线，从经营状态和每股价值，到预期差、交易执行与投资者的持续决策能力。", "framework/book/investment-three-systems", "v0.1"],
  ["20", "研究方法与规范", "开放世界研究的总架构：表示、推理、行动与修订", "从两个核心研究问题出发，说明表示发现、既有方法、反馈诊断与人机执行的完整闭环。", "framework/methods/research-architecture", "v0.1"],
  ["21", "研究方法与规范", "统一术语、符号与知识等级", "将状态、约束、可达性、表示失效和研究治理的定义放在同一份可查阅规范中。", "framework/methods/canonical-vocabulary", "v0.1"],
  ["22", "研究方法与规范", "原创性自查与独立验证计划", "比较六项候选思想，提出基线、消融、前瞻预测和表示修订的验证方案。", "framework/methods/originality-and-validation", "v0.1"],
  ["23", "研究方法与规范", "从研究卡片到书稿：一致性审计与修订说明", "记录八项关键概念修正、五部的定义分工，以及从卡片到书稿的编辑原则。", "framework/methods/consistency-and-revision", "v0.1"],
  ["24", "五部书稿", "第一稿：五部五十二章阅读总览", "五部主体、52个章节直达链接，以及总架构、统一术语、验证计划和修订说明。", "framework/book/book-reading-guide", "v0.1"],
  ["25", "系统、生命与价值", "生命作为生成结构：核心理论版 V2", "从关系更新、持续执行到扰动恢复，提出EGBE工作定义、三变量桥接模型与待执行的验证计划。", "framework/foundations/life-as-generative-structure", "v0.1"],
  ["26", "系统、生命与价值", "目标函数为什么合理？", "从生存条件到价值选择，讨论目标为谁服务、长期有效选择、人的尊严，以及谁制定目标和怎样检验反馈。", "framework/foundations/why-objectives-are-reasonable", "v0.1"],
  ["27", "系统、生命与价值", "任何系统都是宇宙的子系统", "从整体与局部出发，讨论系统边界、观察尺度、变量与噪声，以及环境改变何时需要修订模型。", "framework/foundations/systems-within-the-universe", "v0.1"],
  ["28", "语言与文字", "词汇与经验压缩：从概念到共享符号", "从词与概念的区别出发，讨论经验如何被组织、关系如何被表达，以及序参量类比的条件与检验路径。", "language/vocabulary-and-experience-compression", "v0.1"],
  ["29", "研究方法与规范", "CF Grammar：从约束诊断到可检验的研究表示", "用主体、目标、环境和时域组织诊断，区分支持、约束、缓冲与替代，并把机制假说放回证据和修订闭环。", "framework/methods/cf-grammar", "v0.1"],
  ["30", "投资研究方法", "投资研究与交易决策总纲", "研究资料，不构成投资或交易建议。保留研究目标、机制、关键证据、估值情景与独立验证主线，将交易动作改为研究假说。", "framework/methods/investment-research-charter", "v0.1"],
  ["31", "投资研究方法", "企业分析操作总纲", "研究资料，不构成投资或交易建议。从三问、分层研究与十二个问题，到财务核对、关键证据和可追溯跟踪；操作指研究流程。", "framework/methods/company-analysis-protocol", "v0.1"],
  ["32", "理论应用", "不完全信任下的合作：预警余量与可恢复性", "抽象机制框架：合作怎样改变双方的未来可选择性、依赖和恢复窗口？", "applications/cooperation-under-incomplete-trust", "v0.10"],
  ["33", "理论应用", "控制权、信息与时间：可生存性优先的控制与安全设计原则", "研究资料，不构成操作指引。区分控制权、信息与时间，整理三类失效、四项保障义务和五个比较性质。", "applications/viability-first-control", "v0.1"],
  ["34", "理论应用", "持续能力，还是难以退出的依赖？——读一期 Physical AI 访谈", "研究示例，不构成投资或交易建议。从字幕核对与假想企业出发，分析机器人服务依赖和恢复窗口。", "applications/physical-ai-interview", "v0.3"],
  ["35", "研究方法与规范", "压力测试：约束识别、反馈与恢复窗口", "ST1—ST12固定原则：检查情景、约束、反馈、恢复窗口和共同失效，附最小示例与引用模板。", "framework/methods/stress-testing", "v0.1"],
  ["36", "理论体系", "简化与退路：受约束系统中的可恢复性", "SF1—SF9：简化减少了什么负担，又保留了哪些恢复能力？", "framework/foundations/simplicity-and-recovery", "v0.2"],
  ["37", "理论体系", "平稳不等于有退路：出问题的概率与被锁定的概率", "分别评价日常表现、问题概率、条件锁定概率与后果。", "framework/foundations/lock-in-vs-probability", "v0.4"],
  ["38", "理论应用", "证据是在更新判断，还是维护原观点？", "研究资料，不构成投资或交易建议。命题依赖、十二项自查与条件性更新记录。", "applications/investment-evidence-self-check", "v0.3"],
  ["39", "理论应用", "信念门控的实践回路：宗教参与的一种机制假说", "连接多种入口、实践结构、结果与归因的候选回路，附研究命题、记录卡及信息凝聚地图。", "applications/belief-gated-practice-loop", "v0.2"],
  ["40", "理论应用", "需求与生成能力的缺口：支持、选择与行为的一种机制框架", "区分需求、能力、支持、缓冲与感知路径，提出带时间条件的组合路径、六个研究命题和分析卡。", "applications/needs-and-generative-capability", "v0.2"],
  ["41", "理论体系", "约束、生成与人的价值", "连接生成解释、证据纪律与候选价值承诺的开放哲学纲要，区分事实、价值与多主体伦理判断。", "framework/foundations/constraints-generation-and-human-value", "v0.2"],
  ["42", "哲学思想", "信息的扩散、凝聚与递归演化：一种宇宙哲学视角", "从信息扩散与凝聚、稳定结构和新的生成能力，思考宇宙、生命、认知与知识活动的递归演化。", "philosophy/information-expansion-and-condensation", "v0.1"],
  ["43", "研究方法", "当 AI 评错了问题：一次人机协作的纠错记录", "一次研究讨论中的17项观察与纠正，区分事实错误、研究层次和评价标准错位，并给出评审前的四问。", "framework/methods/ai-error-and-correction-case", "v0.1"],
  ["44", "语言与文字", "翻译为什么这么难", "从语法区分、语境、信息组织和表达效果看翻译为何需要重建意义。", "language/why-translation-is-so-difficult", "v0.1"],
]

export const PublicationMeta: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const fm: Record<string, unknown> = fileData.frontmatter ?? {}
  const notes = allFiles.filter(file => file.frontmatter?.kind === "article")
  const metadata = (slug: string): Record<string, unknown> => allFiles.find(file => file.slug === slug)?.frontmatter ?? {}
  const root = pathToRoot(fileData.slug!)
  if (fm.kind === "home") return <section class="home-hero">
    <p class="eyebrow">SL’S FIELD NOTES · 持续修订中</p>
    <h1>从小模型出发，<br />理解更大的世界。</h1>
    <p class="hero-description">一个独立研究者的开放研究站：<br />持续修订的书稿、工作论文与可检验的推论</p>
    <p class="hero-purpose"><a class="internal" href={`${root}/site-purpose`}>这个网站在做什么 <span aria-hidden="true">→</span></a></p>
    <div class="hero-bottom"><span>{String(notes.length).padStart(2, "0")} 篇公开文章 / {readingSections.length} 条阅读路线</span><a class="internal" href={`${root}/updates`}>网站 v{release.version} · {release.date}</a></div>
    <div class="research-cycle" aria-label="探索的过程">提出问题 <span>→</span> 试着解释 <span>→</span> 看看现实 <span>→</span> 继续追问</div>
    <div class="collection-heading"><h2>从这里开始</h2><span>READING PATHS</span></div>
    <div class="notes-grid topic-grid">{readingSections.map((section, i) =>
      <a class="internal note-card" href={readingHref(root, section.slug)} key={section.id}>
        <div class="card-top"><span>阅读路线</span><span>{String(i + 1).padStart(2, "0")}</span></div>
        <h3>{section.title}</h3><p>{section.description}</p>
        <div class="card-bottom"><span>{section.id === "book" ? "五部 · 五十二章" : `${notes.filter(file => articleReadings[String(file.slug)]?.section === section.id).length} 篇文章`}</span><span>进入阅读 ↗</span></div>
      </a>
    )}</div>
    <div class="latest-release"><span>最新更新 · v{release.version}</span><a class="internal" href={`${root}/updates#v${release.version.replaceAll(".", "-")}`}>{release.title} ↗</a><p>{release.summary}</p></div>
    <div class="collection-heading"><h2>最近发表</h2><span>RECENT NOTES</span></div>
    <div class="notes-grid recent-notes">{entries.slice(-4).reverse().map(([no, category, title, description, slug, version]) =>
      <a class="internal note-card" href={`${root}/${slug}`} key={slug}>
        <div class="card-top"><span>{readingSections.find(s => s.id === articleReadings[slug]?.section)?.title ?? category}</span><span>{no}</span></div>
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
    <p class="site-release"><a class="internal" href={`${root}/updates`}>网站 v{release.version} · 更新记录</a><span> · {release.date}</span></p>
    <p class="site-pageviews" data-pageviews-url={`${root}/static/pageviews.json`} aria-live="polite">累计浏览量：<span data-pageviews-count>加载中…</span></p>
    <p class="research-use-footer">本站内容为研究笔记。安全与投资内容不构成操作或交易建议。<span lang="en"> Research use only; not operational or investment advice.</span></p>
    <div><a class="internal" href={`${root}/disclaimer`}>研究用途与免责声明 / Disclaimer</a><a class="internal" href={`${root}/about`}>关于与版权</a><a class="internal" href={`${root}/about#contact`}>联系 / Contact</a><a class="language-switch" href={englishUrl(String(fileData.slug))} hreflang="en" lang="en">English</a><a href="https://github.com/sl-knowledge/knowledge-site-en/issues/new?template=research-feedback.yml">研究反馈 / Feedback</a><a href="https://github.com/sl-knowledge/knowledge-site">GitHub</a><a href="https://quartz.jzhao.xyz/">Built with Quartz</a></div>
  </footer>
}

PublicationFooter.afterDOMLoaded = pageviewsScript

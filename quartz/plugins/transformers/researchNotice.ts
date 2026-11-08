import { parse } from "yaml"
import { QuartzTransformerPlugin } from "../types"

// Keep the full notice after the article; descriptions retain the boundary in feeds.
export const ResearchNotice: QuartzTransformerPlugin = () => ({
  name: "ResearchNotice",
  textTransform(ctx, src) {
    const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
    if (!match) return src
    const fm = parse(match[1]) as Record<string, unknown> | null
    const scope = fm?.researchScope
    if (scope !== "safety" && scope !== "investment") return src
    const english = fm?.language === "en"
    const base = ctx.cfg.configuration.baseUrl?.replace(/\/$/, "")
    const policy = base ? `https://${base}/disclaimer` : "/disclaimer"
    const heading = scope === "safety"
      ? english ? "Research-use disclaimer — Not operational guidance" : "研究用途与免责声明｜非操作指引"
      : english ? "Research-use disclaimer — No investment or trading advice" : "研究用途与免责声明｜不构成投资或交易建议"
    const text = scope === "safety"
      ? english
        ? "This is research, not a flight manual, emergency checklist, certified design or deployment approval. The proposed arrangements have not been validated by this website for a specific system. These notes must not be used as a basis for changing operations, overriding protections or directly deploying a controller. They do not replace applicable current approved documentation, procedures, qualified training or independent engineering review."
        : "本文仅供理论研究与讨论，不是飞行、设备操作、应急处置或工程部署指南。本文提出的方案未由本站完成面向具体系统的部署验证或认证；不得据此改变操作、绕过保护或直接部署。内容不能替代适用的现行批准文件、程序、专业训练及独立工程审查。"
      : english
        ? "This material discusses research methods, cases and hypotheses. It is not a recommendation to buy, sell or hold, or advice on timing, position size or asset allocation. No personal suitability assessment is provided. Examples, historical results and backtests neither establish executable performance nor guarantee future results. These notes should not be used as a basis for trading."
        : "本文仅讨论研究方法、案例与假说，不提供买卖、持有、择时、仓位或资产配置建议。公司名称、估值与情景不构成推荐、目标价或收益承诺；示例、历史结果与回测不能证明现实可执行性或保证未来表现。内容未考虑个人财务状况与风险承受能力，不应作为交易依据。"
    const label = english ? "Full research-use disclaimer" : "完整研究用途与免责声明"
    const href = english ? `${policy}#english-summary` : policy
    const notice = `> **${heading}**\n>\n> ${text} [${label}](${href})\n\n`
    const marker = '<a id="research-use-disclaimer"></a>'
    if (src.includes(marker)) return src
    const copyright = /\n(?:---\r?\n(?:\r?\n)*)?© \d{4} SL\. All rights reserved\.\s*$/.exec(src)
    const position = copyright?.index ?? src.trimEnd().length
    return (
      src.slice(0, position).trimEnd() +
      "\n\n---\n\n" + marker + "\n\n" + notice.trimEnd() +
      (copyright ? src.slice(position).trimEnd() : "") + "\n"
    )
  },
})

import fs from "node:fs"
import path from "node:path"
import { parse } from "yaml"
const problems = []
const files = fs.readdirSync("content", {recursive: true}).filter(f => f.endsWith(".md"))
const validDate = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value
for (const file of files) {
  const text = fs.readFileSync(path.join("content", file), "utf8")
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) { problems.push(`${file}: missing YAML frontmatter`); continue }
  const fm = parse(match[1])
  for (const key of ["title", "description", "author", "version", "created", "updated"]) {
    if (typeof fm[key] !== "string" || !fm[key].trim()) problems.push(`${file}: missing ${key}`)
  }
  if (!/^\d+\.\d+(?:\.\d+)?$/.test(fm.version)) problems.push(`${file}: invalid version`)
  for (const key of ["created", "updated"]) if (!validDate(fm[key])) problems.push(`${file}: invalid ${key} date`)
  if (fm.updated < fm.created) problems.push(`${file}: updated date precedes created date`)
  const normalized = file.replaceAll(path.sep, "/")
  const investmentPages = new Set(["framework/methods/investment-research-charter.md", "framework/methods/company-analysis-protocol.md", "framework/book/investment-three-systems.md", "framework/cases/index.md", "framework/cases/success-and-transition.md", "framework/cases/business-reconstruction-yuhong.md"])
  const expectedScope = normalized.startsWith("safety/") ? "safety" : investmentPages.has(normalized) ? "investment" : undefined
  if (expectedScope && fm.researchScope !== expectedScope) problems.push(`${file}: set researchScope: ${expectedScope}`)
  if (fm.researchScope !== undefined && !["safety", "investment"].includes(fm.researchScope)) problems.push(`${file}: invalid researchScope`)
  if (fm.researchScope) {
    const phrase = fm.researchScope === "safety"
      ? fm.language === "en" ? "not operational guidance" : "不构成操作指引"
      : fm.language === "en" ? "not investment or trading advice" : "不构成投资或交易建议"
    if (!String(fm.description).toLowerCase().includes(phrase)) problems.push(`${file}: description must retain research-use boundary for RSS`)
  }
  if (fm.publish !== true) problems.push(`${file}: set publish: true for an approved public page`)
  if (/\]\((?:file:|[A-Za-z]:[\\/])/.test(text)) problems.push(`${file}: local filesystem link`)
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1) }
console.log(`Validated ${files.length} public Markdown pages (author, version, dates, publish flag).`)

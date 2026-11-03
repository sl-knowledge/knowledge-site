import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { fromHtml } from "hast-util-from-html"

export function markdownRenderingProblems(html) {
  const problems = []
  const walk = (node, inArticle = false, ignored = false) => {
    const props = node.properties ?? {}
    const classes = Array.isArray(props.className) ? props.className : []
    const article = inArticle || node.tagName === "article"
    if (article && classes.includes("katex-error")) problems.push("math rendering error")
    const skip = ignored || ["pre", "code", "script", "style", "math", "annotation"].includes(node.tagName) || classes.includes("katex")
    if (article && !skip && node.type === "text" &&
      /\*\*|(?<!_)__(?!_)|~~|\x60{3}|\\[([]|\$\$/.test(node.value)) {
      problems.push("unrendered Markdown: " + node.value.trim().slice(0, 120))
    }
    for (const child of node.children ?? []) walk(child, article, skip)
  }
  walk(fromHtml(html))
  return problems
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const files = fs.readdirSync("public", { recursive: true }).filter(file => file.endsWith(".html"))
  const problems = []
  for (const file of files) {
    const html = fs.readFileSync(path.join("public", file), "utf8")
    for (const problem of markdownRenderingProblems(html)) problems.push(file + ": " + problem)
  }
  if (problems.length) {
    console.error(problems.join("\n"))
    process.exit(1)
  }
  console.log("Verified " + files.length + " HTML pages: no raw Markdown markers or math-rendering errors in article prose.")
}

import fs from "node:fs"
import path from "node:path"
import assert from "node:assert/strict"
import { parse } from "yaml"

// Catch a successful generator run that accidentally filters out public pages.
const files = fs.readdirSync("content", { recursive: true }).filter(file => file.endsWith(".md"))
const search = JSON.parse(fs.readFileSync("public/static/contentIndex.json", "utf8"))
for (const file of files) {
  const slug = file.replaceAll(path.sep, "/").replace(/\.md$/, "")
  const html = fs.readFileSync(path.join("public", `${slug}.html`), "utf8")
  assert.ok(html.includes("© 2026 SL. All rights reserved."), `${file}: missing copyright`)
  assert.ok(html.includes(slug === "index" ? 'class="home-hero"' : 'class="publication-meta"'), `${file}: missing publication layout`)
  assert.ok(search[slug], `${file}: missing from search index`)
  assert.ok(html.includes("研究用途与免责声明 / Disclaimer"), `${file}: missing full disclaimer link`)
  const source = fs.readFileSync(path.join("content", file), "utf8")
  const fm = parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1])
  if (fm.researchScope) {
    const heading = fm.language === "en" ? "Research-use disclaimer" : "研究用途与免责声明｜"
    assert.ok(html.includes(heading), `${file}: missing research-use notice`)
    const articleStart = html.indexOf("<article")
    const noticePosition = html.indexOf(heading, articleStart)
    assert.ok(noticePosition >= articleStart && noticePosition < html.indexOf("</article>", articleStart), `${file}: notice must be in article content`)
  }
}
console.log(`Verified ${files.length} built public pages, publication layout, copyright and search entries.`)

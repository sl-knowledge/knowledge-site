import fs from "node:fs"
import path from "node:path"
import assert from "node:assert/strict"

// Catch a successful generator run that accidentally filters out public pages.
const files = fs.readdirSync("content", { recursive: true }).filter(file => file.endsWith(".md"))
const search = JSON.parse(fs.readFileSync("public/static/contentIndex.json", "utf8"))
for (const file of files) {
  const slug = file.replaceAll(path.sep, "/").replace(/\.md$/, "")
  const html = fs.readFileSync(path.join("public", `${slug}.html`), "utf8")
  assert.ok(html.includes("© 2026 SL. All rights reserved."), `${file}: missing copyright`)
  assert.ok(html.includes(slug === "index" ? 'class="home-hero"' : 'class="publication-meta"'), `${file}: missing publication layout`)
  assert.ok(search[slug], `${file}: missing from search index`)
}
console.log(`Verified ${files.length} built public pages, publication layout, copyright and search entries.`)

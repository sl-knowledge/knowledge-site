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

// Verify that the navigation remains complete as public content grows.
const readingMap = JSON.parse(fs.readFileSync("quartz/reading-map.json", "utf8"))
const release = JSON.parse(fs.readFileSync("quartz/site-release.json", "utf8"))
const articleSlugs = new Set(files.filter(file => {
  const source = fs.readFileSync(path.join("content", file), "utf8")
  return parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]).kind === "article"
}).map(file => file.replaceAll(path.sep, "/").replace(/\.md$/, "")))
assert.deepEqual(new Set(Object.keys(readingMap.articles)), articleSlugs, "every article needs a primary reading location")
const primaryOccurrences = new Map()
for (const section of readingMap.sections) {
  assert.ok(search[section.slug], `${section.slug}: missing reading overview`)
  const overview = fs.readFileSync(`public/${section.slug}.html`, "utf8")
  for (const group of section.groups) {
    assert.ok(overview.includes(`id="${group.id}"`), `${section.slug}: missing group anchor ${group.id}`)
    for (const slug of group.slugs) {
      assert.ok(articleSlugs.has(slug), `${slug}: reading link must resolve to a public article`)
      const reading = readingMap.articles[slug]
      if (reading.section === section.id && reading.group === group.id) primaryOccurrences.set(slug, (primaryOccurrences.get(slug) ?? 0) + 1)
    }
  }
}
for (const slug of articleSlugs) {
  assert.equal(primaryOccurrences.get(slug), 1, `${slug}: expected one primary location`)
  for (const target of readingMap.articles[slug].readings) assert.ok(articleSlugs.has(target), `${slug}: invalid prerequisite ${target}`)
  const html = fs.readFileSync(`public/${slug}.html`, "utf8")
  assert.ok(html.includes('aria-label="文章阅读关系"'), `${slug}: missing reading context`)
}
for (const file of files) {
  const html = fs.readFileSync(path.join("public", file.replace(/\.md$/, ".html")), "utf8")
  assert.ok(html.includes('aria-label="阅读目录"'), `${file}: missing logical sidebar`)
  assert.ok(html.includes(`网站 v${release.version}`), `${file}: incorrect site release`)
  assert.ok(!html.includes("此文件夹下有"), `${file}: storage-folder count must not replace reading classification`)
}
assert.match(release.version, /^\d+\.\d+\.\d+$/)
assert.ok(fs.readFileSync("public/updates.html", "utf8").includes(`id="v${release.version.replaceAll(".", "-")}"`), "release must have a public update record")
console.log(`Verified reading coverage for ${articleSlugs.size} articles and site release v${release.version}.`)

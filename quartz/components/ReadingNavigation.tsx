import { QuartzComponent } from "./types"
import { pathToRoot } from "../util/path"
import map from "../reading-map.json"
// @ts-ignore
import readingScript from "./scripts/reading-navigation.inline"

type Reading = {
  section: string
  group: string
  role?: string
  bookReference?: string
  readings?: string[]
}

export const readingSections = map.sections
export const articleReadings: Record<string, Reading> = map.articles
const auxiliaryReadings: Record<string, Reading> = map.auxiliary
const shortTitles: Record<string, string> = map.labels

export const readingFor = (slug: string) => articleReadings[slug] ?? auxiliaryReadings[slug]
export const readingHref = (root: string, slug: string) =>
  `${root}/${slug.endsWith("/index") ? slug.slice(0, -5) : slug}`

export const ReadingNavigation: QuartzComponent = ({ fileData, allFiles }) => {
  const current = String(fileData.slug)
  const root = pathToRoot(fileData.slug!)
  const reading = readingFor(current)
  const title = (slug: string) => shortTitles[slug] ?? String(allFiles.find(f => f.slug === slug)?.frontmatter?.title ?? slug)
  const item = (slug: string, label?: string) => <li key={slug}>
    <a class="internal" href={readingHref(root, slug)} aria-current={current === slug ? "page" : undefined}>{label ?? title(slug)}</a>
  </li>
  return <nav class="reading-navigation" aria-label="阅读目录">
    <details class="reading-outline" open>
      <summary class="reading-outline-title">阅读目录</summary>
      <div class="reading-tree">
        {readingSections.map(section => {
          const active = reading?.section === section.id || current === section.slug
          return <details class="reading-section" key={section.id} data-reading-section={section.id} open={active || (current === "index" && section.id === "theory")}>
            <summary>{section.title}</summary>
            <ul>
              {item(section.slug, `${section.title}导读`)}
              {section.groups.map(group => <li key={group.id}>
                <details class="reading-group" open={active && reading?.group === group.id}>
                  <summary>{group.title}</summary>
                  <ul>{group.slugs.map(slug => item(slug))}</ul>
                </details>
              </li>)}
            </ul>
          </details>
        })}
        <ul class="reading-utility">{item("updates", "网站更新记录")}{item("about", "关于与版权")}</ul>
      </div>
    </details>
  </nav>
}

export const ReadingContext: QuartzComponent = ({ fileData, allFiles }) => {
  const current = String(fileData.slug)
  const reading = articleReadings[current]
  if (!reading) return null
  const root = pathToRoot(fileData.slug!)
  const section = readingSections.find(s => s.id === reading.section)!
  const group = section.groups.find(g => g.id === reading.group)!
  return <aside class="reading-context" aria-label="文章阅读关系">
    <nav aria-label="阅读位置">
      <a class="internal" href={readingHref(root, section.slug)}>{section.title}</a>
      <span aria-hidden="true"> › </span>
      <a class="internal" href={`${readingHref(root, section.slug)}#${group.id}`}>{group.title}</a>
      <span class="reading-role">{reading.role}</span>
    </nav>
    <p><a class="internal" href={readingHref(root, "framework/book/book-reading-guide")}>关联书稿</a>：{reading.bookReference}</p>
    {!!reading.readings?.length && <p class="reading-prerequisites">建议前置阅读：{reading.readings.map((slug, i) => <span key={slug}>
      {i > 0 && " · "}<a class="internal" href={readingHref(root, slug)}>{shortTitles[slug] ?? String(allFiles.find(f => f.slug === slug)?.frontmatter?.title ?? slug)}</a>
    </span>)}</p>}
  </aside>
}

ReadingNavigation.afterDOMLoaded = readingScript

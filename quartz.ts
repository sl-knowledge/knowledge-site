import { PageTypeDispatcher } from "./quartz/plugins/pageTypes/dispatcher"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PublicationMath } from "./quartz/plugins/transformers/publicationMath"
import { ResearchNotice } from "./quartz/plugins/transformers/researchNotice"
import { SiteNavigation, PublicationMeta, PublicationFooter } from "./quartz/components/Publication"
import { ReadingNavigation, ReadingContext } from "./quartz/components/ReadingNavigation"

const config = await loadQuartzConfig()
config.plugins.transformers.unshift(ResearchNotice(), PublicationMath())
// Authored overview pages define their own reading lists; generated folders keep the default body.
const contentBody = config.plugins.pageTypes?.find(page => page.layout === "content")?.body(undefined)
if (contentBody) {
  for (const page of config.plugins.pageTypes ?? []) {
    if (page.layout !== "folder") continue
    const folderBody = page.body(undefined)
    const overviewBody: typeof folderBody = props => props.fileData.frontmatter?.publish === true
      ? contentBody(props)
      : folderBody(props)
    Object.assign(overviewBody, {
      css: folderBody.css,
      beforeDOMLoaded: folderBody.beforeDOMLoaded,
      afterDOMLoaded: folderBody.afterDOMLoaded,
    })
    page.body = () => overviewBody
  }
}
export default config

const loaded = await loadQuartzLayout()
const enhance = (page: typeof loaded.defaults) => ({
  ...page,
  left: [...(page.left ?? []), ReadingNavigation],
  beforeBody: [SiteNavigation, ...(page.beforeBody ?? []), PublicationMeta, ReadingContext],
  footer: [PublicationFooter],
})
export const layout = {
  defaults: enhance(loaded.defaults),
  byPageType: Object.fromEntries(Object.entries(loaded.byPageType).map(([key, page]) =>
    [key, key === "404" ? { ...page, footer: [PublicationFooter] } : enhance(page)])),
}

// The YAML loader installs a dispatcher; replace it with our publication layout.
config.plugins.emitters = config.plugins.emitters.filter(plugin => plugin.name !== "PageTypeDispatcher")
config.plugins.emitters.push(PageTypeDispatcher(layout))

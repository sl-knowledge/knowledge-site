import { PageTypeDispatcher } from "./quartz/plugins/pageTypes/dispatcher"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PublicationMath } from "./quartz/plugins/transformers/publicationMath"
import { ResearchNotice } from "./quartz/plugins/transformers/researchNotice"
import { SiteNavigation, PublicationMeta, PublicationFooter } from "./quartz/components/Publication"

const config = await loadQuartzConfig()
config.plugins.transformers.unshift(ResearchNotice(), PublicationMath())
export default config

const loaded = await loadQuartzLayout()
const enhance = (page: typeof loaded.defaults) => ({
  ...page,
  beforeBody: [SiteNavigation, ...(page.beforeBody ?? []), PublicationMeta],
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

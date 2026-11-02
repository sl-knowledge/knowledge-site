// Fetch the published aggregate only. Tracking remains the Umami tracker's job.
type PublicPageviews = { pageviews: number; updatedAt: string }
let pageviewsCache: PublicPageviews | undefined
let pageviewsFetchedAt = 0
let pageviewsPending: Promise<PublicPageviews> | undefined

async function loadPageviews(url: string): Promise<PublicPageviews> {
  if (pageviewsCache && Date.now() - pageviewsFetchedAt < 5 * 60_000) return pageviewsCache
  if (pageviewsPending) return pageviewsPending
  pageviewsPending = (async () => {
    // The site and its JSON snapshot deploy separately from this tab's lifetime.
    // Bypass both browser and edge caches; keep the five-minute SPA memory cache.
    const requestUrl = new URL(url)
    requestUrl.searchParams.set("snapshot", String(Date.now()))
    const response = await fetch(requestUrl.href, { cache: "no-store", credentials: "omit", signal: AbortSignal.timeout(8000) })
    if (!response.ok) throw new Error("Pageviews unavailable")
    const data = await response.json()
    if (!Number.isSafeInteger(data.pageviews) || data.pageviews < 0 ||
        typeof data.updatedAt !== "string" || !Number.isFinite(Date.parse(data.updatedAt))) {
      throw new Error("Invalid pageviews")
    }
    pageviewsCache = { pageviews: data.pageviews, updatedAt: data.updatedAt }
    pageviewsFetchedAt = Date.now()
    return pageviewsCache
  })()
  try { return await pageviewsPending } finally { pageviewsPending = undefined }
}

// Modules run once; this handler intentionally lasts across Quartz SPA navigation.
document.addEventListener("nav", async () => {
  const footer = document.querySelector<HTMLElement>("[data-pageviews-url]")
  const count = footer?.querySelector<HTMLElement>("[data-pageviews-count]")
  if (!footer || !count) return
  try {
    const data = await loadPageviews(new URL(footer.dataset.pageviewsUrl!, document.baseURI).href)
    count.textContent = `${new Intl.NumberFormat("zh-CN").format(data.pageviews)} 次`
    footer.title = `Umami 页面浏览量（PV），统计自 2026-11-01；数据更新于 ${new Date(data.updatedAt).toLocaleString("zh-CN")}。约每小时更新，以现有统计数据为准。`
  } catch {
    if (pageviewsCache) {
      count.textContent = `${new Intl.NumberFormat("zh-CN").format(pageviewsCache.pageviews)} 次`
      footer.title = `最近可用统计，更新于 ${new Date(pageviewsCache.updatedAt).toLocaleString("zh-CN")}`
    } else {
      count.textContent = "暂不可用"
      footer.title = "统计暂时无法读取，请稍后再试。"
    }
  }
})

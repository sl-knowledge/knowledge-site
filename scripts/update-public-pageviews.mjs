import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { pathToFileURL } from "node:url"

export const WEBSITE_ID = "8486d200-3738-4f33-a408-d8415cf6d20f"
export const SINCE = "2026-11-01T00:00:00-04:00"
const SNAPSHOT_URL = "https://sl-knowledge.github.io/knowledge-site/static/pageviews.json"

export function shareEndpoint(value) {
  let url
  try { url = new URL(value) } catch { throw new Error("Invalid Umami Share URL") }
  const match = url.pathname.match(/^\/analytics\/(us|eu)\/share\/([A-Za-z0-9_-]+)\/?$/)
  if (url.origin !== "https://cloud.umami.is" || url.username || url.password || !match || url.search || url.hash) {
    throw new Error("Expected an Umami Cloud regional Share URL")
  }
  return { api: `https://gateway-${match[1]}.umami.is/api`, slug: match[2] }
}

async function getJson(fetchImpl, url, headers = {}) {
  const response = await fetchImpl(url, {
    headers, redirect: "error", signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error("Umami statistics request failed")
  return response.json()
}

export function publicSnapshot(data) {
  if (data?.schemaVersion !== 1 || !Number.isSafeInteger(data.pageviews) || data.pageviews < 0 ||
      typeof data.updatedAt !== "string" || !Number.isFinite(Date.parse(data.updatedAt)) || data.since !== SINCE) {
    throw new Error("Invalid public pageviews snapshot")
  }
  // Explicit allowlist: never publish the share URL/token, visitors or other metrics.
  return { schemaVersion: 1, pageviews: data.pageviews, updatedAt: data.updatedAt, since: SINCE }
}

export async function fetchPageviews(shareUrl, { fetchImpl = fetch, now = Date.now() } = {}) {
  const { api, slug } = shareEndpoint(shareUrl)
  const share = await getJson(fetchImpl, `${api}/share/${encodeURIComponent(slug)}`)
  if (share.websiteId !== WEBSITE_ID || typeof share.token !== "string" || !share.token) {
    throw new Error("Share URL does not grant access to the configured website")
  }
  const query = new URLSearchParams({
    startAt: String(Date.parse(SINCE)), endAt: String(now), timezone: "America/New_York", eventType: "1",
  })
  const stats = await getJson(fetchImpl, `${api}/websites/${WEBSITE_ID}/stats?${query}`, {
    "x-umami-share-token": share.token, "x-umami-share-context": "1",
  })
  const count = typeof stats.pageviews === "number" ? stats.pageviews : stats.pageviews?.value
  return publicSnapshot({ schemaVersion: 1, pageviews: count, updatedAt: new Date(now).toISOString(), since: SINCE })
}

export async function updatePageviews({ shareUrl, fetchImpl = fetch, now = Date.now(), warn = console.warn }) {
  try {
    if (!shareUrl) throw new Error("UMAMI_SHARE_URL is not configured")
    return await fetchPageviews(shareUrl, { fetchImpl, now })
  } catch {
    // Keep the previous timestamp when Umami is unavailable. Never invent a zero.
    warn("::warning::Umami refresh unavailable; attempting to retain the last published total.")
    try { return publicSnapshot(await getJson(fetchImpl, SNAPSHOT_URL)) }
    catch { throw new Error("No valid pageviews data; check the UMAMI_SHARE_URL repository secret and share permissions") }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const snapshot = await updatePageviews({ shareUrl: process.env.UMAMI_SHARE_URL })
    const target = resolve("public/static/pageviews.json")
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, JSON.stringify(snapshot) + "\n")
    console.log(`Published aggregate: ${snapshot.pageviews} pageviews; updated ${snapshot.updatedAt}.`)
  } catch (error) {
    // Only our own constant message is logged; network errors can contain credentials.
    console.error("Pageviews update failed. Check the Umami Share URL secret and permissions.")
    process.exitCode = 1
  }
}

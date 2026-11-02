import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import vm from "node:vm"
import { transformSync } from "esbuild"
import { fetchPageviews, publicSnapshot, shareEndpoint, updatePageviews, WEBSITE_ID, SINCE } from "./update-public-pageviews.mjs"

const sampleShare = "https://cloud.umami.is/analytics/us/share/test-share"
const now = Date.parse("2026-11-01T20:00:00Z")
const json = value => ({ ok: true, json: async () => value })

test("reads only the configured website's PV and publishes no credentials or other metrics", async () => {
  const calls = []
  const snapshot = await fetchPageviews(sampleShare, { now, fetchImpl: async (url, options) => {
    calls.push({ url, options })
    return json(calls.length === 1 ? { websiteId: WEBSITE_ID, token: "private-test-token" } :
      { pageviews: 1234, visitors: 99, visits: 110, token: "must-not-publish" })
  } })
  assert.deepEqual(snapshot, { schemaVersion: 1, pageviews: 1234, updatedAt: new Date(now).toISOString(), since: SINCE })
  assert.equal(calls[1].options.headers["x-umami-share-token"], "private-test-token")
  assert.equal(calls[1].options.headers["x-umami-share-context"], "1")
  const url = new URL(calls[1].url)
  assert.equal(url.origin, "https://gateway-us.umami.is")
  assert.equal(url.searchParams.get("startAt"), String(Date.parse(SINCE)))
  assert.equal(url.searchParams.get("eventType"), "1")
  assert.equal(JSON.stringify(snapshot).includes("private"), false)
})

test("supports genuine zero and older Umami value responses; rejects malformed counts", async () => {
  for (const count of [0, { value: 7 }]) {
    let calls = 0
    const result = await fetchPageviews(sampleShare, { now, fetchImpl: async () =>
      json(++calls === 1 ? { websiteId: WEBSITE_ID, token: "test" } : { pageviews: count }) })
    assert.equal(result.pageviews, typeof count === "number" ? count : count.value)
  }
  for (const count of [-1, null, "4", 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => publicSnapshot({ schemaVersion: 1, pageviews: count, since: SINCE, updatedAt: new Date(now).toISOString() }))
  }
})

test("rejects a different website before sending a statistics request", async () => {
  let calls = 0
  await assert.rejects(fetchPageviews(sampleShare, { now, fetchImpl: async () => {
    calls++
    return json({ websiteId: "different-website", token: "test" })
  } }))
  assert.equal(calls, 1)
  for (const url of ["https://evil.example/share/test", "http://cloud.umami.is/analytics/us/share/test", "https://cloud.umami.is/analytics/us/websites/test"]) {
    assert.throws(() => shareEndpoint(url))
  }
})

test("accepts copied Markdown links and share views without applying dashboard filters", () => {
  const expected = shareEndpoint(sampleShare)
  assert.deepEqual(shareEndpoint(`[Umami](${sampleShare})`), expected)
  assert.deepEqual(shareEndpoint(sampleShare + "/sl-knowledge.github.io/overview?date=0month#details"), expected)
})

test("a refresh failure retains the old timestamp and aggregate without leaking errors", async () => {
  const old = { schemaVersion: 1, pageviews: 80, updatedAt: "2026-11-01T19:00:00Z", since: SINCE }
  let calls = 0
  const warnings = []
  const snapshot = await updatePageviews({ shareUrl: sampleShare, now, warn: message => warnings.push(message), fetchImpl: async () => {
    if (++calls === 1) throw new Error("sensitive token must stay private")
    return json({ ...old, private: "do-not-copy" })
  } })
  assert.deepEqual(snapshot, old)
  assert.equal(warnings.join().includes("sensitive"), false)
  await assert.rejects(updatePageviews({ shareUrl: "", warn() {}, fetchImpl: async () => ({ ok: false }) }))
})

const frontendPath = new URL("../quartz/components/scripts/pageviews.inline.ts", import.meta.url)
async function footerHarness(fetchImpl) {
  const source = transformSync(await readFile(frontendPath, "utf8"), { loader: "ts", format: "esm" }).code
  let handler
  let currentFooter
  const context = vm.createContext({
    fetch: fetchImpl, URL, Date, Intl, AbortSignal,
    document: { baseURI: "https://sl-knowledge.github.io/knowledge-site/framework/methods/investment-research-charter",
      addEventListener: (name, fn) => { assert.equal(name, "nav"); handler = fn },
      querySelector: () => currentFooter },
  })
  vm.runInContext(source, context)
  return { async nav() {
    const count = { textContent: "加载中…" }
    currentFooter = { dataset: { pageviewsUrl: "../../static/pageviews.json" }, querySelector: () => count, title: "" }
    await handler()
    return { text: count.textContent, title: currentFooter.title }
  } }
}

test("SPA navigation reads the aggregate once, resolves deep paths, and never sends tracking events", async () => {
  const calls = []
  const page = await footerHarness(async (url, options) => {
    calls.push({ url, options })
    return json({ pageviews: 1234, updatedAt: "2026-11-01T19:00:00Z" })
  })
  assert.equal((await page.nav()).text, "1,234 次")
  assert.equal((await page.nav()).text, "1,234 次")
  assert.equal(calls.length, 1)
  const request = new URL(calls[0].url)
  assert.equal(request.origin + request.pathname, "https://sl-knowledge.github.io/knowledge-site/static/pageviews.json")
  assert.match(request.searchParams.get("snapshot"), /^\d+$/)
  assert.equal(calls[0].options.cache, "no-store")
  assert.equal(calls[0].options.credentials, "omit")
})

test("frontend distinguishes an unavailable count from a real zero", async () => {
  const unavailable = await footerHarness(async () => ({ ok: false }))
  assert.equal((await unavailable.nav()).text, "暂不可用")
  const malformed = await footerHarness(async () => json({ pageviews: null, updatedAt: "invalid" }))
  assert.equal((await malformed.nav()).text, "暂不可用")
  const zero = await footerHarness(async () => json({ pageviews: 0, updatedAt: "2026-11-01T19:00:00Z" }))
  assert.equal((await zero.nav()).text, "0 次")
})

import assert from "node:assert/strict"
import test from "node:test"
import { ResearchNotice } from "./researchNotice"

const english = false
const ctx = { cfg: { configuration: { baseUrl: "example.org/research/" } } } as any
const apply = async (source: string) => ResearchNotice().textTransform!(ctx, source)
const source = (scope: string, copyright = false) =>
  `---\ntitle: Example\nresearchScope: ${scope}\nlanguage: ${english ? "en" : "zh-CN"}\n---\n\n## Main argument\n\nAn assumption and a formula: $x_t \\in K$.\n\n## References\n\nAn original reference.\n${copyright ? "\n---\n\n© 2026 SL. All rights reserved.\n" : ""}`

for (const scope of ["investment", "safety"]) {
  test(`${scope} notice follows substantive sections and keeps the policy link`, async () => {
    const original = source(scope)
    const output = await apply(original)
    const marker = output.indexOf('id="research-use-disclaimer"')
    assert.ok(marker > output.indexOf("An original reference."))
    assert.ok(output.startsWith(original.trimEnd()))
    assert.ok(output.includes("https://example.org/research/disclaimer"))
    assert.equal(output.split('id="research-use-disclaimer"').length - 1, 1)
    const boundary = scope === "safety"
      ? english ? "not a flight manual" : "不是飞行"
      : english ? "not a recommendation to buy" : "不提供买卖"
    assert.ok(output.includes(boundary))
  })
}

test("notice is inserted before a closing copyright line", async () => {
  const original = source("investment", true)
  const output = await apply(original)
  assert.ok(output.indexOf('id="research-use-disclaimer"') < output.indexOf("© 2026 SL."))
  assert.ok(output.endsWith("© 2026 SL. All rights reserved.\n"))
  assert.ok(output.includes("$x_t \\in K$"))
})

test("reprocessing never duplicates the notice", async () => {
  const once = await apply(source("safety"))
  assert.equal(await apply(once), once)
})

test("unscoped pages and plain text remain unchanged", async () => {
  const original = "---\ntitle: Example\n---\n\n## Main argument\n\nOriginal text.\n"
  assert.equal(await apply(original), original)
  assert.equal(await apply("Original text."), "Original text.")
})

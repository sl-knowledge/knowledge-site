import assert from "node:assert/strict"
import test from "node:test"
import { markdownRenderingProblems } from "./verify-markdown-rendering.mjs"

test("detects the reported Chinese punctuation/emphasis failure", () => {
  assert.equal(markdownRenderingProblems("<article><p>**理论体系：**呈现概念。</p></article>").length, 1)
  assert.deepEqual(markdownRenderingProblems("<article><p><strong>理论体系</strong>：呈现概念。</p></article>"), [])
})

test("preserves intentional Markdown examples in code", () => {
  assert.deepEqual(markdownRenderingProblems("<article><pre><code>**label**</code></pre><p><code>__name__</code></p></article>"), [])
})

test("ignores valid math internals but detects a math error", () => {
  assert.deepEqual(markdownRenderingProblems('<article><span class="katex"><annotation>$$x**y$$</annotation></span></article>'), [])
  assert.equal(markdownRenderingProblems('<article><span class="katex-error">invalid formula</span></article>').length, 1)
})

test("finds raw math delimiters and broken fences outside code", () => {
  assert.equal(markdownRenderingProblems("<article><p>\\(x+y\\)</p></article>").length, 1)
  assert.equal(markdownRenderingProblems("<article><p>" + String.fromCharCode(96).repeat(3) + "</p></article>").length, 1)
})

test("allows ordinary currency and ignores text outside the article", () => {
  assert.deepEqual(markdownRenderingProblems("<header>**template**</header><article><p>$10 or $20</p></article>"), [])
})

test("preserves fill-in blanks while detecting unrendered underscore emphasis", () => {
  assert.deepEqual(markdownRenderingProblems("<article><p>Constraint: ____; evidence: ____</p></article>"), [])
  assert.equal(markdownRenderingProblems("<article><p>__label__text</p></article>").length, 1)
})

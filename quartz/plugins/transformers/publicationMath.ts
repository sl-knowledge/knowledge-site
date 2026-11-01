import { QuartzTransformerPlugin } from "../types"

// Normalize the original notes' math delimiters at build time only.
export const PublicationMath: QuartzTransformerPlugin = () => ({
  name: "PublicationMath",
  textTransform(_ctx, src) {
    return src.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g)
      .map((part, i) => i % 2 ? part : part
        .replace(/\\\[([\s\S]*?)\\\]/g, (_match, math) => `\n$$\n${math.trim()}\n$$\n`)
        .replace(/\\\(([^\n]*?)\\\)/g, (_match, math) => `$${math.trim()}$`))
      .join("")
  },
})

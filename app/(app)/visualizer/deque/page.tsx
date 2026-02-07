import { DequeVisualizer } from "@/components/visualizer/deque/deque-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function DequePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "deque.md"),
    "utf-8"
  )

  return <DequeVisualizer content={<MarkdownContent content={content} />} />
}

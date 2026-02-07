import { HeapVisualizer } from "@/components/visualizer/heap/heap-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function HeapPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "heap.md"),
    "utf-8"
  )

  return <HeapVisualizer content={<MarkdownContent content={content} />} />
} 
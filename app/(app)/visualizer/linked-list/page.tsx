import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function LinkedListPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "linked-list.md"),
    "utf-8"
  )

  return <LinkedListVisualizer content={<MarkdownContent content={content} />} />
} 
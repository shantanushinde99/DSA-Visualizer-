import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function QueuePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "queue.md"),
    "utf-8"
  )

  return <QueueVisualizer content={<MarkdownContent content={content} />} />
} 
import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function StackPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "stack.md"),
    "utf-8"
  )

  return <StackVisualizer content={<MarkdownContent content={content} />} />
} 
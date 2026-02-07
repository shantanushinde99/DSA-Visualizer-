import { BinaryTreeVisualizer } from "@/components/visualizer/binary-tree/binary-tree-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function BinaryTreePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "binary-tree.md"),
    "utf-8"
  )

  return <BinaryTreeVisualizer content={<MarkdownContent content={content} />} />
}
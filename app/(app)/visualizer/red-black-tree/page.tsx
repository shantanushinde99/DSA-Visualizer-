import { RBTreeVisualizer } from "@/components/visualizer/red-black-tree/rb-tree-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function RedBlackTreePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "red-black-tree.md"),
    "utf-8"
  )

  return <RBTreeVisualizer content={<MarkdownContent content={content} />} />
}

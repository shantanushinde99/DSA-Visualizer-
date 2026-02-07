import { AVLTreeVisualizer } from "@/components/visualizer/avl-tree/avl-tree-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function AVLTreePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "avl-tree.md"),
    "utf-8"
  )

  return <AVLTreeVisualizer content={<MarkdownContent content={content} />} />
} 
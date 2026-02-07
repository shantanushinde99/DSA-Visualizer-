import { GraphVisualizer } from "@/components/visualizer/graph/graph-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function GraphPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "graph.md"),
    "utf-8"
  )

  return <GraphVisualizer content={<MarkdownContent content={content} />} />
}

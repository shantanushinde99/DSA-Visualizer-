import { DijkstraVisualizer } from "@/components/visualizer/dijkstra/dijkstra-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import fs from "fs/promises"
import path from "path"

export default async function DijkstraPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "dijkstra.md"),
    "utf-8"
  )

  return <DijkstraVisualizer content={<MarkdownContent content={content} />} />
} 
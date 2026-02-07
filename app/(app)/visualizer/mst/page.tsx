import { MSTVisualizer } from "@/components/visualizer/mst/mst-visualizer";
import { MarkdownContent } from "@/components/shared/markdown-content";
import fs from "fs/promises";
import path from "path";

export default async function MSTPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "mst.md"),
    "utf-8"
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Minimum Spanning Tree</h1>
        <p className="text-muted-foreground text-lg">
          Find minimum cost tree connecting all vertices using Kruskal's or Prim's algorithm
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MSTVisualizer />
        </div>
        <div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}

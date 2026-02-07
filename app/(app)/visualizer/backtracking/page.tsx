import { BacktrackingVisualizer } from "@/components/visualizer/backtracking/backtracking-visualizer";
import { MarkdownContent } from "@/components/shared/markdown-content";
import fs from "fs/promises";
import path from "path";

export default async function BacktrackingPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "backtracking.md"),
    "utf-8"
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Backtracking Algorithms</h1>
        <p className="text-muted-foreground text-lg">
          Explore solution spaces by trying possibilities and backtracking when constraints fail
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BacktrackingVisualizer />
        </div>
        <div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}

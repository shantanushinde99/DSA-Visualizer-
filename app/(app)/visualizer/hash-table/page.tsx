import { HashTableVisualizer } from "@/components/visualizer/hash-table/hash-table-visualizer";
import { MarkdownContent } from "@/components/shared/markdown-content";
import fs from "fs/promises";
import path from "path";

export default async function HashTablePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "hash-table.md"),
    "utf-8"
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Hash Table</h1>
        <p className="text-muted-foreground">
          Visualize hash table operations with different collision resolution methods
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <HashTableVisualizer />
        </div>
        <div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}

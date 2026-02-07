import { TrieVisualizer } from "@/components/visualizer/trie/trie-visualizer";
import { MarkdownContent } from "@/components/shared/markdown-content";
import fs from "fs/promises";
import path from "path";

export default async function TriePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "content", "trie.md"),
    "utf-8"
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Trie (Prefix Tree)</h1>
        <p className="text-muted-foreground">
          Visualize trie operations for efficient string searching
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TrieVisualizer />
        </div>
        <div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}

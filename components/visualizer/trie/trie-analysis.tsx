"use client";

import { Card } from "@/components/ui/card";

interface TrieAnalysisProps {
  trie: ReturnType<typeof import("@/hooks/use-trie").useTrie>;
}

export function TrieAnalysis({ trie }: TrieAnalysisProps) {
  const { words } = trie;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Trie Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{words.length}</div>
              <div className="text-sm text-muted-foreground">Words Stored</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {words.length > 0 ? Math.max(...words.map(w => w.length)) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Max Word Length</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Time Complexity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Insert:</span>
              <code className="text-green-600 dark:text-green-400">O(m)</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Search:</span>
              <code className="text-blue-600 dark:text-blue-400">O(m)</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delete:</span>
              <code className="text-red-600 dark:text-red-400">O(m)</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Autocomplete:</span>
              <code className="text-purple-600 dark:text-purple-400">O(m + k)</code>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            m = word length, k = number of suggestions
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3">Space Complexity</h4>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall:</span>
            <code className="text-lg text-purple-600 dark:text-purple-400">O(n × m)</code>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            n = number of words, m = average word length
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Key Features</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Fast prefix-based searching</li>
            <li>• Space-efficient for common prefixes</li>
            <li>• Perfect for autocomplete systems</li>
            <li>• No hash collisions unlike hash tables</li>
            <li>• Alphabetically sorted output</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Use Cases</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Autocomplete and search suggestions</p>
            <p>• Spell checkers and dictionaries</p>
            <p>• IP routing tables (longest prefix matching)</p>
            <p>• Text prediction in keyboards</p>
            <p>• Genome sequence analysis</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

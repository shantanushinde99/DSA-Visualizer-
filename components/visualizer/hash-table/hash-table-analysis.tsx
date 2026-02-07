"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HashTableAnalysisProps {
  hashTable: ReturnType<typeof import("@/hooks/use-hash-table").useHashTable>;
}

export function HashTableAnalysis({ hashTable }: HashTableAnalysisProps) {
  const { collisionMethod, loadFactor, itemCount, size } = hashTable;

  const getLoadFactorStatus = () => {
    if (loadFactor < 0.5) return { text: "Good", color: "bg-green-500" };
    if (loadFactor < 0.75) return { text: "Fair", color: "bg-yellow-500" };
    return { text: "High - Consider Resizing", color: "bg-red-500" };
  };

  const status = getLoadFactorStatus();

  const getComplexityInfo = () => {
    switch (collisionMethod) {
      case "chaining":
        return {
          avgInsert: "O(1)",
          worstInsert: "O(n)",
          avgSearch: "O(1)",
          worstSearch: "O(n)",
          avgDelete: "O(1)",
          worstDelete: "O(n)",
          spaceComplexity: "O(n + m)",
        };
      case "linear-probing":
      case "quadratic-probing":
        return {
          avgInsert: "O(1)",
          worstInsert: "O(n)",
          avgSearch: "O(1)",
          worstSearch: "O(n)",
          avgDelete: "O(1)",
          worstDelete: "O(n)",
          spaceComplexity: "O(n)",
        };
      default:
        return {
          avgInsert: "O(1)",
          worstInsert: "O(n)",
          avgSearch: "O(1)",
          worstSearch: "O(n)",
          avgDelete: "O(1)",
          worstDelete: "O(n)",
          spaceComplexity: "O(n)",
        };
    }
  };

  const complexity = getComplexityInfo();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis</h3>
      
      <div className="space-y-6">
        {/* Performance Metrics */}
        <div>
          <h4 className="font-medium mb-3">Performance Metrics</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Load Factor:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{(loadFactor * 100).toFixed(1)}%</span>
                <Badge className={status.color}>{status.text}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Capacity:</span>
              <span className="font-mono">{itemCount} / {size}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Collision Method:</span>
              <span className="font-mono text-sm">
                {collisionMethod === "chaining" ? "Chaining" : 
                 collisionMethod === "linear-probing" ? "Linear Probing" : 
                 "Quadratic Probing"}
              </span>
            </div>
          </div>
        </div>

        {/* Time Complexity */}
        <div>
          <h4 className="font-medium mb-3">Time Complexity</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Average Case</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insert:</span>
                  <code className="text-green-600 dark:text-green-400">{complexity.avgInsert}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Search:</span>
                  <code className="text-blue-600 dark:text-blue-400">{complexity.avgSearch}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delete:</span>
                  <code className="text-red-600 dark:text-red-400">{complexity.avgDelete}</code>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Worst Case</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insert:</span>
                  <code className="text-orange-600 dark:text-orange-400">{complexity.worstInsert}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Search:</span>
                  <code className="text-orange-600 dark:text-orange-400">{complexity.worstSearch}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delete:</span>
                  <code className="text-orange-600 dark:text-orange-400">{complexity.worstDelete}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div>
          <h4 className="font-medium mb-2">Space Complexity</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total:</span>
            <code className="text-purple-600 dark:text-purple-400">{complexity.spaceComplexity}</code>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {collisionMethod === "chaining" 
              ? "n = number of elements, m = table size"
              : "n = table size"}
          </p>
        </div>

        {/* Method-Specific Notes */}
        <div>
          <h4 className="font-medium mb-2">Method Notes</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            {collisionMethod === "chaining" && (
              <>
                <p>• Allows load factor &gt; 1</p>
                <p>• No clustering issues</p>
                <p>• Extra memory for linked lists</p>
                <p>• Performance degrades with high load factor</p>
              </>
            )}
            {collisionMethod === "linear-probing" && (
              <>
                <p>• Primary clustering can occur</p>
                <p>• Cache-friendly (good locality)</p>
                <p>• Must handle deletions carefully</p>
                <p>• Performance degrades when load factor &gt; 0.7</p>
              </>
            )}
            {collisionMethod === "quadratic-probing" && (
              <>
                <p>• Reduces primary clustering</p>
                <p>• Secondary clustering can still occur</p>
                <p>• Better than linear probing for medium loads</p>
                <p>• May not probe all slots</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

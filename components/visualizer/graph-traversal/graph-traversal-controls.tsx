"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, GitBranch, Network } from "lucide-react";
import type { TraversalType } from "@/hooks/use-graph-traversal";

interface GraphTraversalControlsProps {
  graphTraversal: ReturnType<typeof import("@/hooks/use-graph-traversal").useGraphTraversal>;
}

export function GraphTraversalControls({ graphTraversal }: GraphTraversalControlsProps) {
  const { traversalType, startNode, nodes, setTraversalType, setStartNode, loadExampleGraph, loadCyclicGraph, traverse } = graphTraversal;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Traversal Type Selection */}
        <div className="space-y-2">
          <Label>Traversal Algorithm</Label>
          <Select value={traversalType} onValueChange={(value) => setTraversalType(value as TraversalType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bfs">Breadth-First Search (BFS)</SelectItem>
              <SelectItem value="dfs">Depth-First Search (DFS)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Node Selection */}
        {nodes.length > 0 && (
          <div className="space-y-2">
            <Label>Start Node</Label>
            <Select value={startNode.toString()} onValueChange={(value) => setStartNode(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id.toString()}>
                    Node {node.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Example Graph Buttons */}
        <div className="space-y-2">
          <Label>Load Example Graph</Label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={loadExampleGraph} variant="outline" size="sm">
              <GitBranch className="mr-2 h-4 w-4" />
              Tree Graph
            </Button>
            <Button onClick={loadCyclicGraph} variant="outline" size="sm">
              <Network className="mr-2 h-4 w-4" />
              Cyclic Graph
            </Button>
          </div>
        </div>

        {/* Traverse Button */}
        <Button onClick={traverse} className="w-full" size="lg" disabled={nodes.length === 0}>
          <Play className="mr-2 h-5 w-5" />
          Start {traversalType === "bfs" ? "BFS" : "DFS"}
        </Button>

        {/* Algorithm Description */}
        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p className="font-medium mb-2">
            {traversalType === "bfs" ? "Breadth-First Search" : "Depth-First Search"}
          </p>
          {traversalType === "bfs" ? (
            <div className="space-y-1">
              <p>• Explores level by level</p>
              <p>• Uses a Queue (FIFO)</p>
              <p>• Finds shortest path in unweighted graphs</p>
              <p>• Time: O(V + E), Space: O(V)</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p>• Explores as far as possible first</p>
              <p>• Uses a Stack (LIFO)</p>
              <p>• Good for path existence, topological sort</p>
              <p>• Time: O(V + E), Space: O(V)</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

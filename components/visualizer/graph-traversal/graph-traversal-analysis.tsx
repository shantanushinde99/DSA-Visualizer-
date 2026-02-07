"use client";

import { Card } from "@/components/ui/card";

interface GraphTraversalAnalysisProps {
  graphTraversal: ReturnType<typeof import("@/hooks/use-graph-traversal").useGraphTraversal>;
}

export function GraphTraversalAnalysis({ graphTraversal }: GraphTraversalAnalysisProps) {
  const { traversalType, nodes, edges } = graphTraversal;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Analysis - {traversalType === "bfs" ? "Breadth-First Search" : "Depth-First Search"}
      </h3>
      
      <div className="space-y-6">
        {/* Graph Stats */}
        <div>
          <h4 className="font-medium mb-3">Graph Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {nodes.length}
              </div>
              <div className="text-sm text-muted-foreground">Vertices (V)</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {edges.length}
              </div>
              <div className="text-sm text-muted-foreground">Edges (E)</div>
            </div>
          </div>
        </div>

        {/* Time & Space Complexity */}
        <div>
          <h4 className="font-medium mb-3">Complexity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Time Complexity:</span>
              <code className="text-lg text-blue-600 dark:text-blue-400">O(V + E)</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Space Complexity:</span>
              <code className="text-lg text-purple-600 dark:text-purple-400">O(V)</code>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            V = number of vertices, E = number of edges
          </p>
        </div>

        {/* Algorithm Characteristics */}
        <div>
          <h4 className="font-medium mb-2">
            {traversalType === "bfs" ? "BFS" : "DFS"} Characteristics
          </h4>
          {traversalType === "bfs" ? (
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Explores nodes level by level (layer-wise)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Uses Queue data structure (FIFO)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Finds shortest path in unweighted graphs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Visits all neighbors before going deeper</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Memory intensive for wide graphs</span>
              </li>
            </ul>
          ) : (
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Explores as far as possible along each branch</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Uses Stack data structure (LIFO)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Good for detecting cycles and paths</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Goes deep before exploring siblings</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Memory efficient for deep graphs</span>
              </li>
            </ul>
          )}
        </div>

        {/* Use Cases */}
        <div>
          <h4 className="font-medium mb-2">Common Use Cases</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            {traversalType === "bfs" ? (
              <>
                <p>• Shortest path in unweighted graphs</p>
                <p>• Level-order traversal of trees</p>
                <p>• Web crawlers (closest links first)</p>
                <p>• Social networking (degrees of separation)</p>
                <p>• Broadcasting in networks</p>
                <p>• GPS navigation systems</p>
              </>
            ) : (
              <>
                <p>• Topological sorting</p>
                <p>• Detecting cycles in graphs</p>
                <p>• Path finding with backtracking</p>
                <p>• Solving mazes and puzzles</p>
                <p>• Finding connected components</p>
                <p>• Generating permutations/combinations</p>
              </>
            )}
          </div>
        </div>

        {/* Comparison */}
        <div>
          <h4 className="font-medium mb-2">BFS vs DFS</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Aspect</th>
                  <th className="text-left py-2">BFS</th>
                  <th className="text-left py-2">DFS</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2">Data Structure</td>
                  <td>Queue</td>
                  <td>Stack</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Memory</td>
                  <td>More (wide)</td>
                  <td>Less (deep)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Shortest Path</td>
                  <td>Yes</td>
                  <td>No</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Implementation</td>
                  <td>Iterative</td>
                  <td>Recursive/Iterative</td>
                </tr>
                <tr>
                  <td className="py-2">Optimal For</td>
                  <td>Shallow solutions</td>
                  <td>Deep solutions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
}

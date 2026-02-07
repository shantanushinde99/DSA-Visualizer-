"use client";

import { Card } from "@/components/ui/card";

interface MSTAnalysisProps {
  mst: ReturnType<typeof import("@/hooks/use-mst").useMST>;
}

export function MSTAnalysis({ mst }: MSTAnalysisProps) {
  const { algorithm, steps } = mst;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Analysis - {algorithm === "kruskal" ? "Kruskal's" : "Prim's"} Algorithm
      </h3>

      <div className="space-y-6">
        {/* Complexity */}
        <div>
          <h4 className="font-medium mb-3">Complexity</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Time Complexity</div>
              <code className="text-lg text-blue-600 dark:text-blue-400">
                {algorithm === "kruskal" ? "O(E log E)" : "O(E log V)"}
              </code>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Space Complexity</div>
              <code className="text-lg text-purple-600 dark:text-purple-400">O(V + E)</code>
            </div>
          </div>
        </div>

        {/* Algorithm Description */}
        <div>
          <h4 className="font-medium mb-2">How It Works</h4>
          {algorithm === "kruskal" ? (
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Kruskal's algorithm</strong> builds the MST by sorting all edges by weight and greedily
                adding the smallest edge that doesn't create a cycle.
              </p>
              <p className="font-medium text-foreground">Steps:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Sort all edges in non-decreasing order of weight</li>
                <li>Initialize empty MST</li>
                <li>For each edge in sorted order:</li>
                <li className="ml-4">• If adding edge doesn't create cycle, add it to MST</li>
                <li className="ml-4">• Otherwise, skip it</li>
                <li>Stop when MST has V-1 edges</li>
              </ol>
              <p className="mt-2">
                <strong>Data Structure:</strong> Uses Union-Find (Disjoint Set) to efficiently detect cycles
              </p>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Prim's algorithm</strong> grows the MST from a starting vertex by repeatedly adding
                the minimum weight edge that connects the MST to a new vertex.
              </p>
              <p className="font-medium text-foreground">Steps:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Start with arbitrary vertex in MST</li>
                <li>Repeat until all vertices in MST:</li>
                <li className="ml-4">• Find minimum weight edge connecting MST to outside vertex</li>
                <li className="ml-4">• Add that edge and vertex to MST</li>
              </ol>
              <p className="mt-2">
                <strong>Data Structure:</strong> Uses Min-Heap (Priority Queue) for efficient edge selection
              </p>
            </div>
          )}
        </div>

        {/* When to Use */}
        <div>
          <h4 className="font-medium mb-2">When to Use This Algorithm</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            {algorithm === "kruskal" ? (
              <>
                <p>
                  <strong>Kruskal's is better when:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Graph has fewer edges (sparse graph)</li>
                  <li>Edges are already sorted or can be sorted efficiently</li>
                  <li>Need to process edges in order</li>
                  <li>Working with disconnected components</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  <strong>Prim's is better when:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Graph is dense (many edges)</li>
                  <li>Using adjacency matrix representation</li>
                  <li>Need to grow MST from specific vertex</li>
                  <li>Graph is always connected</li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Key Properties */}
        <div>
          <h4 className="font-medium mb-2">MST Properties</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Uniqueness:</span> If all edge weights are distinct,
              MST is unique
            </div>
            <div>
              <span className="font-medium text-foreground">Edge Count:</span> MST of connected graph with V
              vertices has exactly V-1 edges
            </div>
            <div>
              <span className="font-medium text-foreground">Cut Property:</span> For any cut, the minimum weight
              edge crossing the cut is in some MST
            </div>
            <div>
              <span className="font-medium text-foreground">Cycle Property:</span> For any cycle, the maximum
              weight edge in the cycle is not in any MST
            </div>
          </div>
        </div>

        {/* Applications */}
        <div>
          <h4 className="font-medium mb-2">Real-World Applications</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Network Design:</strong> Laying cables, pipes, or roads to connect cities with minimum cost
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Circuit Design:</strong> Connecting components on PCB with minimum wire length
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Cluster Analysis:</strong> Finding natural groupings in data
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Approximation Algorithms:</strong> Used in TSP approximation and Steiner tree
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Image Segmentation:</strong> Computer vision applications
              </span>
            </li>
          </ul>
        </div>

        {/* Comparison */}
        <div>
          <h4 className="font-medium mb-2">Kruskal's vs Prim's</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Aspect</th>
                  <th className="text-left p-2">Kruskal's</th>
                  <th className="text-left p-2">Prim's</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Approach</td>
                  <td className="p-2">Edge-based (greedy)</td>
                  <td className="p-2">Vertex-based (greedy)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Time</td>
                  <td className="p-2">O(E log E)</td>
                  <td className="p-2">O(E log V)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Data Structure</td>
                  <td className="p-2">Union-Find</td>
                  <td className="p-2">Min-Heap</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Best For</td>
                  <td className="p-2">Sparse graphs</td>
                  <td className="p-2">Dense graphs</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium text-foreground">Works on</td>
                  <td className="p-2">Disconnected graphs</td>
                  <td className="p-2">Connected graphs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        {steps.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Execution Statistics</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Steps:</span>{" "}
                <span className="font-bold">{steps.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Edges Added:</span>{" "}
                <span className="font-bold">{steps.filter((s) => s.action === "add").length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Edges Skipped:</span>{" "}
                <span className="font-bold">{steps.filter((s) => s.action === "skip").length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

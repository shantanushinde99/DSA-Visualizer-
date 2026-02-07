"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Graph } from "@/hooks/use-graph"

interface GraphAnalysisProps {
  graph: Graph
}

export function GraphAnalysis({ graph }: GraphAnalysisProps) {
  const nodeCount = graph.nodes.length
  const edgeCount = graph.edges.length

  // Calculate degree for each node
  const degrees = new Map<number, { in: number, out: number }>()
  graph.nodes.forEach(node => {
    degrees.set(node.id, { in: 0, out: 0 })
  })

  graph.edges.forEach(edge => {
    const fromDegree = degrees.get(edge.from)!
    const toDegree = degrees.get(edge.to)!
    fromDegree.out++
    toDegree.in++
    
    if (!graph.directed) {
      fromDegree.in++
      toDegree.out++
    }
  })

  const maxDegree = Math.max(...Array.from(degrees.values()).map(d => d.in + d.out), 0)
  const avgDegree = nodeCount > 0 ? (edgeCount * (graph.directed ? 1 : 2)) / nodeCount : 0

  // Check if complete graph
  const maxPossibleEdges = nodeCount * (nodeCount - 1) / (graph.directed ? 1 : 2)
  const isComplete = edgeCount === maxPossibleEdges && nodeCount > 1

  return (
    <Card>
      <CardHeader>
        <CardTitle>Graph Analysis</CardTitle>
        <CardDescription>Properties and statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nodes</p>
              <p className="text-2xl font-bold">{nodeCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Edges</p>
              <p className="text-2xl font-bold">{edgeCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Graph Type</p>
              <p className="text-sm font-semibold">
                {graph.directed ? "Directed" : "Undirected"}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Max Degree</p>
              <p className="text-2xl font-bold">{maxDegree}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Degree</p>
              <p className="text-2xl font-bold">{avgDegree.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Complete</p>
              <p className="text-sm font-semibold">
                {isComplete ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {nodeCount > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Node Degrees</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {graph.nodes.map(node => {
                const degree = degrees.get(node.id)!
                const total = degree.in + degree.out
                return (
                  <div key={node.id} className="flex justify-between text-sm">
                    <span>Node {node.label}</span>
                    <span className="text-muted-foreground">
                      {graph.directed ? `In: ${degree.in}, Out: ${degree.out}` : `Degree: ${total / 2}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

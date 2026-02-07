"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Graph, GraphNode, GraphEdge } from "@/hooks/use-graph"
import { useRef, useState, useEffect } from "react"

interface GraphDisplayProps {
  graph: Graph
  selectedNodes: number[]
  onNodeClick: (nodeId: number) => void
  onNodeMove: (nodeId: number, x: number, y: number) => void
}

export function GraphDisplay({ graph, selectedNodes, onNodeClick, onNodeMove }: GraphDisplayProps) {
  const [draggingNode, setDraggingNode] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseDown = (nodeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setDraggingNode(nodeId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNode === null || !svgRef.current) return

    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    onNodeMove(draggingNode, x, y)
  }

  const handleMouseUp = () => {
    setDraggingNode(null)
  }

  const renderArrowhead = () => (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="currentColor" className="fill-muted-foreground" />
      </marker>
    </defs>
  )

  const getNodePosition = (nodeId: number): { x: number, y: number } => {
    const node = graph.nodes.find(n => n.id === nodeId)
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Graph Visualization</CardTitle>
        <CardDescription>
          {graph.directed ? "Directed" : "Undirected"} • {graph.weighted ? "Weighted" : "Unweighted"} • {graph.nodes.length} nodes, {graph.edges.length} edges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          {graph.nodes.length === 0 ? (
            <div className="text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
              <div>
                <p className="text-lg">Graph is empty</p>
                <p className="text-sm">Add nodes to get started</p>
              </div>
            </div>
          ) : (
            <svg 
              ref={svgRef}
              width={600} 
              height={500}
              className="border rounded-lg cursor-move"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {graph.directed && renderArrowhead()}

              {/* Draw edges */}
              {graph.edges.map((edge, idx) => {
                const from = getNodePosition(edge.from)
                const to = getNodePosition(edge.to)
                
                // Calculate direction for offset (for bidirectional edges)
                const dx = to.x - from.x
                const dy = to.y - from.y
                const len = Math.sqrt(dx * dx + dy * dy)
                const ux = dx / len
                const uy = dy / len

                // Start and end points adjusted for node radius
                const startX = from.x + ux * 25
                const startY = from.y + uy * 25
                const endX = to.x - ux * 25
                const endY = to.y - uy * 25

                // Midpoint for weight label
                const midX = (startX + endX) / 2
                const midY = (startY + endY) / 2

                return (
                  <g key={`edge-${idx}`}>
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-muted-foreground"
                      markerEnd={graph.directed ? "url(#arrowhead)" : undefined}
                    />
                    {graph.weighted && edge.weight !== undefined && (
                      <g>
                        <circle
                          cx={midX}
                          cy={midY}
                          r="12"
                          fill="white"
                          stroke="currentColor"
                          className="stroke-muted-foreground"
                        />
                        <text
                          x={midX}
                          y={midY}
                          textAnchor="middle"
                          dy=".3em"
                          className="text-xs font-semibold fill-black"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Draw nodes */}
              {graph.nodes.map((node) => {
                const isSelected = selectedNodes.includes(node.id)
                
                return (
                  <g 
                    key={`node-${node.id}`}
                    onMouseDown={(e) => handleMouseDown(node.id, e)}
                    onClick={() => onNodeClick(node.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="25"
                      fill="#3b82f6"
                      stroke={isSelected ? "#ef4444" : "#1e40af"}
                      strokeWidth={isSelected ? "4" : "2"}
                      className="transition-all duration-200"
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dy=".3em"
                      className="fill-white font-bold text-sm pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

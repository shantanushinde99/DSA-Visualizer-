"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RBNode } from "@/hooks/use-red-black-tree"
import { cn } from "@/lib/utils"

interface RBTreeDisplayProps {
  tree: RBNode | null
  highlightedNodes: number[]
}

interface NodePosition {
  x: number
  y: number
  node: RBNode
}

function calculatePositions(
  node: RBNode | null,
  x: number = 0,
  y: number = 0,
  spacing: number = 80
): NodePosition[] {
  if (!node) return []

  const positions: NodePosition[] = [{ x, y, node }]

  if (node.left) {
    positions.push(...calculatePositions(node.left, x - spacing, y + 80, spacing * 0.6))
  }
  if (node.right) {
    positions.push(...calculatePositions(node.right, x + spacing, y + 80, spacing * 0.6))
  }

  return positions
}

export function RBTreeDisplay({ tree, highlightedNodes }: RBTreeDisplayProps) {
  const positions = calculatePositions(tree)
  
  const minX = positions.length > 0 ? Math.min(...positions.map(p => p.x)) : 0
  const maxX = positions.length > 0 ? Math.max(...positions.map(p => p.x)) : 0
  const maxY = positions.length > 0 ? Math.max(...positions.map(p => p.y)) : 0

  const viewWidth = Math.max(600, (maxX - minX) + 120)
  const viewHeight = Math.max(400, maxY + 120)
  const offsetX = -minX + 60
  const offsetY = 60

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Red-Black Tree Visualization</CardTitle>
        <CardDescription>
          Red nodes have red background, Black nodes have black border
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center min-h-[400px]">
          {!tree ? (
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Tree is empty</p>
              <p className="text-sm">Insert values to build the tree</p>
            </div>
          ) : (
            <svg 
              width={viewWidth} 
              height={viewHeight}
              className="border rounded-lg"
            >
              {/* Draw edges */}
              {positions.map((pos) => {
                const elements = []
                if (pos.node.left) {
                  const leftPos = positions.find(p => p.node === pos.node.left)!
                  elements.push(
                    <line
                      key={`edge-left-${pos.node.value}`}
                      x1={pos.x + offsetX}
                      y1={pos.y + offsetY}
                      x2={leftPos.x + offsetX}
                      y2={leftPos.y + offsetY}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-muted-foreground"
                    />
                  )
                }
                if (pos.node.right) {
                  const rightPos = positions.find(p => p.node === pos.node.right)!
                  elements.push(
                    <line
                      key={`edge-right-${pos.node.value}`}
                      x1={pos.x + offsetX}
                      y1={pos.y + offsetY}
                      x2={rightPos.x + offsetX}
                      y2={rightPos.y + offsetY}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-muted-foreground"
                    />
                  )
                }
                return elements
              })}

              {/* Draw nodes */}
              {positions.map((pos) => {
                const isHighlighted = highlightedNodes.includes(pos.node.value)
                const isRed = pos.node.color === "RED"
                
                return (
                  <g key={`node-${pos.node.value}`}>
                    <circle
                      cx={pos.x + offsetX}
                      cy={pos.y + offsetY}
                      r="25"
                      fill={isRed ? "#ef4444" : "#1f2937"}
                      stroke={isHighlighted ? "#3b82f6" : (isRed ? "#dc2626" : "#000000")}
                      strokeWidth={isHighlighted ? "4" : "2"}
                      className="transition-all duration-300"
                    />
                    <text
                      x={pos.x + offsetX}
                      y={pos.y + offsetY}
                      textAnchor="middle"
                      dy=".3em"
                      className="fill-white font-bold text-sm"
                    >
                      {pos.node.value}
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

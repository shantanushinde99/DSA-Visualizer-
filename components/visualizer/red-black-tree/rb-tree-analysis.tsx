"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RBNode } from "@/hooks/use-red-black-tree"

interface RBTreeAnalysisProps {
  tree: RBNode | null
}

function calculateHeight(node: RBNode | null): number {
  if (!node) return 0
  return 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right))
}

function calculateSize(node: RBNode | null): number {
  if (!node) return 0
  return 1 + calculateSize(node.left) + calculateSize(node.right)
}

function calculateBlackHeight(node: RBNode | null): number {
  if (!node) return 1
  const leftHeight = calculateBlackHeight(node.left)
  return leftHeight + (node.color === "BLACK" ? 1 : 0)
}

function countRedNodes(node: RBNode | null): number {
  if (!node) return 0
  return (node.color === "RED" ? 1 : 0) + countRedNodes(node.left) + countRedNodes(node.right)
}

function countBlackNodes(node: RBNode | null): number {
  if (!node) return 0
  return (node.color === "BLACK" ? 1 : 0) + countBlackNodes(node.left) + countBlackNodes(node.right)
}

export function RBTreeAnalysis({ tree }: RBTreeAnalysisProps) {
  const height = calculateHeight(tree)
  const size = calculateSize(tree)
  const blackHeight = calculateBlackHeight(tree)
  const redCount = countRedNodes(tree)
  const blackCount = countBlackNodes(tree)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tree Analysis</CardTitle>
        <CardDescription>Properties of the Red-Black Tree</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Total Nodes</p>
              <p className="text-2xl font-bold">{size}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tree Height</p>
              <p className="text-2xl font-bold">{height}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Black Height</p>
              <p className="text-2xl font-bold">{blackHeight}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Red Nodes</p>
              <p className="text-2xl font-bold text-red-500">{redCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Black Nodes</p>
              <p className="text-2xl font-bold">{blackCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Theoretical Min Height</p>
              <p className="text-2xl font-bold">{size > 0 ? Math.floor(Math.log2(size + 1)) : 0}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h4 className="font-semibold">Red-Black Properties</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>✓ Every node is either red or black</li>
            <li>✓ Root is black</li>
            <li>✓ All leaves (NIL) are black</li>
            <li>✓ Red nodes have black children</li>
            <li>✓ All paths have same black height</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

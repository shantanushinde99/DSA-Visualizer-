"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface GraphControlsProps {
  onAddNode: () => void
  onAddEdge: (from: number, to: number, weight?: number) => void
  onToggleDirected: () => void
  onToggleWeighted: () => void
  onClear: () => void
  onLoadExample: (type: 'simple' | 'complete' | 'cyclic') => void
  selectedNodes: number[]
  isDirected: boolean
  isWeighted: boolean
  nodeCount: number
}

export function GraphControls({
  onAddNode,
  onAddEdge,
  onToggleDirected,
  onToggleWeighted,
  onClear,
  onLoadExample,
  selectedNodes,
  isDirected,
  isWeighted,
  nodeCount,
}: GraphControlsProps) {
  const [fromNode, setFromNode] = useState("")
  const [toNode, setToNode] = useState("")
  const [weight, setWeight] = useState("")

  const handleAddEdge = () => {
    const from = parseInt(fromNode)
    const to = parseInt(toNode)
    const w = isWeighted && weight ? parseInt(weight) : undefined

    if (!isNaN(from) && !isNaN(to) && from !== to) {
      onAddEdge(from, to, w)
      setFromNode("")
      setToNode("")
      setWeight("")
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Graph Controls</CardTitle>
          <CardDescription>Build and configure your graph</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onAddNode} className="w-full">
            Add Node
          </Button>

          <div className="space-y-2">
            <Label>Add Edge</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="From"
                value={fromNode}
                onChange={(e) => setFromNode(e.target.value)}
                min="1"
                max={nodeCount}
              />
              <Input
                type="number"
                placeholder="To"
                value={toNode}
                onChange={(e) => setToNode(e.target.value)}
                min="1"
                max={nodeCount}
              />
            </div>
            {isWeighted && (
              <Input
                type="number"
                placeholder="Weight (optional)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            )}
            <Button 
              onClick={handleAddEdge}
              disabled={!fromNode || !toNode}
              variant="secondary"
              className="w-full"
            >
              Add Edge
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="directed">Directed Graph</Label>
              <Switch id="directed" checked={isDirected} onCheckedChange={onToggleDirected} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weighted">Weighted Graph</Label>
              <Switch id="weighted" checked={isWeighted} onCheckedChange={onToggleWeighted} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
          <CardDescription>Load predefined graphs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            onClick={() => onLoadExample('simple')} 
            variant="outline"
            className="w-full"
          >
            Simple Graph
          </Button>
          <Button 
            onClick={() => onLoadExample('complete')} 
            variant="outline"
            className="w-full"
          >
            Complete Graph
          </Button>
          <Button 
            onClick={() => onLoadExample('cyclic')} 
            variant="outline"
            className="w-full"
          >
            Cyclic Graph
          </Button>
          <Button 
            onClick={onClear} 
            variant="destructive"
            className="w-full"
          >
            Clear Graph
          </Button>
        </CardContent>
      </Card>

      {selectedNodes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {selectedNodes.map(id => `Node ${id + 1}`).join(", ")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

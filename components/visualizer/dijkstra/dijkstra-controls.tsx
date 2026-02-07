"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Graph } from "@/hooks/use-dijkstra"
import { exampleGraphs } from "./example-graphs"
import { Play, Pause, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DijkstraControlsProps {
  onAddNode: (x: number, y: number, customId?: string) => void
  onAddEdge: (source: string, target: string, weight: number) => boolean
  onSetStartNode: (nodeId: string) => void
  onSetEndNode: (nodeId: string) => void
  onFindPath: () => void
  onClear: () => void
  onNext: () => void
  onPrevious: () => void
  isAnimating: boolean
  currentStep: number
  totalSteps: number
  onLoadExample: (graphIndex: number) => void
  startNodeId: string | null
  endNodeId: string | null
  path: string[]
  distances: Map<string, number>
  onAutoPlay: () => void
  isAutoPlaying: boolean
  graph: Graph
}

export function DijkstraControls({
  onAddNode,
  onAddEdge,
  onSetStartNode,
  onSetEndNode,
  onFindPath,
  onClear,
  onNext,
  onPrevious,
  isAnimating,
  currentStep,
  totalSteps,
  onLoadExample,
  startNodeId,
  endNodeId,
  path,
  distances,
  onAutoPlay,
  isAutoPlaying,
  graph,
}: DijkstraControlsProps) {
  const [nodeId, setNodeId] = useState("")
  const [sourceNode, setSourceNode] = useState("")
  const [targetNode, setTargetNode] = useState("")
  const [weight, setWeight] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleAddNode = () => {
    if (!nodeId.trim()) {
      setError("Please enter a node ID")
      return
    }
    
    if (graph.nodes.find(n => n.id === nodeId)) {
      setError(`Node ${nodeId} already exists`)
      return
    }
    
    onAddNode(Math.random() * 600 + 100, Math.random() * 400 + 100, nodeId)
    setNodeId("")
    setError(null)
  }

  const handleAddEdge = () => {
    const weightNum = Number(weight)
    
    if (!sourceNode || !targetNode) {
      setError("Please enter both source and target nodes")
      return
    }
    
    if (isNaN(weightNum) || weightNum <= 0) {
      setError("Please enter a valid positive weight")
      return
    }
    
    if (sourceNode === targetNode) {
      setError("Source and target must be different nodes")
      return
    }
    
    const success = onAddEdge(sourceNode, targetNode, weightNum)
    
    if (success) {
      setSourceNode("")
      setTargetNode("")
      setWeight("")
      setError(null)
    } else {
      setError("Failed to add edge. Make sure both nodes exist and edge doesn't already exist.")
    }
  }

  const getTotalDistance = () => {
    if (path.length === 0) return null
    const lastNode = path[path.length - 1]
    return distances.get(lastNode)
  }

  return (
    <Card className="w-full h-[800px] overflow-y-auto">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
        <CardDescription>Configure and run the algorithm</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="build" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="build">Build Graph</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          </TabsList>

          <TabsContent value="build" className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Example Graphs</CardTitle>
                  <CardDescription>Load a predefined graph</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={(value) => {
                    onLoadExample(Number(value))
                    setError(null)
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an example" />
                    </SelectTrigger>
                    <SelectContent>
                      {exampleGraphs.map((graph, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          <div className="flex flex-col">
                            <span>{graph.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {graph.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Manual Build</CardTitle>
                  <CardDescription>Create custom graph</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {graph.nodes.length > 0 && (
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-xs font-medium mb-2">Available Nodes:</p>
                      <div className="flex flex-wrap gap-1">
                        {graph.nodes.map(node => (
                          <span
                            key={node.id}
                            className="px-2 py-1 bg-background border rounded text-xs font-mono"
                          >
                            {node.id}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Add Node</label>
                    <div className="flex gap-2">
                      <Input
                        value={nodeId}
                        onChange={(e) => setNodeId(e.target.value.toUpperCase())}
                        placeholder="Node ID (e.g., A, B, C)"
                        maxLength={3}
                      />
                      <Button onClick={handleAddNode}>Add</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a custom ID or click Add for auto-generated
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-2 block">Add Edge</label>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={sourceNode}
                          onChange={(e) => setSourceNode(e.target.value.toUpperCase())}
                          placeholder="Source (e.g., A)"
                          maxLength={3}
                        />
                        <Input
                          value={targetNode}
                          onChange={(e) => setTargetNode(e.target.value.toUpperCase())}
                          placeholder="Target (e.g., B)"
                          maxLength={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="Weight"
                          type="number"
                          min="1"
                          className="flex-1"
                        />
                        <Button onClick={handleAddEdge}>Add Edge</Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Creates bidirectional edge between nodes
                    </p>
                  </div>

                  {graph.edges.length > 0 && (
                    <div className="p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                      <p className="text-xs font-medium mb-2">Edges:</p>
                      <div className="space-y-1">
                        {/* Show unique edges (avoid showing both directions) */}
                        {graph.edges
                          .filter((edge, index, self) => 
                            index === self.findIndex(e => 
                              (e.source === edge.source && e.target === edge.target) ||
                              (e.source === edge.target && e.target === edge.source)
                            ) && edge.source < edge.target
                          )
                          .map((edge, index) => (
                            <div key={index} className="text-xs font-mono">
                              {edge.source} ↔ {edge.target} (weight: {edge.weight})
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="algorithm" className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Find Shortest Path</CardTitle>
                <CardDescription>Set start/end nodes and find path</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {graph.nodes.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please build a graph first using the Build Graph tab
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Start Node</label>
                        <Select
                          value={startNodeId || ""}
                          onValueChange={(value) => {
                            onSetStartNode(value)
                            setError(null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select start" />
                          </SelectTrigger>
                          <SelectContent>
                            {graph.nodes.map(node => (
                              <SelectItem key={node.id} value={node.id}>
                                {node.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">End Node</label>
                        <Select
                          value={endNodeId || ""}
                          onValueChange={(value) => {
                            onSetEndNode(value)
                            setError(null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select end" />
                          </SelectTrigger>
                          <SelectContent>
                            {graph.nodes.map(node => (
                              <SelectItem key={node.id} value={node.id}>
                                {node.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          if (!startNodeId || !endNodeId) {
                            setError("Please select both start and end nodes")
                            return
                          }
                          if (startNodeId === endNodeId) {
                            setError("Start and end nodes must be different")
                            return
                          }
                          setError(null)
                          onFindPath()
                        }}
                        disabled={isAnimating || !startNodeId || !endNodeId}
                        className="w-full"
                        variant="default"
                      >
                        Find Shortest Path
                      </Button>

                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          onClick={onPrevious}
                          disabled={currentStep <= 0 || isAnimating}
                          variant="outline"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={onAutoPlay}
                          disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
                          variant="outline"
                        >
                          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          onClick={onNext}
                          disabled={currentStep >= totalSteps - 1 || isAnimating}
                          variant="outline"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Path</CardTitle>
                <CardDescription>Path details and distance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {path.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Path:</span>
                        <span className="font-mono text-sm">
                          {path.join(" → ")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Distance:</span>
                        <span className="font-mono text-sm">
                          {getTotalDistance() === Infinity ? "∞" : getTotalDistance()}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {path.length === 1 
                        ? "Click 'Find Shortest Path' to start" 
                        : `Found path with ${path.length - 1} edges`
                      }
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground text-center">
                    No path found yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <Button 
          variant="destructive" 
          onClick={() => {
            onClear()
            setError(null)
            setNodeId("")
            setSourceNode("")
            setTargetNode("")
            setWeight("")
          }}
          className="w-full"
        >
          Clear Graph
        </Button>

        {totalSteps > 0 && (
          <div className="text-sm text-muted-foreground text-center mt-4">
            Step {currentStep + 1} of {totalSteps}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
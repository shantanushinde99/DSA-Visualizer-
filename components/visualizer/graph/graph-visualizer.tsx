"use client"

import { GraphControls } from "@/components/visualizer/graph/graph-controls"
import { GraphDisplay } from "@/components/visualizer/graph/graph-display"
import { GraphAnalysis } from "@/components/visualizer/graph/graph-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useGraph } from "@/hooks/use-graph"

interface GraphVisualizerProps {
  content: React.ReactNode
}

export function GraphVisualizer({ content }: GraphVisualizerProps) {
  const {
    graph,
    selectedNodes,
    addNode,
    addEdge,
    toggleDirected,
    toggleWeighted,
    selectNode,
    clear,
    loadExample,
    moveNode,
  } = useGraph()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Graph</h1>
        <p className="text-muted-foreground">
          Visualize graph structures with nodes and edges, supporting both directed and undirected graphs.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <GraphControls 
                onAddNode={addNode}
                onAddEdge={addEdge}
                onToggleDirected={toggleDirected}
                onToggleWeighted={toggleWeighted}
                onClear={clear}
                onLoadExample={loadExample}
                selectedNodes={selectedNodes}
                isDirected={graph.directed}
                isWeighted={graph.weighted}
                nodeCount={graph.nodes.length}
              />
            </div>
            <div className="xl:col-span-2">
              <GraphDisplay 
                graph={graph}
                selectedNodes={selectedNodes}
                onNodeClick={selectNode}
                onNodeMove={moveNode}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <GraphAnalysis graph={graph} />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { DequeControls } from "@/components/visualizer/deque/deque-controls"
import { DequeDisplay } from "@/components/visualizer/deque/deque-display"
import { DequeAnalysis } from "@/components/visualizer/deque/deque-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useDeque } from "@/hooks/use-deque"

interface DequeVisualizerProps {
  content: React.ReactNode
}

export function DequeVisualizer({ content }: DequeVisualizerProps) {
  const { 
    deque,
    operations,
    isAnimating,
    highlightedIndex,
    addFront,
    addRear,
    removeFront,
    removeRear,
    clear,
    isFull,
    isEmpty,
  } = useDeque()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Deque (Double-Ended Queue)</h1>
        <p className="text-muted-foreground">
          A queue that allows insertion and deletion at both ends.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <DequeControls 
                onAddFront={addFront}
                onAddRear={addRear}
                onRemoveFront={removeFront}
                onRemoveRear={removeRear}
                onClear={clear}
                isAnimating={isAnimating}
                isFull={isFull}
                isEmpty={isEmpty}
              />
              <DequeAnalysis operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <DequeDisplay 
                deque={deque}
                highlightedIndex={highlightedIndex}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

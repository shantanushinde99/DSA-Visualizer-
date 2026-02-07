"use client"

import { RBTreeControls } from "@/components/visualizer/red-black-tree/rb-tree-controls"
import { RBTreeDisplay } from "@/components/visualizer/red-black-tree/rb-tree-display"
import { RBTreeAnalysis } from "@/components/visualizer/red-black-tree/rb-tree-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useRedBlackTree } from "@/hooks/use-red-black-tree"

interface RBTreeVisualizerProps {
  content: React.ReactNode
}

export function RBTreeVisualizer({ content }: RBTreeVisualizerProps) {
  const { root, steps, currentStep, setCurrentStep, insert, reset } = useRedBlackTree()

  const currentStepData = steps[currentStep]
  const displayTree = currentStepData?.tree || root
  const highlightedNodes = currentStepData?.highlightedNodes || []

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Red-Black Tree</h1>
        <p className="text-muted-foreground">
          A self-balancing binary search tree with color properties ensuring O(log n) operations.
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
              <RBTreeControls 
                onInsert={insert}
                onReset={reset}
                isAnimating={false}
                currentStep={currentStep}
                totalSteps={steps.length}
                onStepChange={setCurrentStep}
                steps={steps}
              />
            </div>
            <div className="xl:col-span-2">
              <RBTreeDisplay 
                tree={displayTree}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <RBTreeAnalysis tree={displayTree} />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

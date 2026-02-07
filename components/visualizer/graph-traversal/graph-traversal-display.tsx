"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GraphTraversalDisplayProps {
  graphTraversal: ReturnType<typeof import("@/hooks/use-graph-traversal").useGraphTraversal>;
}

export function GraphTraversalDisplay({ graphTraversal }: GraphTraversalDisplayProps) {
  const { nodes, edges, steps, currentStep, traversalType, setCurrentStep } = graphTraversal;
  
  const currentStepData = steps[currentStep];
  const visitedNodes = currentStepData?.visited || [];
  const currentNode = currentStepData?.current;
  const queueOrStack = currentStepData?.queue || currentStepData?.stack || [];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {traversalType === "bfs" ? "BFS" : "DFS"} Visualization
          </h3>
          {steps.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* Graph Display */}
        <div className="relative h-96 bg-muted/20 rounded-lg border">
          {nodes.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Load an example graph to start
            </div>
          ) : (
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Draw Edges */}
              {edges.map((edge, idx) => {
                const fromNode = nodes.find((n) => n.id === edge.from);
                const toNode = nodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                return (
                  <line
                    key={idx}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                  />
                );
              })}

              {/* Draw Nodes */}
              {nodes.map((node) => {
                const isVisited = visitedNodes.includes(node.id);
                const isCurrent = currentNode === node.id;
                const isInQueue = queueOrStack.includes(node.id);

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="25"
                      className={cn(
                        "transition-all",
                        isCurrent && "fill-green-500 stroke-green-700",
                        !isCurrent && isVisited && "fill-blue-500 stroke-blue-700",
                        !isCurrent && !isVisited && isInQueue && "fill-yellow-500 stroke-yellow-700",
                        !isCurrent && !isVisited && !isInQueue && "fill-muted stroke-primary"
                      )}
                      strokeWidth="2"
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        "text-lg font-bold",
                        (isCurrent || isVisited || isInQueue) ? "fill-white" : "fill-foreground"
                      )}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span>{traversalType === "bfs" ? "In Queue" : "In Stack"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded-full border-2 border-primary" />
            <span>Unvisited</span>
          </div>
        </div>

        {/* Queue/Stack Visualization */}
        {steps.length > 0 && queueOrStack.length > 0 && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-medium mb-2">
              {traversalType === "bfs" ? "Queue (FIFO)" : "Stack (LIFO)"}
            </div>
            <div className="flex gap-2">
              {queueOrStack.map((nodeId, idx) => {
                const node = nodes.find((n) => n.id === nodeId);
                return (
                  <div
                    key={idx}
                    className="px-3 py-2 bg-yellow-500 text-white rounded font-mono font-bold"
                  >
                    {node?.label}
                  </div>
                );
              })}
            </div>
            {traversalType === "bfs" && (
              <div className="mt-2 text-xs text-muted-foreground">
                ← Dequeue from front | Enqueue to back →
              </div>
            )}
            {traversalType === "dfs" && (
              <div className="mt-2 text-xs text-muted-foreground">
                ← Push/Pop from top
              </div>
            )}
          </div>
        )}

        {/* Current Operation Description */}
        {currentStepData && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">{currentStepData.description}</p>
            <div className="mt-2 text-xs text-muted-foreground">
              Visited order: {visitedNodes.map((id) => nodes.find((n) => n.id === id)?.label).join(" → ")}
            </div>
          </div>
        )}

        {/* Step Navigation */}
        {steps.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentStep(0)}
              disabled={currentStep === 0}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              ⏮ First
            </button>
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              ⏪ Prev
            </button>
            <span className="text-sm text-muted-foreground px-4">
              {currentStep + 1} / {steps.length}
            </span>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Next ⏩
            </button>
            <button
              onClick={() => setCurrentStep(steps.length - 1)}
              disabled={currentStep === steps.length - 1}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Last ⏭
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

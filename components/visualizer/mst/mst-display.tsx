"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MSTDisplayProps {
  mst: ReturnType<typeof import("@/hooks/use-mst").useMST>;
}

export function MSTDisplay({ mst }: MSTDisplayProps) {
  const { graph, numVertices, steps, currentStep, setCurrentStep } = mst;
  const currentStepData = steps[currentStep];

  // Calculate positions for vertices in a circle
  const getVertexPosition = (index: number, total: number) => {
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    const radius = 120;
    const centerX = 200;
    const centerY = 200;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const renderGraph = () => {
    if (graph.length === 0 && !currentStepData) {
      return (
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          Generate a graph to visualize MST algorithms
        </div>
      );
    }

    const displayEdges = currentStepData?.edges || graph;
    const selectedEdges = currentStepData?.selectedEdges || [];
    const currentEdge = currentStepData?.currentEdge;

    return (
      <svg width="400" height="400" className="mx-auto">
        {/* Draw edges */}
        {displayEdges.map((edge, idx) => {
          const fromPos = getVertexPosition(edge.from, numVertices);
          const toPos = getVertexPosition(edge.to, numVertices);
          const isSelected = selectedEdges.some(
            (e) => (e.from === edge.from && e.to === edge.to) || (e.from === edge.to && e.to === edge.from)
          );
          const isCurrent =
            currentEdge &&
            ((currentEdge.from === edge.from && currentEdge.to === edge.to) ||
              (currentEdge.from === edge.to && currentEdge.to === edge.from));

          const midX = (fromPos.x + toPos.x) / 2;
          const midY = (fromPos.y + toPos.y) / 2;

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                className={cn(
                  "transition-all",
                  isSelected && "stroke-green-500 dark:stroke-green-400",
                  isCurrent && "stroke-blue-500 dark:stroke-blue-400",
                  !isSelected && !isCurrent && "stroke-gray-400 dark:stroke-gray-600"
                )}
                strokeWidth={isSelected ? 4 : isCurrent ? 3 : 2}
              />
              <circle cx={midX} cy={midY} r="15" className="fill-background stroke-border" strokeWidth="2" />
              <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dy="4"
                className={cn(
                  "text-xs font-bold",
                  isSelected && "fill-green-600 dark:fill-green-400",
                  isCurrent && "fill-blue-600 dark:fill-blue-400",
                  !isSelected && !isCurrent && "fill-foreground"
                )}
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Draw vertices */}
        {Array.from({ length: numVertices }).map((_, idx) => {
          const pos = getVertexPosition(idx, numVertices);
          return (
            <g key={`vertex-${idx}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="25"
                className="fill-blue-500 dark:fill-blue-600 stroke-border"
                strokeWidth="3"
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dy="5"
                className="text-white text-lg font-bold"
              >
                {idx}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Graph Visualization</h3>
          {steps.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* Graph Display */}
        <div className="flex justify-center p-4 bg-muted/20 rounded-lg">
          {renderGraph()}
        </div>

        {/* Current Action */}
        {currentStepData && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <div
                className={cn(
                  "px-2 py-1 rounded text-xs font-semibold uppercase",
                  currentStepData.action === "consider" && "bg-blue-500 text-white",
                  currentStepData.action === "add" && "bg-green-500 text-white",
                  currentStepData.action === "skip" && "bg-orange-500 text-white",
                  currentStepData.action === "complete" && "bg-green-600 text-white"
                )}
              >
                {currentStepData.action}
              </div>
              <div className="flex-1">
                <p className="text-sm">{currentStepData.description}</p>
                {currentStepData.action === "complete" && (
                  <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                    Total MST Cost: {currentStepData.totalCost}
                  </p>
                )}
              </div>
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

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-gray-400 dark:bg-gray-600 rounded" />
            <span>Graph Edge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-green-500 dark:bg-green-400 rounded" />
            <span>MST Edge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-blue-500 dark:bg-blue-400 rounded" />
            <span>Considering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              0
            </div>
            <span>Vertex</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

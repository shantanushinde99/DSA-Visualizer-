"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DPDisplayProps {
  dp: ReturnType<typeof import("@/hooks/use-dynamic-programming").useDynamicProgramming>;
}

export function DPDisplay({ dp }: DPDisplayProps) {
  const { steps, currentStep, result, setCurrentStep } = dp;
  const currentStepData = steps[currentStep];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">DP Table Visualization</h3>
          {steps.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* DP Table */}
        <div className="overflow-x-auto">
          {!currentStepData ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
              Select inputs and click solve to see DP table
            </div>
          ) : (
            <div className="inline-block min-w-full">
              <table className="border-collapse">
                <tbody>
                  {currentStepData.table.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => {
                        const isHighlighted = currentStepData.highlighted?.some(
                          ([hi, hj]) => hi === i && hj === j
                        );
                        const isHeader = i === 0 || j === 0;
                        
                        return (
                          <td
                            key={j}
                            className={cn(
                              "border-2 border-border p-3 text-center min-w-[50px] transition-all",
                              isHeader && "bg-muted font-bold",
                              !isHeader && !isHighlighted && "bg-background",
                              isHighlighted && "bg-blue-500 text-white font-bold scale-110"
                            )}
                          >
                            <div className="text-sm font-mono">
                              {cell === Infinity ? "∞" : cell}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Current Operation */}
        {currentStepData && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <div className={cn(
                "px-2 py-1 rounded text-xs font-semibold uppercase",
                currentStepData.action === "initialize" && "bg-purple-500 text-white",
                currentStepData.action === "compute" && "bg-blue-500 text-white",
                currentStepData.action === "match" && "bg-green-500 text-white",
                currentStepData.action === "nomatch" && "bg-yellow-500 text-white",
                currentStepData.action === "include" && "bg-green-500 text-white",
                currentStepData.action === "exclude" && "bg-orange-500 text-white",
                currentStepData.action === "update" && "bg-blue-500 text-white",
                currentStepData.action === "operation" && "bg-purple-500 text-white",
                currentStepData.action === "complete" && "bg-green-600 text-white"
              )}>
                {currentStepData.action}
              </div>
              <p className="flex-1 text-sm">{currentStepData.description}</p>
            </div>
            {result !== null && currentStep === steps.length - 1 && (
              <div className="mt-3 pt-3 border-t">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  Result: {result}
                </div>
              </div>
            )}
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
            <div className="w-4 h-4 bg-muted rounded border-2" />
            <span>Header</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span>Current Cell</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-background rounded border-2" />
            <span>Computed</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

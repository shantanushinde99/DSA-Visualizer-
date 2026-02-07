"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HashTableDisplayProps {
  hashTable: ReturnType<typeof import("@/hooks/use-hash-table").useHashTable>;
}

export function HashTableDisplay({ hashTable }: HashTableDisplayProps) {
  const { buckets, collisionMethod, steps, currentStep } = hashTable;
  
  const currentStepData = steps[currentStep];
  const highlightedIndices = currentStepData?.probeSequence || 
    (currentStepData?.hash !== undefined ? [currentStepData.hash] : []);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Hash Table ({collisionMethod})</h3>
          {currentStepData && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* Hash Table Buckets */}
        <div className="space-y-2">
          {buckets.map((bucket) => {
            const isHighlighted = highlightedIndices.includes(bucket.index);
            const isCurrent = currentStepData?.hash === bucket.index;
            
            return (
              <div
                key={bucket.index}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border-2 transition-all",
                  isHighlighted && "border-blue-500 bg-blue-50 dark:bg-blue-950",
                  isCurrent && "border-green-500 bg-green-50 dark:bg-green-950"
                )}
              >
                {/* Bucket Index */}
                <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/10 text-primary font-mono font-bold">
                  {bucket.index}
                </div>

                {/* Bucket Contents */}
                <div className="flex-1 min-h-[3rem] flex items-center">
                  {bucket.entries.length === 0 ? (
                    <span className="text-muted-foreground italic">Empty</span>
                  ) : collisionMethod === "chaining" ? (
                    // Chaining: Show linked entries
                    <div className="flex flex-wrap gap-2">
                      {bucket.entries.map((entry, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-mono">
                            {entry.key}: {entry.value}
                          </div>
                          {idx < bucket.entries.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Open Addressing: Single entry
                    <div className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-mono">
                      {bucket.entries[0].key}: {bucket.entries[0].value}
                    </div>
                  )}
                </div>

                {/* Hash Value Indicator */}
                {bucket.entries.length > 0 && (
                  <div className="text-xs text-muted-foreground font-mono self-center">
                    h={bucket.entries[0].hash}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Operation Description */}
        {currentStepData && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <div className={cn(
                "px-2 py-1 rounded text-xs font-semibold uppercase",
                currentStepData.action === "insert" && "bg-green-500 text-white",
                currentStepData.action === "update" && "bg-blue-500 text-white",
                currentStepData.action === "delete" && "bg-red-500 text-white",
                currentStepData.action === "found" && "bg-green-500 text-white",
                currentStepData.action === "not-found" && "bg-yellow-500 text-white",
                currentStepData.action === "hash" && "bg-purple-500 text-white",
                currentStepData.action === "probe" && "bg-orange-500 text-white",
                currentStepData.action === "error" && "bg-red-500 text-white"
              )}>
                {currentStepData.action}
              </div>
              <p className="flex-1 text-sm">{currentStepData.description}</p>
            </div>
            
            {currentStepData.probeSequence && currentStepData.probeSequence.length > 1 && (
              <div className="mt-2 text-xs text-muted-foreground">
                Probe sequence: {currentStepData.probeSequence.join(" → ")}
              </div>
            )}
          </div>
        )}

        {/* Step Navigation */}
        {steps.length > 0 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => hashTable.setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>
            <button
              onClick={() => hashTable.setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

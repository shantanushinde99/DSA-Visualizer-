"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SortingDisplayProps {
  sorting: ReturnType<typeof import("@/hooks/use-sorting").useSorting>;
}

export function SortingDisplay({ sorting }: SortingDisplayProps) {
  const { array, steps, currentStep, isAnimating, setCurrentStep, setIsAnimating } = sorting;
  const [speed, setSpeed] = useState(100);

  const currentStepData = steps[currentStep];
  const displayArray = currentStepData?.array || array;
  const maxValue = Math.max(...displayArray, 1);

  // Auto-play animation
  useEffect(() => {
    if (isAnimating && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentStep, steps.length, speed, setCurrentStep, setIsAnimating]);

  const getBarColor = (index: number) => {
    if (!currentStepData) return "bg-primary";
    
    if (currentStepData.sorted?.includes(index)) return "bg-green-500";
    if (currentStepData.swapping?.includes(index)) return "bg-red-500";
    if (currentStepData.comparing?.includes(index)) return "bg-yellow-500";
    if (currentStepData.pivot === index) return "bg-purple-500";
    
    return "bg-primary";
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Visualization</h3>
          {steps.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* Array Bars */}
        <div className="relative h-96 bg-muted/20 rounded-lg p-4 flex items-end justify-center gap-1">
          {displayArray.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Generate an array to start
            </div>
          ) : (
            displayArray.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1"
                style={{ width: `${Math.max(100 / displayArray.length, 8)}%` }}
              >
                <div className="text-xs font-mono text-center text-muted-foreground">
                  {value}
                </div>
                <div
                  className={cn(
                    "w-full rounded-t transition-all duration-200",
                    getBarColor(index)
                  )}
                  style={{
                    height: `${(value / maxValue) * 100}%`,
                    minHeight: "20px",
                  }}
                />
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span>Sorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded" />
            <span>Pivot</span>
          </div>
        </div>

        {/* Current Operation Description */}
        {currentStepData && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">{currentStepData.description}</p>
            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
              <span>Comparisons: {currentStepData.comparisons}</span>
              <span>Swaps: {currentStepData.swaps}</span>
            </div>
          </div>
        )}

        {/* Playback Controls */}
        {steps.length > 0 && (
          <div className="space-y-4">
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
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="px-4 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
              >
                {isAnimating ? "⏸ Pause" : "▶ Play"}
              </button>
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

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Animation Speed: {speed}ms
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

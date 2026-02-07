"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BacktrackingDisplayProps {
  backtrack: ReturnType<typeof import("@/hooks/use-backtracking").useBacktracking>;
}

export function BacktrackingDisplay({ backtrack }: BacktrackingDisplayProps) {
  const { problem, steps, currentStep, setCurrentStep } = backtrack;
  const currentStepData = steps[currentStep];

  const renderNQueensBoard = () => {
    if (!currentStepData) return null;
    const board = currentStepData.board;
    const n = board.length;

    return (
      <div className="inline-block">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {board.map((row, i) =>
            row.map((cell, j) => {
              const isQueen = cell === 1;
              const isHighlighted = currentStepData.row === i && currentStepData.col === j;
              const isChessWhite = (i + j) % 2 === 0;

              return (
                <div
                  key={`${i}-${j}`}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border transition-all text-2xl",
                    isChessWhite ? "bg-slate-200 dark:bg-slate-700" : "bg-slate-300 dark:bg-slate-800",
                    isHighlighted && "ring-4 ring-blue-500 scale-110"
                  )}
                >
                  {isQueen && "♛"}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderMazeBoard = () => {
    if (!currentStepData) return null;
    const board = currentStepData.board;
    const n = board.length;

    return (
      <div className="inline-block">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {board.map((row, i) =>
            row.map((cell, j) => {
              const isPath = cell === 1;
              const isStart = i === 0 && j === 0;
              const isEnd = i === n - 1 && j === n - 1;
              const isHighlighted = currentStepData.row === i && currentStepData.col === j;

              return (
                <div
                  key={`${i}-${j}`}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border transition-all text-xl",
                    !isPath && "bg-slate-800 dark:bg-slate-900",
                    isPath && "bg-green-500 dark:bg-green-600",
                    isStart && "bg-blue-500 dark:bg-blue-600",
                    isEnd && "bg-purple-500 dark:bg-purple-600",
                    isHighlighted && "ring-4 ring-yellow-400 scale-110"
                  )}
                >
                  {isStart && "🐭"}
                  {isEnd && "🧀"}
                  {isPath && !isStart && !isEnd && "→"}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderKnightBoard = () => {
    if (!currentStepData) return null;
    const board = currentStepData.board;
    const n = board.length;

    return (
      <div className="inline-block">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {board.map((row, i) =>
            row.map((cell, j) => {
              const moveNumber = cell;
              const isVisited = moveNumber !== -1;
              const isHighlighted = currentStepData.row === i && currentStepData.col === j;
              const isChessWhite = (i + j) % 2 === 0;

              return (
                <div
                  key={`${i}-${j}`}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border transition-all text-xs font-bold",
                    isChessWhite ? "bg-slate-200 dark:bg-slate-700" : "bg-slate-300 dark:bg-slate-800",
                    isVisited && "bg-green-500 dark:bg-green-600 text-white",
                    isHighlighted && "ring-4 ring-blue-500 scale-110 z-10"
                  )}
                >
                  {isVisited ? moveNumber + 1 : ""}
                  {isHighlighted && "♞"}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Backtracking Visualization</h3>
          {steps.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* Board Display */}
        <div className="flex justify-center p-8 bg-muted/20 rounded-lg overflow-auto">
          {!currentStepData ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Click solve to see backtracking in action
            </div>
          ) : (
            <div>
              {problem === "nqueens" && renderNQueensBoard()}
              {problem === "maze" && renderMazeBoard()}
              {problem === "knight" && renderKnightBoard()}
            </div>
          )}
        </div>

        {/* Current Action */}
        {currentStepData && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <div className={cn(
                "px-2 py-1 rounded text-xs font-semibold uppercase",
                currentStepData.action === "try" && "bg-blue-500 text-white",
                currentStepData.action === "place" && "bg-green-500 text-white",
                currentStepData.action === "move" && "bg-green-500 text-white",
                currentStepData.action === "backtrack" && "bg-orange-500 text-white",
                currentStepData.action === "success" && "bg-green-600 text-white",
                currentStepData.action === "fail" && "bg-red-500 text-white"
              )}>
                {currentStepData.action}
              </div>
              <p className="flex-1 text-sm">{currentStepData.description}</p>
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
          {problem === "nqueens" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center border bg-slate-200 dark:bg-slate-700 text-lg">♛</div>
                <span>Queen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border ring-4 ring-blue-500" />
                <span>Current Position</span>
              </div>
            </>
          )}
          {problem === "maze" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 flex items-center justify-center">🐭</div>
                <span>Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 flex items-center justify-center">🧀</div>
                <span>Goal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500" />
                <span>Path</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-800" />
                <span>Wall</span>
              </div>
            </>
          )}
          {problem === "knight" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center border bg-green-500 text-white text-xs">1</div>
                <span>Move Order</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border ring-4 ring-blue-500 flex items-center justify-center">♞</div>
                <span>Knight</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

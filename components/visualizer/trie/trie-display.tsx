"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import type { TrieNode } from "@/hooks/use-trie";

interface TrieDisplayProps {
  trie: ReturnType<typeof import("@/hooks/use-trie").useTrie>;
}

export function TrieDisplay({ trie }: TrieDisplayProps) {
  const { root, steps, currentStep, setCurrentStep } = trie;
  const currentStepData = steps[currentStep];

  const renderTrieTree = (node: TrieNode, x: number, y: number, spacing: number): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    const children = Array.from(node.children.entries());
    const totalWidth = children.length * spacing;
    const startX = x - totalWidth / 2;

    // Draw node
    const isHighlighted = currentStepData?.path?.includes(node.char) || currentStepData?.nodeId === node.id;
    elements.push(
      <g key={node.id}>
        <circle
          cx={x}
          cy={y}
          r="20"
          className={`transition-all ${
            isHighlighted ? "fill-blue-500 stroke-blue-700" : 
            node.isEndOfWord ? "fill-green-500 stroke-green-700" : 
            "fill-muted stroke-primary"
          }`}
          strokeWidth="2"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-sm font-bold ${
            isHighlighted || node.isEndOfWord ? "fill-white" : "fill-foreground"
          }`}
        >
          {node.char || "⌀"}
        </text>
        {node.isEndOfWord && (
          <circle
            cx={x + 15}
            cy={y - 15}
            r="5"
            className="fill-green-600"
          />
        )}
      </g>
    );

    // Draw children
    children.forEach(([char, child], index) => {
      const childX = startX + index * spacing + spacing / 2;
      const childY = y + 80;

      // Draw edge
      elements.push(
        <line
          key={`${node.id}-${child.id}`}
          x1={x}
          y1={y + 20}
          x2={childX}
          y2={childY - 20}
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
        />
      );

      // Recursively draw child
      elements.push(...renderTrieTree(child, childX, childY, spacing / 2));
    });

    return elements;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Trie Visualization</h3>
          {steps.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          )}
        </div>

        {/* Trie Tree */}
        <div className="relative h-96 bg-muted/20 rounded-lg border overflow-auto">
          {root.children.size === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Trie is empty - insert some words
            </div>
          ) : (
            <svg width="100%" height="600" className="min-w-full">
              {renderTrieTree(root, 400, 40, 600)}
            </svg>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <span>Current Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span>End of Word</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded-full border-2 border-primary" />
            <span>Internal Node</span>
          </div>
        </div>

        {/* Current Operation */}
        {currentStepData && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-medium mb-1">{currentStepData.action.toUpperCase()}</div>
            <p className="text-sm">{currentStepData.description}</p>
            {currentStepData.suggestions && currentStepData.suggestions.length > 0 && (
              <div className="mt-2">
                <div className="text-sm font-medium">Suggestions:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentStepData.suggestions.map((word, idx) => (
                    <span key={idx} className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step Navigation */}
        {steps.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 text-sm"
            >
              ⏪ Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 text-sm"
            >
              Next ⏩
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

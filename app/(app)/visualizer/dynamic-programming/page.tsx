"use client";

import { DPVisualizer } from "@/components/visualizer/dynamic-programming/dp-visualizer";

export default function DynamicProgrammingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Dynamic Programming</h1>
        <p className="text-muted-foreground text-lg">
          Solve complex problems by breaking them down into overlapping subproblems
        </p>
      </div>

      <DPVisualizer />
    </div>
  );
}

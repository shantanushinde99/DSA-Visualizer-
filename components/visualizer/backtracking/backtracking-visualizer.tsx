"use client";

import { useBacktracking } from "@/hooks/use-backtracking";
import { BacktrackingControls } from "./backtracking-controls";
import { BacktrackingDisplay } from "./backtracking-display";
import { BacktrackingAnalysis } from "./backtracking-analysis";

export function BacktrackingVisualizer() {
  const backtrack = useBacktracking();

  return (
    <div className="space-y-6">
      <BacktrackingControls backtrack={backtrack} />
      <BacktrackingDisplay backtrack={backtrack} />
      <BacktrackingAnalysis backtrack={backtrack} />
    </div>
  );
}

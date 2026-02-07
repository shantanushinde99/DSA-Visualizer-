"use client";

import { useDynamicProgramming } from "@/hooks/use-dynamic-programming";
import { DPControls } from "./dp-controls";
import { DPDisplay } from "./dp-display";
import { DPAnalysis } from "./dp-analysis";

export function DPVisualizer() {
  const dp = useDynamicProgramming();

  return (
    <div className="space-y-6">
      <DPControls dp={dp} />
      <DPDisplay dp={dp} />
      <DPAnalysis dp={dp} />
    </div>
  );
}

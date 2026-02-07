"use client";

import { useSorting } from "@/hooks/use-sorting";
import { SortingControls } from "./sorting-controls";
import { SortingDisplay } from "./sorting-display";
import { SortingAnalysis } from "./sorting-analysis";

export function SortingVisualizer() {
  const sorting = useSorting();

  return (
    <div className="space-y-6">
      <SortingControls sorting={sorting} />
      <SortingDisplay sorting={sorting} />
      <SortingAnalysis sorting={sorting} />
    </div>
  );
}

"use client";

import { useMST } from "@/hooks/use-mst";
import { MSTControls } from "./mst-controls";
import { MSTDisplay } from "./mst-display";
import { MSTAnalysis } from "./mst-analysis";

export function MSTVisualizer() {
  const mst = useMST();

  return (
    <div className="space-y-6">
      <MSTControls mst={mst} />
      <MSTDisplay mst={mst} />
      <MSTAnalysis mst={mst} />
    </div>
  );
}

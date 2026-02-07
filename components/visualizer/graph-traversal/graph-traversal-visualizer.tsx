"use client";

import { useGraphTraversal } from "@/hooks/use-graph-traversal";
import { GraphTraversalControls } from "./graph-traversal-controls";
import { GraphTraversalDisplay } from "./graph-traversal-display";
import { GraphTraversalAnalysis } from "./graph-traversal-analysis";

export function GraphTraversalVisualizer() {
  const graphTraversal = useGraphTraversal();

  return (
    <div className="space-y-6">
      <GraphTraversalControls graphTraversal={graphTraversal} />
      <GraphTraversalDisplay graphTraversal={graphTraversal} />
      <GraphTraversalAnalysis graphTraversal={graphTraversal} />
    </div>
  );
}

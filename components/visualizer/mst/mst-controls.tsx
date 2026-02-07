"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RefreshCw, RotateCcw } from "lucide-react";
import type { MSTAlgorithm } from "@/hooks/use-mst";

interface MSTControlsProps {
  mst: ReturnType<typeof import("@/hooks/use-mst").useMST>;
}

export function MSTControls({ mst }: MSTControlsProps) {
  const { algorithm, setAlgorithm, numVertices, setNumVertices, generateRandomGraph, solve, reset } = mst;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>MST Algorithm</Label>
          <Select value={algorithm} onValueChange={(value) => {
            setAlgorithm(value as MSTAlgorithm);
            reset();
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kruskal">Kruskal's Algorithm</SelectItem>
              <SelectItem value="prim">Prim's Algorithm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numVertices">Number of Vertices (4-8)</Label>
          <Input
            id="numVertices"
            type="number"
            min="4"
            max="8"
            value={numVertices}
            onChange={(e) => setNumVertices(parseInt(e.target.value) || 5)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => generateRandomGraph(numVertices)}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Random Graph
          </Button>
          <Button onClick={reset} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={solve} className="w-full" size="lg">
          <Play className="mr-2 h-5 w-5" />
          Find Minimum Spanning Tree
        </Button>

        <div className="pt-4 border-t text-sm text-muted-foreground space-y-2">
          <p className="font-medium">About MST</p>
          {algorithm === "kruskal" ? (
            <p>
              <strong>Kruskal's:</strong> Sort edges by weight, add smallest edge that doesn't create cycle (uses Union-Find)
            </p>
          ) : (
            <p>
              <strong>Prim's:</strong> Start from a vertex, repeatedly add minimum weight edge connecting MST to new vertex
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

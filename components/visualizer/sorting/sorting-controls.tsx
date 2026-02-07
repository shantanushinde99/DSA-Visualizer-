"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Shuffle, BarChart, TrendingUp, TrendingDown } from "lucide-react";
import type { SortingAlgorithm } from "@/hooks/use-sorting";

interface SortingControlsProps {
  sorting: ReturnType<typeof import("@/hooks/use-sorting").useSorting>;
}

export function SortingControls({ sorting }: SortingControlsProps) {
  const { algorithm, arraySize, setAlgorithm, generateRandomArray, generateSortedArray, generateReversedArray, sort } = sorting;

  const algorithms: { value: SortingAlgorithm; label: string }[] = [
    { value: "bubble", label: "Bubble Sort" },
    { value: "selection", label: "Selection Sort" },
    { value: "insertion", label: "Insertion Sort" },
    { value: "merge", label: "Merge Sort" },
    { value: "quick", label: "Quick Sort" },
    { value: "heap", label: "Heap Sort" },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Algorithm Selection */}
        <div className="space-y-2">
          <Label>Sorting Algorithm</Label>
          <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as SortingAlgorithm)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((alg) => (
                <SelectItem key={alg.value} value={alg.value}>
                  {alg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Array Size Input */}
        <div className="space-y-2">
          <Label htmlFor="arraySize">Array Size ({arraySize})</Label>
          <Input
            id="arraySize"
            type="range"
            min="5"
            max="50"
            value={arraySize}
            onChange={(e) => {
              const size = parseInt(e.target.value);
              generateRandomArray(size);
            }}
            className="cursor-pointer"
          />
        </div>

        {/* Array Generation Buttons */}
        <div className="space-y-2">
          <Label>Generate Array</Label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => generateRandomArray(arraySize)} variant="outline" size="sm">
              <Shuffle className="mr-2 h-4 w-4" />
              Random
            </Button>
            <Button onClick={() => generateSortedArray(arraySize)} variant="outline" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Sorted
            </Button>
            <Button onClick={() => generateReversedArray(arraySize)} variant="outline" size="sm">
              <TrendingDown className="mr-2 h-4 w-4" />
              Reversed
            </Button>
          </div>
        </div>

        {/* Sort Button */}
        <Button onClick={sort} className="w-full" size="lg" disabled={sorting.array.length === 0}>
          <Play className="mr-2 h-5 w-5" />
          Start Sorting
        </Button>

        {/* Algorithm Info */}
        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p className="font-medium mb-2">Algorithm Complexity:</p>
          {algorithm === "bubble" && (
            <div>
              <p>Time: O(n²) avg/worst, O(n) best</p>
              <p>Space: O(1)</p>
              <p className="mt-1 text-xs">Simple but slow for large arrays</p>
            </div>
          )}
          {algorithm === "selection" && (
            <div>
              <p>Time: O(n²) all cases</p>
              <p>Space: O(1)</p>
              <p className="mt-1 text-xs">Minimizes number of swaps</p>
            </div>
          )}
          {algorithm === "insertion" && (
            <div>
              <p>Time: O(n²) avg/worst, O(n) best</p>
              <p>Space: O(1)</p>
              <p className="mt-1 text-xs">Efficient for small or nearly sorted arrays</p>
            </div>
          )}
          {algorithm === "merge" && (
            <div>
              <p>Time: O(n log n) all cases</p>
              <p>Space: O(n)</p>
              <p className="mt-1 text-xs">Stable sort, predictable performance</p>
            </div>
          )}
          {algorithm === "quick" && (
            <div>
              <p>Time: O(n log n) avg, O(n²) worst</p>
              <p>Space: O(log n)</p>
              <p className="mt-1 text-xs">Fast in practice, good cache performance</p>
            </div>
          )}
          {algorithm === "heap" && (
            <div>
              <p>Time: O(n log n) all cases</p>
              <p>Space: O(1)</p>
              <p className="mt-1 text-xs">In-place, but not stable</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

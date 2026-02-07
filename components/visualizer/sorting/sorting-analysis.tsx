"use client";

import { Card } from "@/components/ui/card";
import type { SortingAlgorithm } from "@/hooks/use-sorting";

interface SortingAnalysisProps {
  sorting: ReturnType<typeof import("@/hooks/use-sorting").useSorting>;
}

export function SortingAnalysis({ sorting }: SortingAnalysisProps) {
  const { algorithm, steps, currentStep } = sorting;

  const currentStepData = steps[currentStep];
  const finalComparisons = steps[steps.length - 1]?.comparisons || 0;
  const finalSwaps = steps[steps.length - 1]?.swaps || 0;

  const getAlgorithmDetails = (alg: SortingAlgorithm) => {
    switch (alg) {
      case "bubble":
        return {
          name: "Bubble Sort",
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)",
          space: "O(1)",
          stable: "Yes",
          notes: [
            "Simple but inefficient for large datasets",
            "Best case occurs when array is already sorted",
            "Multiple passes through the array",
            "Each pass bubbles the largest element to the end",
          ],
        };
      case "selection":
        return {
          name: "Selection Sort",
          best: "O(n²)",
          average: "O(n²)",
          worst: "O(n²)",
          space: "O(1)",
          stable: "No",
          notes: [
            "Always makes the same number of comparisons",
            "Minimizes the number of swaps (O(n))",
            "Finds minimum element in each pass",
            "Not adaptive to input order",
          ],
        };
      case "insertion":
        return {
          name: "Insertion Sort",
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)",
          space: "O(1)",
          stable: "Yes",
          notes: [
            "Efficient for small or nearly sorted data",
            "Adaptive algorithm (faster for sorted input)",
            "Works like sorting playing cards",
            "Good for online sorting (data arrives over time)",
          ],
        };
      case "merge":
        return {
          name: "Merge Sort",
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
          space: "O(n)",
          stable: "Yes",
          notes: [
            "Divide and conquer algorithm",
            "Consistent O(n log n) performance",
            "Requires additional memory for merging",
            "Excellent for large datasets",
            "Used in Java's Arrays.sort() for objects",
          ],
        };
      case "quick":
        return {
          name: "Quick Sort",
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)",
          space: "O(log n)",
          stable: "No",
          notes: [
            "Divide and conquer algorithm",
            "Very fast in practice",
            "Worst case occurs with poor pivot selection",
            "In-place sorting (low memory overhead)",
            "Used in many standard library implementations",
          ],
        };
      case "heap":
        return {
          name: "Heap Sort",
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
          space: "O(1)",
          stable: "No",
          notes: [
            "Uses binary heap data structure",
            "Consistent O(n log n) performance",
            "In-place algorithm",
            "Not cache-friendly",
            "Slower than quick sort in practice",
          ],
        };
      default:
        return {
          name: "Unknown",
          best: "-",
          average: "-",
          worst: "-",
          space: "-",
          stable: "-",
          notes: [],
        };
    }
  };

  const details = getAlgorithmDetails(algorithm);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis - {details.name}</h3>
      
      <div className="space-y-6">
        {/* Real-time Metrics */}
        {steps.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Current Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {currentStepData?.comparisons || 0}
                </div>
                <div className="text-sm text-muted-foreground">Comparisons</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {currentStepData?.swaps || 0}
                </div>
                <div className="text-sm text-muted-foreground">Swaps/Moves</div>
              </div>
            </div>
            {currentStep === steps.length - 1 && (
              <div className="mt-2 text-sm text-muted-foreground">
                ✓ Sorting complete! Total operations: {finalComparisons + finalSwaps}
              </div>
            )}
          </div>
        )}

        {/* Time Complexity */}
        <div>
          <h4 className="font-medium mb-3">Time Complexity</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-green-600 dark:text-green-400">Best Case</div>
              <code className="text-lg">{details.best}</code>
            </div>
            <div>
              <div className="font-medium text-blue-600 dark:text-blue-400">Average Case</div>
              <code className="text-lg">{details.average}</code>
            </div>
            <div>
              <div className="font-medium text-orange-600 dark:text-orange-400">Worst Case</div>
              <code className="text-lg">{details.worst}</code>
            </div>
          </div>
        </div>

        {/* Space Complexity & Stability */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Space Complexity</h4>
            <code className="text-lg text-purple-600 dark:text-purple-400">{details.space}</code>
          </div>
          <div>
            <h4 className="font-medium mb-2">Stable</h4>
            <span className={`text-lg font-semibold ${details.stable === "Yes" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {details.stable}
            </span>
          </div>
        </div>

        {/* Algorithm Notes */}
        <div>
          <h4 className="font-medium mb-2">Key Points</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {details.notes.map((note, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Performance Comparison */}
        <div>
          <h4 className="font-medium mb-2">When to Use</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            {algorithm === "bubble" && (
              <p>Educational purposes, very small datasets, or when simplicity is priority</p>
            )}
            {algorithm === "selection" && (
              <p>When memory writes are expensive, small datasets, or when swap count matters</p>
            )}
            {algorithm === "insertion" && (
              <p>Small datasets, nearly sorted data, or online sorting scenarios</p>
            )}
            {algorithm === "merge" && (
              <p>Large datasets, when stable sort is required, or guaranteed O(n log n) needed</p>
            )}
            {algorithm === "quick" && (
              <p>General purpose sorting, large datasets, when average performance matters most</p>
            )}
            {algorithm === "heap" && (
              <p>When worst-case O(n log n) needed with O(1) space, priority queue operations</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

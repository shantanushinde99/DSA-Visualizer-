"use client";

import { Card } from "@/components/ui/card";
import type { DPProblem } from "@/hooks/use-dynamic-programming";

interface DPAnalysisProps {
  dp: ReturnType<typeof import("@/hooks/use-dynamic-programming").useDynamicProgramming>;
}

export function DPAnalysis({ dp }: DPAnalysisProps) {
  const { problem } = dp;

  const getProblemDetails = (prob: DPProblem) => {
    switch (prob) {
      case "fibonacci":
        return {
          name: "Fibonacci Number",
          time: "O(n)",
          space: "O(n)",
          approach: "Tabulation (Bottom-up)",
          recurrence: "F(n) = F(n-1) + F(n-2)",
          notes: [
            "Classic DP intro problem",
            "Overlapping subproblems",
            "Can be optimized to O(1) space",
            "Two base cases: F(0)=0, F(1)=1",
          ],
        };
      case "lcs":
        return {
          name: "Longest Common Subsequence",
          time: "O(m × n)",
          space: "O(m × n)",
          approach: "2D DP Table",
          recurrence: "LCS[i][j] = LCS[i-1][j-1] + 1 if match, else max(LCS[i-1][j], LCS[i][j-1])",
          notes: [
            "Used in diff tools (git diff)",
            "Sequence alignment in bioinformatics",
            "Can reconstruct actual sequence",
            "Space can be optimized to O(min(m,n))",
          ],
        };
      case "knapsack":
        return {
          name: "0/1 Knapsack",
          time: "O(n × W)",
          space: "O(n × W)",
          approach: "2D DP Table",
          recurrence: "dp[i][w] = max(value[i] + dp[i-1][w-weight[i]], dp[i-1][w])",
          notes: [
            "Classic optimization problem",
            "Each item: include or exclude",
            "NP-complete for general case",
            "Pseudo-polynomial time algorithm",
          ],
        };
      case "coinChange":
        return {
          name: "Coin Change (Min Coins)",
          time: "O(n × amount)",
          space: "O(amount)",
          approach: "1D DP Array",
          recurrence: "dp[i] = min(dp[i], dp[i-coin] + 1) for each coin",
          notes: [
            "Unbounded knapsack variant",
            "Greedy doesn't always work",
            "Can track coin combinations",
            "Related to making change problem",
          ],
        };
      case "editDistance":
        return {
          name: "Edit Distance (Levenshtein)",
          time: "O(m × n)",
          space: "O(m × n)",
          approach: "2D DP Table",
          recurrence: "dp[i][j] = min(insert, delete, replace) + 1",
          notes: [
            "Measures string similarity",
            "Used in spell checkers",
            "DNA sequence alignment",
            "3 operations: insert, delete, replace",
          ],
        };
    }
  };

  const details = getProblemDetails(problem);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis - {details.name}</h3>
      
      <div className="space-y-6">
        {/* Complexity */}
        <div>
          <h4 className="font-medium mb-3">Complexity</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Time Complexity</div>
              <code className="text-lg text-blue-600 dark:text-blue-400">{details.time}</code>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Space Complexity</div>
              <code className="text-lg text-purple-600 dark:text-purple-400">{details.space}</code>
            </div>
          </div>
        </div>

        {/* Approach */}
        <div>
          <h4 className="font-medium mb-2">Approach</h4>
          <p className="text-sm text-muted-foreground">{details.approach}</p>
        </div>

        {/* Recurrence Relation */}
        <div>
          <h4 className="font-medium mb-2">Recurrence Relation</h4>
          <code className="text-sm bg-muted p-2 rounded block overflow-x-auto">
            {details.recurrence}
          </code>
        </div>

        {/* Key Points */}
        <div>
          <h4 className="font-medium mb-2">Key Points</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {details.notes.map((note, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DP Fundamentals */}
        <div>
          <h4 className="font-medium mb-2">Dynamic Programming Concepts</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Optimal Substructure:</span> Solution can be constructed from optimal solutions of subproblems
            </div>
            <div>
              <span className="font-medium text-foreground">Overlapping Subproblems:</span> Same subproblems solved multiple times
            </div>
            <div>
              <span className="font-medium text-foreground">Memoization (Top-down):</span> Store results of expensive function calls
            </div>
            <div>
              <span className="font-medium text-foreground">Tabulation (Bottom-up):</span> Build table iteratively from base cases
            </div>
          </div>
        </div>

        {/* When to Use DP */}
        <div>
          <h4 className="font-medium mb-2">When to Use Dynamic Programming</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✅ Problem has optimal substructure</li>
            <li>✅ Overlapping subproblems exist</li>
            <li>✅ Can identify recurrence relation</li>
            <li>✅ Need to optimize time at cost of space</li>
            <li>✅ Brute force has exponential time</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

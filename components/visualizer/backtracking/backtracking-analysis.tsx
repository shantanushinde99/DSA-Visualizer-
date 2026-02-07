"use client";

import { Card } from "@/components/ui/card";
import type { BacktrackProblem } from "@/hooks/use-backtracking";

interface BacktrackingAnalysisProps {
  backtrack: ReturnType<typeof import("@/hooks/use-backtracking").useBacktracking>;
}

export function BacktrackingAnalysis({ backtrack }: BacktrackingAnalysisProps) {
  const { problem, steps, solved } = backtrack;

  const getProblemDetails = (prob: BacktrackProblem) => {
    switch (prob) {
      case "nqueens":
        return {
          name: "N-Queens Problem",
          time: "O(N!)",
          space: "O(N²)",
          description: "Place N chess queens on N×N board so no two queens attack each other",
          constraints: [
            "No two queens in same row",
            "No two queens in same column",
            "No two queens in same diagonal"
          ],
          approach: "Try placing queens row by row, backtrack when no valid position exists",
          applications: [
            "Constraint satisfaction problems",
            "Combinatorial optimization",
            "Teaching backtracking concepts",
            "Chess puzzle variations"
          ]
        };
      case "maze":
        return {
          name: "Rat in a Maze",
          time: "O(2^(N²))",
          space: "O(N²)",
          description: "Find path from top-left to bottom-right in a maze",
          constraints: [
            "Can only move right or down",
            "Cannot pass through walls (0s)",
            "Must stay within maze bounds"
          ],
          approach: "Try all valid moves recursively, backtrack if path leads to dead end",
          applications: [
            "Robotics path planning",
            "Game AI navigation",
            "Puzzle solving",
            "Maze generation algorithms"
          ]
        };
      case "knight":
        return {
          name: "Knight's Tour",
          time: "O(8^(N²))",
          space: "O(N²)",
          description: "Visit every square on chess board exactly once using knight moves",
          constraints: [
            "Knight moves in L-shape (2+1 squares)",
            "Each square visited exactly once",
            "Must return to start (closed tour) or not (open tour)"
          ],
          approach: "Try all 8 possible knight moves, backtrack when stuck",
          applications: [
            "Chess endgame puzzles",
            "Circuit board drilling optimization",
            "Graph Hamiltonian path problems",
            "Recreational mathematics"
          ]
        };
      default:
        return {
          name: "Unknown Problem",
          time: "N/A",
          space: "N/A",
          description: "Unknown problem type",
          constraints: [],
          approach: "",
          applications: []
        };
    }
  };

  const details = getProblemDetails(problem);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis - {details.name}</h3>
      
      <div className="space-y-6">
        {/* Problem Description */}
        <div>
          <h4 className="font-medium mb-2">Problem</h4>
          <p className="text-sm text-muted-foreground">{details.description}</p>
        </div>

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

        {/* Constraints */}
        <div>
          <h4 className="font-medium mb-2">Constraints</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {details.constraints.map((constraint, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Approach */}
        <div>
          <h4 className="font-medium mb-2">Backtracking Approach</h4>
          <p className="text-sm text-muted-foreground">{details.approach}</p>
        </div>

        {/* Statistics */}
        {steps.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Execution Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Steps:</span>{" "}
                <span className="font-bold">{steps.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Solution Found:</span>{" "}
                <span className={solved ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {solved ? "Yes ✓" : "No ✗"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Backtracks:</span>{" "}
                <span className="font-bold">
                  {steps.filter(s => s.action === "backtrack").length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Attempts:</span>{" "}
                <span className="font-bold">
                  {steps.filter(s => s.action === "try" || s.action === "place").length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Applications */}
        <div>
          <h4 className="font-medium mb-2">Real-world Applications</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {details.applications.map((app, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Backtracking Template */}
        <div>
          <h4 className="font-medium mb-2">General Backtracking Pattern</h4>
          <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`function backtrack(state):
    if isGoal(state):
        return solution
    
    for each choice in choices:
        if isValid(choice):
            makeChoice(choice)
            result = backtrack(newState)
            if result != null:
                return result
            undoChoice(choice)  // Backtrack!
    
    return null  // No solution found`}
          </pre>
        </div>

        {/* Key Concepts */}
        <div>
          <h4 className="font-medium mb-2">Key Concepts</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Decision Tree:</span> Each decision creates a branch in solution space
            </div>
            <div>
              <span className="font-medium text-foreground">Pruning:</span> Abandon branches that violate constraints early
            </div>
            <div>
              <span className="font-medium text-foreground">State Space:</span> All possible configurations of the problem
            </div>
            <div>
              <span className="font-medium text-foreground">Backtracking:</span> Undo last choice when path leads nowhere
            </div>
          </div>
        </div>

        {/* Optimization Tips */}
        <div>
          <h4 className="font-medium mb-2">Optimization Techniques</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✓ Constraint checking before recursion (fail fast)</li>
            <li>✓ Heuristics to try most promising choices first</li>
            <li>✓ Memoization for overlapping subproblems</li>
            <li>✓ Iterative deepening for memory constraints</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

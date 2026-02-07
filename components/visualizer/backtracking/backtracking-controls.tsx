"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw } from "lucide-react";
import type { BacktrackProblem } from "@/hooks/use-backtracking";

interface BacktrackingControlsProps {
  backtrack: ReturnType<typeof import("@/hooks/use-backtracking").useBacktracking>;
}

export function BacktrackingControls({ backtrack }: BacktrackingControlsProps) {
  const { problem, setProblem, solveNQueens, solveRatInMaze, solveKnightTour, reset } = backtrack;
  
  const [nQueensN, setNQueensN] = useState("4");
  const [knightN, setKnightN] = useState("5");
  const [mazeSize, setMazeSize] = useState("5");

  // Generate a random maze
  const generateMaze = (size: number): number[][] => {
    const maze: number[][] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        // 70% chance of being open path
        row.push(Math.random() < 0.7 ? 1 : 0);
      }
      maze.push(row);
    }
    // Ensure start and end are open
    maze[0][0] = 1;
    maze[size - 1][size - 1] = 1;
    return maze;
  };

  const handleSolve = () => {
    switch (problem) {
      case "nqueens":
        const n = parseInt(nQueensN) || 4;
        if (n >= 4 && n <= 8) {
          solveNQueens(n);
        }
        break;
      case "maze":
        const size = parseInt(mazeSize) || 5;
        const maze = generateMaze(size);
        solveRatInMaze(maze);
        break;
      case "knight":
        const kn = parseInt(knightN) || 5;
        if (kn >= 5 && kn <= 6) {
          solveKnightTour(kn);
        }
        break;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Backtracking Problem</Label>
          <Select value={problem} onValueChange={(value) => {
            setProblem(value as BacktrackProblem);
            reset();
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nqueens">N-Queens</SelectItem>
              <SelectItem value="maze">Rat in a Maze</SelectItem>
              <SelectItem value="knight">Knight's Tour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problem-specific inputs */}
        {problem === "nqueens" && (
          <div className="space-y-2">
            <Label htmlFor="nQueensN">Board Size (4-8)</Label>
            <Input
              id="nQueensN"
              type="number"
              min="4"
              max="8"
              value={nQueensN}
              onChange={(e) => setNQueensN(e.target.value)}
              placeholder="e.g., 4"
            />
            <p className="text-xs text-muted-foreground">
              Classic problem: place N queens on N×N board with no attacks
            </p>
          </div>
        )}

        {problem === "maze" && (
          <div className="space-y-2">
            <Label htmlFor="mazeSize">Maze Size (4-8)</Label>
            <Input
              id="mazeSize"
              type="number"
              min="4"
              max="8"
              value={mazeSize}
              onChange={(e) => setMazeSize(e.target.value)}
              placeholder="e.g., 5"
            />
            <p className="text-xs text-muted-foreground">
              Find path from top-left to bottom-right. Random maze will be generated.
            </p>
          </div>
        )}

        {problem === "knight" && (
          <div className="space-y-2">
            <Label htmlFor="knightN">Board Size (5-6 recommended)</Label>
            <Input
              id="knightN"
              type="number"
              min="5"
              max="6"
              value={knightN}
              onChange={(e) => setKnightN(e.target.value)}
              placeholder="e.g., 5"
            />
            <p className="text-xs text-muted-foreground">
              Visit every square exactly once with knight moves. Warning: Can be slow!
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleSolve} className="flex-1" size="lg">
            <Play className="mr-2 h-5 w-5" />
            Solve with Backtracking
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p className="font-medium mb-2">About Backtracking</p>
          <p>
            Backtracking explores all possible solutions by building candidates incrementally
            and abandoning ("backtracking") those that fail to satisfy constraints.
          </p>
        </div>
      </div>
    </Card>
  );
}

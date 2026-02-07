import { useState, useCallback } from "react";

export type BacktrackProblem = "nqueens" | "sudoku" | "maze" | "knight";

export interface BacktrackStep {
  board: number[][];
  row?: number;
  col?: number;
  action: "place" | "try" | "backtrack" | "success" | "fail" | "move";
  description: string;
  placed?: [number, number][]; // Positions of placed items
}

export function useBacktracking() {
  const [problem, setProblem] = useState<BacktrackProblem>("nqueens");
  const [steps, setSteps] = useState<BacktrackStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [solved, setSolved] = useState(false);

  // N-Queens Problem
  const solveNQueens = useCallback((n: number) => {
    const newSteps: BacktrackStep[] = [];
    const board: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    const placed: [number, number][] = [];

    const isSafe = (row: number, col: number): boolean => {
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }

      // Check upper left diagonal
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }

      // Check upper right diagonal
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false;
      }

      return true;
    };

    const solve = (row: number): boolean => {
      if (row === n) {
        newSteps.push({
          board: board.map(r => [...r]),
          action: "success",
          description: `✅ Found solution! Placed all ${n} queens.`,
          placed: [...placed],
        });
        return true;
      }

      for (let col = 0; col < n; col++) {
        newSteps.push({
          board: board.map(r => [...r]),
          row,
          col,
          action: "try",
          description: `Trying to place queen at row ${row}, col ${col}`,
          placed: [...placed],
        });

        if (isSafe(row, col)) {
          board[row][col] = 1;
          placed.push([row, col]);

          newSteps.push({
            board: board.map(r => [...r]),
            row,
            col,
            action: "place",
            description: `✓ Placed queen at (${row}, ${col}) - position is safe`,
            placed: [...placed],
          });

          if (solve(row + 1)) {
            return true;
          }

          // Backtrack
          board[row][col] = 0;
          placed.pop();

          newSteps.push({
            board: board.map(r => [...r]),
            row,
            col,
            action: "backtrack",
            description: `✗ Backtracking from (${row}, ${col}) - dead end reached`,
            placed: [...placed],
          });
        } else {
          newSteps.push({
            board: board.map(r => [...r]),
            row,
            col,
            action: "fail",
            description: `✗ Cannot place queen at (${row}, ${col}) - position attacked`,
            placed: [...placed],
          });
        }
      }

      return false;
    };

    newSteps.push({
      board: board.map(r => [...r]),
      action: "try",
      description: `Starting N-Queens problem for ${n}×${n} board`,
      placed: [],
    });

    const found = solve(0);
    
    if (!found) {
      newSteps.push({
        board: board.map(r => [...r]),
        action: "fail",
        description: `No solution exists for ${n}×${n} board`,
        placed: [],
      });
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setSolved(found);
  }, []);

  // Rat in a Maze
  const solveRatInMaze = useCallback((maze: number[][]) => {
    const n = maze.length;
    const newSteps: BacktrackStep[] = [];
    const solution: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    const path: [number, number][] = [];

    const isSafe = (x: number, y: number): boolean => {
      return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1 && solution[x][y] === 0;
    };

    const solve = (x: number, y: number): boolean => {
      if (x === n - 1 && y === n - 1 && maze[x][y] === 1) {
        solution[x][y] = 1;
        path.push([x, y]);
        newSteps.push({
          board: solution.map(r => [...r]),
          row: x,
          col: y,
          action: "success",
          description: `🎯 Reached destination at (${x}, ${y})!`,
          placed: [...path],
        });
        return true;
      }

      if (isSafe(x, y)) {
        newSteps.push({
          board: solution.map(r => [...r]),
          row: x,
          col: y,
          action: "try",
          description: `Trying cell (${x}, ${y})`,
          placed: [...path],
        });

        solution[x][y] = 1;
        path.push([x, y]);

        newSteps.push({
          board: solution.map(r => [...r]),
          row: x,
          col: y,
          action: "move",
          description: `Moving to (${x}, ${y})`,
          placed: [...path],
        });

        // Try moving right
        if (solve(x, y + 1)) return true;

        // Try moving down
        if (solve(x + 1, y)) return true;

        // Backtrack
        solution[x][y] = 0;
        path.pop();

        newSteps.push({
          board: solution.map(r => [...r]),
          row: x,
          col: y,
          action: "backtrack",
          description: `Backtracking from (${x}, ${y})`,
          placed: [...path],
        });

        return false;
      }

      return false;
    };

    newSteps.push({
      board: solution.map(r => [...r]),
      action: "try",
      description: `Starting Rat in Maze - find path from (0,0) to (${n-1},${n-1})`,
      placed: [],
    });

    const found = solve(0, 0);

    if (!found) {
      newSteps.push({
        board: solution.map(r => [...r]),
        action: "fail",
        description: `No path exists from start to destination`,
        placed: [],
      });
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setSolved(found);
  }, []);

  // Knight's Tour
  const solveKnightTour = useCallback((n: number, startX: number = 0, startY: number = 0) => {
    const newSteps: BacktrackStep[] = [];
    const board: number[][] = Array(n).fill(0).map(() => Array(n).fill(-1));
    const path: [number, number][] = [];

    // Knight moves: 8 possible moves
    const dx = [2, 1, -1, -2, -2, -1, 1, 2];
    const dy = [1, 2, 2, 1, -1, -2, -2, -1];

    const isSafe = (x: number, y: number): boolean => {
      return x >= 0 && x < n && y >= 0 && y < n && board[x][y] === -1;
    };

    const solve = (x: number, y: number, moveCount: number): boolean => {
      board[x][y] = moveCount;
      path.push([x, y]);

      newSteps.push({
        board: board.map(r => [...r]),
        row: x,
        col: y,
        action: "move",
        description: `Move ${moveCount + 1}: Knight at (${x}, ${y})`,
        placed: [...path],
      });

      if (moveCount === n * n - 1) {
        newSteps.push({
          board: board.map(r => [...r]),
          action: "success",
          description: `✅ Knight's Tour completed! Visited all ${n * n} squares.`,
          placed: [...path],
        });
        return true;
      }

      // Try all 8 possible knight moves
      for (let i = 0; i < 8; i++) {
        const nextX = x + dx[i];
        const nextY = y + dy[i];

        if (isSafe(nextX, nextY)) {
          if (solve(nextX, nextY, moveCount + 1)) {
            return true;
          }
        }
      }

      // Backtrack
      board[x][y] = -1;
      path.pop();

      newSteps.push({
        board: board.map(r => [...r]),
        row: x,
        col: y,
        action: "backtrack",
        description: `Backtracking from (${x}, ${y}) - no valid moves`,
        placed: [...path],
      });

      return false;
    };

    newSteps.push({
      board: board.map(r => [...r]),
      action: "try",
      description: `Starting Knight's Tour from (${startX}, ${startY}) on ${n}×${n} board`,
      placed: [],
    });

    const found = solve(startX, startY, 0);

    if (!found) {
      newSteps.push({
        board: board.map(r => [...r]),
        action: "fail",
        description: `No Knight's Tour exists from this starting position`,
        placed: [],
      });
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setSolved(found);
  }, []);

  const reset = useCallback(() => {
    setSteps([]);
    setCurrentStep(0);
    setSolved(false);
    setIsAnimating(false);
  }, []);

  return {
    problem,
    setProblem,
    steps,
    currentStep,
    setCurrentStep,
    isAnimating,
    setIsAnimating,
    solved,
    solveNQueens,
    solveRatInMaze,
    solveKnightTour,
    reset,
  };
}

import { useState, useCallback } from "react";

export type DPProblem = "fibonacci" | "lcs" | "knapsack" | "coinChange" | "editDistance";

export interface DPStep {
  action: string;
  description: string;
  table: (number | string)[][];
  highlighted?: [number, number][];
  result?: number | string;
}

export function useDynamicProgramming() {
  const [problem, setProblem] = useState<DPProblem>("fibonacci");
  const [steps, setSteps] = useState<DPStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<number | string | null>(null);

  // Fibonacci
  const solveFibonacci = useCallback((n: number) => {
    const steps: DPStep[] = [];
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 0;
    if (n > 0) dp[1] = 1;

    steps.push({
      action: "initialize",
      description: `Computing Fibonacci(${n}) using Dynamic Programming`,
      table: [[0, ...dp]],
    });

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      steps.push({
        action: "compute",
        description: `F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
        table: [[0, ...dp.slice(0, i + 1)]],
        highlighted: [[0, i]],
      });
    }

    steps.push({
      action: "complete",
      description: `Fibonacci(${n}) = ${dp[n]}`,
      table: [[0, ...dp]],
      result: dp[n],
    });

    setSteps(steps);
    setCurrentStep(0);
    setResult(dp[n]);
  }, []);

  // Longest Common Subsequence
  const solveLCS = useCallback((str1: string, str2: string) => {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    const steps: DPStep[] = [];

    // Initialize
    const table = dp.map(row => [...row]);
    steps.push({
      action: "initialize",
      description: `Finding LCS of "${str1}" and "${str2}"`,
      table: [["", "", ...str2.split("")], ["", ...table[0]], ...str1.split("").map((c, i) => [c, ...table[i + 1]])],
    });

    // Fill table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          steps.push({
            action: "match",
            description: `Characters match: "${str1[i-1]}" = "${str2[j-1]}", dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`,
            table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, idx) => [c, ...dp[idx + 1]])],
            highlighted: [[i, j + 1]],
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          steps.push({
            action: "nomatch",
            description: `No match, dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = ${dp[i][j]}`,
            table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, idx) => [c, ...dp[idx + 1]])],
            highlighted: [[i, j + 1]],
          });
        }
      }
    }

    steps.push({
      action: "complete",
      description: `LCS length = ${dp[m][n]}`,
      table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, idx) => [c, ...dp[idx + 1]])],
      result: dp[m][n],
    });

    setSteps(steps);
    setCurrentStep(0);
    setResult(dp[m][n]);
  }, []);

  // 0/1 Knapsack
  const solveKnapsack = useCallback((weights: number[], values: number[], capacity: number) => {
    const n = weights.length;
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
    const steps: DPStep[] = [];

    steps.push({
      action: "initialize",
      description: `Solving 0/1 Knapsack with capacity ${capacity}`,
      table: [["Item\\Weight", ...Array.from({length: capacity + 1}, (_, i) => i.toString())],
              ...Array.from({length: n + 1}, (_, i) => [i === 0 ? "0" : `${i}(w=${weights[i-1]},v=${values[i-1]})`, ...dp[i]])],
    });

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
          steps.push({
            action: "include",
            description: `Item ${i}: Can include. dp[${i}][${w}] = max(${values[i-1]} + dp[${i-1}][${w-weights[i-1]}], dp[${i-1}][${w}]) = ${dp[i][w]}`,
            table: [["Item\\Weight", ...Array.from({length: capacity + 1}, (_, i) => i.toString())],
                    ...Array.from({length: n + 1}, (_, idx) => [idx === 0 ? "0" : `${idx}(w=${weights[idx-1]},v=${values[idx-1]})`, ...dp[idx]])],
            highlighted: [[i, w]],
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          steps.push({
            action: "exclude",
            description: `Item ${i}: Too heavy. dp[${i}][${w}] = dp[${i-1}][${w}] = ${dp[i][w]}`,
            table: [["Item\\Weight", ...Array.from({length: capacity + 1}, (_, i) => i.toString())],
                    ...Array.from({length: n + 1}, (_, idx) => [idx === 0 ? "0" : `${idx}(w=${weights[idx-1]},v=${values[idx-1]})`, ...dp[idx]])],
            highlighted: [[i, w]],
          });
        }
      }
    }

    steps.push({
      action: "complete",
      description: `Maximum value = ${dp[n][capacity]}`,
      table: [["Item\\Weight", ...Array.from({length: capacity + 1}, (_, i) => i.toString())],
              ...Array.from({length: n + 1}, (_, i) => [i === 0 ? "0" : `${i}(w=${weights[i-1]},v=${values[i-1]})`, ...dp[i]])],
      result: dp[n][capacity],
    });

    setSteps(steps);
    setCurrentStep(0);
    setResult(dp[n][capacity]);
  }, []);

  // Coin Change
  const solveCoinChange = useCallback((coins: number[], amount: number) => {
    const dp: number[] = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    const steps: DPStep[] = [];

    steps.push({
      action: "initialize",
      description: `Finding minimum coins to make amount ${amount}`,
      table: [[0, ...dp.slice(0, amount + 1).map(v => v === Infinity ? "∞" : v)]],
    });

    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (coin <= i) {
          const prev = dp[i];
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
          if (dp[i] !== prev) {
            steps.push({
              action: "update",
              description: `Amount ${i}: Using coin ${coin}, dp[${i}] = min(${prev === Infinity ? "∞" : prev}, dp[${i-coin}] + 1) = ${dp[i]}`,
              table: [[0, ...dp.map(v => v === Infinity ? "∞" : v)]],
              highlighted: [[0, i]],
            });
          }
        }
      }
    }

    steps.push({
      action: "complete",
      description: `Minimum coins = ${dp[amount] === Infinity ? "Not possible" : dp[amount]}`,
      table: [[0, ...dp.map(v => v === Infinity ? "∞" : v)]],
      result: dp[amount] === Infinity ? "Not possible" : dp[amount],
    });

    setSteps(steps);
    setCurrentStep(0);
    setResult(dp[amount] === Infinity ? "Not possible" : dp[amount]);
  }, []);

  // Edit Distance
  const solveEditDistance = useCallback((str1: string, str2: string) => {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    const steps: DPStep[] = [];

    // Initialize
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    steps.push({
      action: "initialize",
      description: `Computing edit distance between "${str1}" and "${str2}"`,
      table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, i) => [c, ...dp[i + 1]])],
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push({
            action: "match",
            description: `Match: dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${dp[i][j]}`,
            table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, idx) => [c, ...dp[idx + 1]])],
            highlighted: [[i, j + 1]],
          });
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          steps.push({
            action: "operation",
            description: `No match: dp[${i}][${j}] = 1 + min(delete, insert, replace) = ${dp[i][j]}`,
            table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, idx) => [c, ...dp[idx + 1]])],
            highlighted: [[i, j + 1]],
          });
        }
      }
    }

    steps.push({
      action: "complete",
      description: `Edit distance = ${dp[m][n]}`,
      table: [["", "", ...str2.split("")], ["", ...dp[0]], ...str1.split("").map((c, idx) => [c, ...dp[idx + 1]])],
      result: dp[m][n],
    });

    setSteps(steps);
    setCurrentStep(0);
    setResult(dp[m][n]);
  }, []);

  return {
    problem,
    steps,
    currentStep,
    result,
    setProblem,
    setCurrentStep,
    solveFibonacci,
    solveLCS,
    solveKnapsack,
    solveCoinChange,
    solveEditDistance,
  };
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Grid3x3 } from "lucide-react";
import type { DPProblem } from "@/hooks/use-dynamic-programming";

interface DPControlsProps {
  dp: ReturnType<typeof import("@/hooks/use-dynamic-programming").useDynamicProgramming>;
}

export function DPControls({ dp }: DPControlsProps) {
  const { problem, setProblem, solveFibonacci, solveLCS, solveKnapsack, solveCoinChange, solveEditDistance } = dp;
  
  const [fibN, setFibN] = useState("10");
  const [lcsStr1, setLcsStr1] = useState("ABCDGH");
  const [lcsStr2, setLcsStr2] = useState("AEDFHR");
  const [ksWeights, setKsWeights] = useState("2,3,4,5");
  const [ksValues, setKsValues] = useState("3,4,5,6");
  const [ksCapacity, setKsCapacity] = useState("8");
  const [ccCoins, setCcCoins] = useState("1,2,5");
  const [ccAmount, setCcAmount] = useState("11");
  const [edStr1, setEdStr1] = useState("kitten");
  const [edStr2, setEdStr2] = useState("sitting");

  const handleSolve = () => {
    switch (problem) {
      case "fibonacci":
        solveFibonacci(parseInt(fibN) || 10);
        break;
      case "lcs":
        solveLCS(lcsStr1, lcsStr2);
        break;
      case "knapsack":
        const weights = ksWeights.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        const values = ksValues.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        if (weights.length === values.length && weights.length > 0) {
          solveKnapsack(weights, values, parseInt(ksCapacity) || 0);
        }
        break;
      case "coinChange":
        const coins = ccCoins.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        if (coins.length > 0) {
          solveCoinChange(coins, parseInt(ccAmount) || 0);
        }
        break;
      case "editDistance":
        solveEditDistance(edStr1, edStr2);
        break;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Problem Type</Label>
          <Select value={problem} onValueChange={(value) => setProblem(value as DPProblem)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fibonacci">Fibonacci Number</SelectItem>
              <SelectItem value="lcs">Longest Common Subsequence</SelectItem>
              <SelectItem value="knapsack">0/1 Knapsack</SelectItem>
              <SelectItem value="coinChange">Coin Change</SelectItem>
              <SelectItem value="editDistance">Edit Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problem-specific inputs */}
        {problem === "fibonacci" && (
          <div className="space-y-2">
            <Label htmlFor="fibN">N (0-20)</Label>
            <Input
              id="fibN"
              type="number"
              min="0"
              max="20"
              value={fibN}
              onChange={(e) => setFibN(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
        )}

        {problem === "lcs" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lcsStr1">String 1</Label>
              <Input
                id="lcsStr1"
                value={lcsStr1}
                onChange={(e) => setLcsStr1(e.target.value.toUpperCase())}
                placeholder="e.g., ABCDGH"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lcsStr2">String 2</Label>
              <Input
                id="lcsStr2"
                value={lcsStr2}
                onChange={(e) => setLcsStr2(e.target.value.toUpperCase())}
                placeholder="e.g., AEDFHR"
              />
            </div>
          </div>
        )}

        {problem === "knapsack" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ksWeights">Weights (comma-separated)</Label>
              <Input
                id="ksWeights"
                value={ksWeights}
                onChange={(e) => setKsWeights(e.target.value)}
                placeholder="e.g., 2,3,4,5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ksValues">Values (comma-separated)</Label>
              <Input
                id="ksValues"
                value={ksValues}
                onChange={(e) => setKsValues(e.target.value)}
                placeholder="e.g., 3,4,5,6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ksCapacity">Knapsack Capacity</Label>
              <Input
                id="ksCapacity"
                type="number"
                value={ksCapacity}
                onChange={(e) => setKsCapacity(e.target.value)}
                placeholder="e.g., 8"
              />
            </div>
          </div>
        )}

        {problem === "coinChange" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ccCoins">Coin Denominations (comma-separated)</Label>
              <Input
                id="ccCoins"
                value={ccCoins}
                onChange={(e) => setCcCoins(e.target.value)}
                placeholder="e.g., 1,2,5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ccAmount">Target Amount</Label>
              <Input
                id="ccAmount"
                type="number"
                value={ccAmount}
                onChange={(e) => setCcAmount(e.target.value)}
                placeholder="e.g., 11"
              />
            </div>
          </div>
        )}

        {problem === "editDistance" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edStr1">String 1</Label>
              <Input
                id="edStr1"
                value={edStr1}
                onChange={(e) => setEdStr1(e.target.value.toLowerCase())}
                placeholder="e.g., kitten"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edStr2">String 2</Label>
              <Input
                id="edStr2"
                value={edStr2}
                onChange={(e) => setEdStr2(e.target.value.toLowerCase())}
                placeholder="e.g., sitting"
              />
            </div>
          </div>
        )}

        <Button onClick={handleSolve} className="w-full" size="lg">
          <Play className="mr-2 h-5 w-5" />
          Solve with Dynamic Programming
        </Button>

        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p className="font-medium mb-2">Current Problem: {problem.replace(/([A-Z])/g, ' $1').trim()}</p>
          {problem === "fibonacci" && <p>Compute the nth Fibonacci number using tabulation</p>}
          {problem === "lcs" && <p>Find the longest common subsequence between two strings</p>}
          {problem === "knapsack" && <p>Maximize value within weight capacity constraint</p>}
          {problem === "coinChange" && <p>Find minimum coins needed to make target amount</p>}
          {problem === "editDistance" && <p>Minimum operations to transform one string to another</p>}
        </div>
      </div>
    </Card>
  );
}

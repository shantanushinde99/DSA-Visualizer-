import { useState, useCallback } from "react";

export type TraversalType = "bfs" | "dfs";

export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
}

export interface TraversalStep {
  action: string;
  nodeId?: number;
  visited: number[];
  queue?: number[];
  stack?: number[];
  current?: number;
  description: string;
}

export function useGraphTraversal() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [steps, setSteps] = useState<TraversalStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [traversalType, setTraversalType] = useState<TraversalType>("bfs");
  const [startNode, setStartNode] = useState(0);

  const loadExampleGraph = useCallback(() => {
    const exampleNodes: GraphNode[] = [
      { id: 0, label: "A", x: 250, y: 50 },
      { id: 1, label: "B", x: 150, y: 150 },
      { id: 2, label: "C", x: 350, y: 150 },
      { id: 3, label: "D", x: 100, y: 250 },
      { id: 4, label: "E", x: 200, y: 250 },
      { id: 5, label: "F", x: 300, y: 250 },
      { id: 6, label: "G", x: 400, y: 250 },
    ];

    const exampleEdges: GraphEdge[] = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
    ];

    setNodes(exampleNodes);
    setEdges(exampleEdges);
    setSteps([]);
    setCurrentStep(0);
    setStartNode(0);
  }, []);

  const loadCyclicGraph = useCallback(() => {
    const exampleNodes: GraphNode[] = [
      { id: 0, label: "A", x: 250, y: 50 },
      { id: 1, label: "B", x: 150, y: 150 },
      { id: 2, label: "C", x: 350, y: 150 },
      { id: 3, label: "D", x: 200, y: 250 },
      { id: 4, label: "E", x: 300, y: 250 },
    ];

    const exampleEdges: GraphEdge[] = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 4 },
      { from: 4, to: 0 }, // Creates cycle
    ];

    setNodes(exampleNodes);
    setEdges(exampleEdges);
    setSteps([]);
    setCurrentStep(0);
    setStartNode(0);
  }, []);

  const buildAdjacencyList = useCallback(() => {
    const adj: Map<number, number[]> = new Map();
    nodes.forEach(node => adj.set(node.id, []));
    edges.forEach(edge => {
      adj.get(edge.from)?.push(edge.to);
      adj.get(edge.to)?.push(edge.from); // Undirected graph
    });
    return adj;
  }, [nodes, edges]);

  const bfs = useCallback((start: number) => {
    const steps: TraversalStep[] = [];
    const visited: Set<number> = new Set();
    const queue: number[] = [start];
    const visitedArr: number[] = [];

    steps.push({
      action: "start",
      visited: [],
      queue: [start],
      description: `Starting BFS from node ${nodes.find(n => n.id === start)?.label}`,
    });

    const adj = buildAdjacencyList();

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current)) continue;

      visited.add(current);
      visitedArr.push(current);

      steps.push({
        action: "visit",
        nodeId: current,
        current,
        visited: [...visitedArr],
        queue: [...queue],
        description: `Visiting node ${nodes.find(n => n.id === current)?.label}`,
      });

      const neighbors = adj.get(current) || [];
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
          steps.push({
            action: "enqueue",
            nodeId: neighbor,
            current,
            visited: [...visitedArr],
            queue: [...queue],
            description: `Adding ${nodes.find(n => n.id === neighbor)?.label} to queue`,
          });
        }
      });
    }

    steps.push({
      action: "complete",
      visited: visitedArr,
      queue: [],
      description: "BFS traversal complete!",
    });

    return steps;
  }, [nodes, buildAdjacencyList]);

  const dfs = useCallback((start: number) => {
    const steps: TraversalStep[] = [];
    const visited: Set<number> = new Set();
    const stack: number[] = [start];
    const visitedArr: number[] = [];

    steps.push({
      action: "start",
      visited: [],
      stack: [start],
      description: `Starting DFS from node ${nodes.find(n => n.id === start)?.label}`,
    });

    const adj = buildAdjacencyList();

    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (visited.has(current)) continue;

      visited.add(current);
      visitedArr.push(current);

      steps.push({
        action: "visit",
        nodeId: current,
        current,
        visited: [...visitedArr],
        stack: [...stack],
        description: `Visiting node ${nodes.find(n => n.id === current)?.label}`,
      });

      const neighbors = (adj.get(current) || []).reverse(); // Reverse to maintain left-to-right order
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor) && !stack.includes(neighbor)) {
          stack.push(neighbor);
          steps.push({
            action: "push",
            nodeId: neighbor,
            current,
            visited: [...visitedArr],
            stack: [...stack],
            description: `Pushing ${nodes.find(n => n.id === neighbor)?.label} to stack`,
          });
        }
      });
    }

    steps.push({
      action: "complete",
      visited: visitedArr,
      stack: [],
      description: "DFS traversal complete!",
    });

    return steps;
  }, [nodes, buildAdjacencyList]);

  const traverse = useCallback(() => {
    if (nodes.length === 0) return;

    const traversalSteps = traversalType === "bfs" ? bfs(startNode) : dfs(startNode);
    setSteps(traversalSteps);
    setCurrentStep(0);
  }, [nodes.length, traversalType, startNode, bfs, dfs]);

  const clear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSteps([]);
    setCurrentStep(0);
  }, []);

  return {
    nodes,
    edges,
    steps,
    currentStep,
    traversalType,
    startNode,
    setNodes,
    setEdges,
    setCurrentStep,
    setTraversalType,
    setStartNode,
    loadExampleGraph,
    loadCyclicGraph,
    traverse,
    clear,
  };
}

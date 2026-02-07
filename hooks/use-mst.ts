import { useState, useCallback } from "react";

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface MSTStep {
  edges: Edge[];
  selectedEdges: Edge[];
  currentEdge?: Edge;
  action: "consider" | "add" | "skip" | "complete";
  description: string;
  totalCost: number;
}

export type MSTAlgorithm = "kruskal" | "prim";

export function useMST() {
  const [algorithm, setAlgorithm] = useState<MSTAlgorithm>("kruskal");
  const [graph, setGraph] = useState<Edge[]>([]);
  const [numVertices, setNumVertices] = useState(5);
  const [steps, setSteps] = useState<MSTStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Union-Find (Disjoint Set) for Kruskal's
  class UnionFind {
    parent: number[];
    rank: number[];

    constructor(size: number) {
      this.parent = Array.from({ length: size }, (_, i) => i);
      this.rank = Array(size).fill(0);
    }

    find(x: number): number {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }

    union(x: number, y: number): boolean {
      const rootX = this.find(x);
      const rootY = this.find(y);

      if (rootX === rootY) return false;

      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }

      return true;
    }
  }

  const kruskal = useCallback((edges: Edge[], vertices: number) => {
    const newSteps: MSTStep[] = [];
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(vertices);
    const mstEdges: Edge[] = [];
    let totalCost = 0;

    newSteps.push({
      edges: [...edges],
      selectedEdges: [],
      action: "consider",
      description: `Starting Kruskal's algorithm. Sort edges by weight: ${sortedEdges.map(e => `${e.from}-${e.to}(${e.weight})`).join(", ")}`,
      totalCost: 0,
    });

    for (const edge of sortedEdges) {
      const { from, to, weight } = edge;

      newSteps.push({
        edges: [...edges],
        selectedEdges: [...mstEdges],
        currentEdge: edge,
        action: "consider",
        description: `Considering edge ${from}-${to} with weight ${weight}`,
        totalCost,
      });

      if (uf.union(from, to)) {
        mstEdges.push(edge);
        totalCost += weight;

        newSteps.push({
          edges: [...edges],
          selectedEdges: [...mstEdges],
          currentEdge: edge,
          action: "add",
          description: `✓ Added edge ${from}-${to} (weight ${weight}). No cycle formed. Total cost: ${totalCost}`,
          totalCost,
        });
      } else {
        newSteps.push({
          edges: [...edges],
          selectedEdges: [...mstEdges],
          currentEdge: edge,
          action: "skip",
          description: `✗ Skipped edge ${from}-${to} (weight ${weight}). Would create a cycle.`,
          totalCost,
        });
      }

      if (mstEdges.length === vertices - 1) {
        break;
      }
    }

    newSteps.push({
      edges: [...edges],
      selectedEdges: [...mstEdges],
      action: "complete",
      description: `✅ Kruskal's algorithm complete! MST has ${mstEdges.length} edges with total cost ${totalCost}`,
      totalCost,
    });

    setSteps(newSteps);
    setCurrentStep(0);
  }, []);

  const prim = useCallback((edges: Edge[], vertices: number) => {
    const newSteps: MSTStep[] = [];
    const mstEdges: Edge[] = [];
    const inMST = new Set<number>();
    const adjacency: Map<number, Edge[]> = new Map();
    let totalCost = 0;

    // Build adjacency list
    for (let i = 0; i < vertices; i++) {
      adjacency.set(i, []);
    }

    for (const edge of edges) {
      adjacency.get(edge.from)!.push(edge);
      adjacency.get(edge.to)!.push({ from: edge.to, to: edge.from, weight: edge.weight });
    }

    // Start from vertex 0
    inMST.add(0);

    newSteps.push({
      edges: [...edges],
      selectedEdges: [],
      action: "consider",
      description: "Starting Prim's algorithm from vertex 0",
      totalCost: 0,
    });

    while (inMST.size < vertices) {
      let minEdge: Edge | null = null;
      let minWeight = Infinity;

      // Find minimum weight edge connecting MST to a new vertex
      for (const vertex of inMST) {
        const neighbors = adjacency.get(vertex) || [];
        for (const edge of neighbors) {
          if (!inMST.has(edge.to) && edge.weight < minWeight) {
            minEdge = edge;
            minWeight = edge.weight;
          }
        }
      }

      if (!minEdge) break;

      newSteps.push({
        edges: [...edges],
        selectedEdges: [...mstEdges],
        currentEdge: minEdge,
        action: "consider",
        description: `Considering edge ${minEdge.from}-${minEdge.to} with weight ${minEdge.weight}`,
        totalCost,
      });

      mstEdges.push(minEdge);
      inMST.add(minEdge.to);
      totalCost += minEdge.weight;

      newSteps.push({
        edges: [...edges],
        selectedEdges: [...mstEdges],
        currentEdge: minEdge,
        action: "add",
        description: `✓ Added edge ${minEdge.from}-${minEdge.to} (weight ${minEdge.weight}). Vertex ${minEdge.to} joined MST. Total cost: ${totalCost}`,
        totalCost,
      });
    }

    newSteps.push({
      edges: [...edges],
      selectedEdges: [...mstEdges],
      action: "complete",
      description: `✅ Prim's algorithm complete! MST has ${mstEdges.length} edges with total cost ${totalCost}`,
      totalCost,
    });

    setSteps(newSteps);
    setCurrentStep(0);
  }, []);

  const generateRandomGraph = useCallback((vertices: number) => {
    const newEdges: Edge[] = [];
    const edgeSet = new Set<string>();

    // Ensure graph is connected by creating a spanning tree first
    for (let i = 1; i < vertices; i++) {
      const from = Math.floor(Math.random() * i);
      const weight = Math.floor(Math.random() * 20) + 1;
      newEdges.push({ from, to: i, weight });
      edgeSet.add(`${Math.min(from, i)}-${Math.max(from, i)}`);
    }

    // Add additional random edges
    const additionalEdges = Math.floor(vertices * 1.5);
    for (let i = 0; i < additionalEdges; i++) {
      const from = Math.floor(Math.random() * vertices);
      const to = Math.floor(Math.random() * vertices);
      const key = `${Math.min(from, to)}-${Math.max(from, to)}`;

      if (from !== to && !edgeSet.has(key)) {
        const weight = Math.floor(Math.random() * 20) + 1;
        newEdges.push({ from, to, weight });
        edgeSet.add(key);
      }
    }

    setGraph(newEdges);
    setNumVertices(vertices);
  }, []);

  const solve = useCallback(() => {
    if (graph.length === 0) {
      generateRandomGraph(numVertices);
      return;
    }

    if (algorithm === "kruskal") {
      kruskal(graph, numVertices);
    } else {
      prim(graph, numVertices);
    }
  }, [algorithm, graph, numVertices, kruskal, prim, generateRandomGraph]);

  const reset = useCallback(() => {
    setSteps([]);
    setCurrentStep(0);
  }, []);

  return {
    algorithm,
    setAlgorithm,
    graph,
    numVertices,
    setNumVertices,
    steps,
    currentStep,
    setCurrentStep,
    generateRandomGraph,
    solve,
    reset,
  };
}

import { useState, useCallback } from "react"

export interface GraphNode {
  id: number
  label: string
  x: number
  y: number
}

export interface GraphEdge {
  from: number
  to: number
  weight?: number
  directed: boolean
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  directed: boolean
  weighted: boolean
}

let nodeIdCounter = 0

export function useGraph() {
  const [graph, setGraph] = useState<Graph>({
    nodes: [],
    edges: [],
    directed: false,
    weighted: false,
  })
  const [selectedNodes, setSelectedNodes] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const addNode = useCallback((x: number = 250, y: number = 250) => {
    const newNode: GraphNode = {
      id: nodeIdCounter++,
      label: `${nodeIdCounter}`,
      x,
      y,
    }
    setGraph(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }))
  }, [])

  const removeNode = useCallback((nodeId: number) => {
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.filter(n => n.id !== nodeId),
      edges: prev.edges.filter(e => e.from !== nodeId && e.to !== nodeId),
    }))
    setSelectedNodes(prev => prev.filter(id => id !== nodeId))
  }, [])

  const addEdge = useCallback((from: number, to: number, weight?: number) => {
    // Check if edge already exists
    const exists = graph.edges.some(
      e => (e.from === from && e.to === to) || 
           (!graph.directed && e.from === to && e.to === from)
    )
    
    if (!exists) {
      const newEdge: GraphEdge = {
        from,
        to,
        weight,
        directed: graph.directed,
      }
      setGraph(prev => ({
        ...prev,
        edges: [...prev.edges, newEdge],
      }))
    }
  }, [graph.directed, graph.edges])

  const removeEdge = useCallback((from: number, to: number) => {
    setGraph(prev => ({
      ...prev,
      edges: prev.edges.filter(e => 
        !(e.from === from && e.to === to) &&
        !(!prev.directed && e.from === to && e.to === from)
      ),
    }))
  }, [])

  const toggleDirected = useCallback(() => {
    setGraph(prev => ({
      ...prev,
      directed: !prev.directed,
      edges: prev.edges.map(e => ({ ...e, directed: !prev.directed })),
    }))
  }, [])

  const toggleWeighted = useCallback(() => {
    setGraph(prev => ({
      ...prev,
      weighted: !prev.weighted,
    }))
  }, [])

  const selectNode = useCallback((nodeId: number) => {
    setSelectedNodes(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId)
      } else {
        return [...prev, nodeId]
      }
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedNodes([])
  }, [])

  const clear = useCallback(() => {
    setGraph({
      nodes: [],
      edges: [],
      directed: false,
      weighted: false,
    })
    setSelectedNodes([])
    nodeIdCounter = 0
  }, [])

  const loadExample = useCallback((type: 'simple' | 'complete' | 'cyclic') => {
    nodeIdCounter = 0
    const nodes: GraphNode[] = []
    const edges: GraphEdge[] = []

    switch (type) {
      case 'simple':
        nodes.push(
          { id: nodeIdCounter++, label: '1', x: 150, y: 100 },
          { id: nodeIdCounter++, label: '2', x: 350, y: 100 },
          { id: nodeIdCounter++, label: '3', x: 150, y: 250 },
          { id: nodeIdCounter++, label: '4', x: 350, y: 250 }
        )
        edges.push(
          { from: 0, to: 1, directed: false },
          { from: 0, to: 2, directed: false },
          { from: 1, to: 3, directed: false },
          { from: 2, to: 3, directed: false }
        )
        break
      case 'complete':
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
          nodes.push({
            id: nodeIdCounter++,
            label: `${i + 1}`,
            x: 250 + 120 * Math.cos(angle),
            y: 200 + 120 * Math.sin(angle),
          })
        }
        for (let i = 0; i < 5; i++) {
          for (let j = i + 1; j < 5; j++) {
            edges.push({ from: i, to: j, directed: false })
          }
        }
        break
      case 'cyclic':
        nodes.push(
          { id: nodeIdCounter++, label: '1', x: 250, y: 100 },
          { id: nodeIdCounter++, label: '2', x: 400, y: 200 },
          { id: nodeIdCounter++, label: '3', x: 350, y: 350 },
          { id: nodeIdCounter++, label: '4', x: 150, y: 350 },
          { id: nodeIdCounter++, label: '5', x: 100, y: 200 }
        )
        for (let i = 0; i < 5; i++) {
          edges.push({ from: i, to: (i + 1) % 5, directed: false })
        }
        edges.push({ from: 0, to: 2, directed: false })
        edges.push({ from: 1, to: 3, directed: false })
        break
    }

    setGraph({
      nodes,
      edges,
      directed: false,
      weighted: false,
    })
    setSelectedNodes([])
  }, [])

  const moveNode = useCallback((nodeId: number, x: number, y: number) => {
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => 
        n.id === nodeId ? { ...n, x, y } : n
      ),
    }))
  }, [])

  return {
    graph,
    selectedNodes,
    isAnimating,
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    toggleDirected,
    toggleWeighted,
    selectNode,
    clearSelection,
    clear,
    loadExample,
    moveNode,
  }
}

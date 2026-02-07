# Graph

A Graph is a non-linear data structure consisting of vertices (nodes) and edges that connect pairs of vertices. Graphs are used to represent networks, relationships, and connections between objects.

## Graph Types

### Based on Direction
- **Directed Graph (Digraph)**: Edges have direction (A → B)
- **Undirected Graph**: Edges have no direction (A ↔ B)

### Based on Weights
- **Weighted Graph**: Edges have associated weights/costs
- **Unweighted Graph**: All edges are equal

### Special Types
- **Complete Graph**: Every vertex connects to every other vertex
- **Connected Graph**: Path exists between every pair of vertices
- **Cyclic Graph**: Contains at least one cycle
- **Acyclic Graph**: Contains no cycles
- **Tree**: Connected acyclic graph

## Graph Representations

### Adjacency Matrix
- 2D array where matrix[i][j] represents edge from vertex i to j
- **Space**: O(V²)
- **Edge lookup**: O(1)
- Good for dense graphs

### Adjacency List
- Array of lists where list[i] contains neighbors of vertex i
- **Space**: O(V + E)
- **Edge lookup**: O(degree of vertex)
- Good for sparse graphs

### Edge List
- List of all edges as pairs (u, v, weight)
- **Space**: O(E)
- Simple but slower for queries

## Common Operations

- **Add Vertex**: Add a new node to the graph
- **Add Edge**: Connect two vertices
- **Remove Vertex**: Delete a node and its edges
- **Remove Edge**: Disconnect two vertices
- **Find Path**: Determine if path exists between vertices

## Graph Algorithms

- **Traversal**: BFS, DFS
- **Shortest Path**: Dijkstra's, Bellman-Ford, Floyd-Warshall
- **Minimum Spanning Tree**: Kruskal's, Prim's
- **Cycle Detection**: DFS-based algorithms
- **Topological Sort**: For directed acyclic graphs

## Applications

- Social networks (friend connections)
- Maps and navigation (road networks)
- Computer networks (routers and connections)
- Web page linking (PageRank)
- Dependency resolution (package managers)
- Circuit design
- Recommendation systems

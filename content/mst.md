# Minimum Spanning Tree (MST)

A Minimum Spanning Tree is a subset of edges in a connected, weighted, undirected graph that connects all vertices with minimum total edge weight and no cycles. It's a tree because it's acyclic and connected.

## Properties

- **Connects all vertices**: Every vertex is reachable from every other vertex
- **Minimum weight**: Sum of edge weights is minimized
- **Acyclic**: No cycles (V vertices need V-1 edges)
- **Unique if weights are unique**: Otherwise multiple MSTs may exist

## Kruskal's Algorithm

### Approach
Uses a greedy approach by sorting edges and adding them one by one if they don't form a cycle.

### Steps
1. Sort all edges in ascending order of weight
2. Initialize each vertex as a separate set (disjoint set)
3. For each edge in sorted order:
   - Check if endpoints belong to different sets
   - If yes, add edge to MST and merge sets
   - If no, skip (would create cycle)
4. Stop when V-1 edges are added

### Time Complexity
- **O(E log E)** for sorting edges
- **O(E α(V))** for union-find operations
- **Overall: O(E log E)** or **O(E log V)**

### Data Structures
- **Edge List**: Store all edges with weights
- **Union-Find**: Detect cycles efficiently

### Best For
- Sparse graphs (fewer edges)
- When edges are already sorted

## Prim's Algorithm

### Approach
Grows the MST one vertex at a time by always adding the cheapest edge that connects a new vertex to the growing tree.

### Steps
1. Start with any vertex as the initial tree
2. Add it to MST set
3. Repeat until all vertices are included:
   - Find minimum weight edge connecting MST to non-MST vertex
   - Add this edge and vertex to MST
   - Update distances for new vertex's neighbors

### Time Complexity
- **With Binary Heap**: O((V + E) log V)
- **With Fibonacci Heap**: O(E + V log V)
- **With Adjacency Matrix**: O(V²)

### Data Structures
- **Priority Queue**: Get minimum edge efficiently
- **Key Array**: Store minimum edge weight for each vertex
- **Parent Array**: Reconstruct MST

### Best For
- Dense graphs (more edges)
- When adjacency matrix representation is used

## Comparison: Kruskal's vs Prim's

| Feature | Kruskal's | Prim's |
|---------|-----------|--------|
| Approach | Edge-based | Vertex-based |
| Growth Pattern | Forest → Tree | Single tree grows |
| Time Complexity | O(E log E) | O(E log V) with heap |
| Space | O(V) for Union-Find | O(V) for priority queue |
| Best For | Sparse graphs | Dense graphs |
| Implementation | Simpler with union-find | Simpler with adj matrix |

## Applications

- **Network Design**: Minimize cable length in connecting computers
- **Electrical Grid**: Connect power stations with minimum wire
- **Pipeline Networks**: Minimize pipeline length for water/gas
- **Circuit Design**: Connect components on chip with minimum wire
- **Clustering**: Group similar data points
- **Image Segmentation**: Identify regions in images
- **Approximation Algorithms**: For traveling salesman problem

## Real-World Examples

- **Telecommunication**: Laying optical fiber cables
- **Transportation**: Building road networks
- **Water Supply**: Designing water distribution systems
- **Cluster Analysis**: Grouping similar objects in data mining

# Dijkstra's Algorithm

Dijkstra's algorithm is a graph search algorithm that finds the shortest path between nodes in a weighted graph with non-negative edge weights. It was conceived by computer scientist Edsger W. Dijkstra in 1956.

## How It Works

1. **Initialize**: Set distance to source vertex as 0 and all other distances as infinite
2. **Select Minimum**: Pick the unvisited vertex with minimum distance
3. **Update Neighbors**: For each neighbor, calculate distance through current vertex
4. **Relax Edges**: If new distance is smaller, update it
5. **Mark Visited**: Mark current vertex as visited
6. **Repeat**: Continue until all vertices are visited or destination is reached

## Algorithm Steps

```
1. Create a set of unvisited nodes
2. Assign distance 0 to source, infinity to others
3. While unvisited set is not empty:
   a. Select vertex u with minimum distance
   b. Remove u from unvisited set
   c. For each neighbor v of u:
      - Calculate distance = dist[u] + weight(u,v)
      - If distance < dist[v]:
        * Update dist[v] = distance
        * Update parent[v] = u
```

## Data Structures Used

- **Priority Queue/Min-Heap**: To efficiently get vertex with minimum distance
- **Distance Array**: To store shortest distances from source
- **Parent Array**: To reconstruct the shortest path
- **Visited Set**: To track processed vertices

## Time Complexity

- **With Array**: O(V²) - suitable for dense graphs
- **With Binary Heap**: O((V + E) log V)
- **With Fibonacci Heap**: O(E + V log V) - theoretical best

Where V = vertices, E = edges

## Space Complexity

O(V) for storing distances and visited status

## Limitations

- **Cannot handle negative weights**: Algorithm fails with negative edge weights
- **Not efficient for sparse graphs**: When using adjacency matrix
- **Single source**: Finds shortest path from one source only

## Advantages

- **Optimal solution**: Guarantees shortest path if no negative weights
- **Versatile**: Works on both directed and undirected graphs
- **Widely applicable**: Used in GPS, network routing, and more

## Applications

- **GPS Navigation**: Finding shortest route between locations
- **Network Routing**: OSPF protocol uses Dijkstra's algorithm
- **Social Networks**: Finding degrees of separation
- **Flight Scheduling**: Finding cheapest/shortest flight paths
- **Robotics**: Path planning and obstacle avoidance

## Comparison with Other Algorithms

- **vs BFS**: Dijkstra's handles weighted graphs, BFS only unweighted
- **vs Bellman-Ford**: Bellman-Ford handles negative weights but is slower
- **vs A***: A* is faster with good heuristic but Dijkstra's is simpler
- **vs Floyd-Warshall**: Floyd-Warshall finds all-pairs shortest paths

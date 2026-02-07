# Graph Traversal: BFS & DFS

Graph traversal algorithms systematically visit all vertices in a graph. The two fundamental approaches are **Breadth-First Search (BFS)** and **Depth-First Search (DFS)**.

## Breadth-First Search (BFS)

**BFS** explores the graph level by level, visiting all neighbors of a vertex before moving to the next level.

### Algorithm
```
1. Start at the source vertex
2. Mark it as visited and enqueue it
3. While queue is not empty:
   a. Dequeue a vertex
   b. For each unvisited neighbor:
      - Mark as visited
      - Enqueue the neighbor
```

### Key Characteristics
- **Data Structure:** Queue (FIFO - First In, First Out)
- **Exploration:** Level by level
- **Path:** Finds shortest path in unweighted graphs
- **Memory:** Can be memory-intensive for wide graphs

### Time & Space Complexity
- **Time:** O(V + E) where V = vertices, E = edges
- **Space:** O(V) for the queue and visited set

---

## Depth-First Search (DFS)

**DFS** explores as far as possible along each branch before backtracking.

### Algorithm
```
1. Start at the source vertex
2. Mark it as visited and push to stack
3. While stack is not empty:
   a. Pop a vertex
   b. For each unvisited neighbor:
      - Mark as visited
      - Push the neighbor to stack
```

### Key Characteristics
- **Data Structure:** Stack (LIFO - Last In, First Out)
- **Exploration:** Goes deep before wide
- **Path:** Does not guarantee shortest path
- **Memory:** More memory-efficient for deep graphs

### Time & Space Complexity
- **Time:** O(V + E) where V = vertices, E = edges
- **Space:** O(V) for the stack and visited set

---

## Comparison Table

| Feature | BFS | DFS |
|---------|-----|-----|
| **Data Structure** | Queue | Stack |
| **Memory Usage** | Higher (for wide graphs) | Lower (for deep graphs) |
| **Shortest Path** | Yes (unweighted) | No |
| **Implementation** | Iterative (typically) | Recursive or Iterative |
| **Complete** | Yes | Yes |
| **Optimal** | Yes (unweighted) | No |
| **Best For** | Shortest path, level-order | Topological sort, cycle detection |

---

## Use Cases

### BFS Applications
1. **Shortest Path:** Finding shortest path in unweighted graphs
2. **Web Crawling:** Crawl pages closest to root first
3. **Social Networks:** Find degrees of separation
4. **Broadcasting:** Network packet routing
5. **GPS Navigation:** Find nearest locations
6. **Peer-to-Peer Networks:** Find nearby nodes
7. **Garbage Collection:** Mark and sweep algorithm

### DFS Applications
1. **Topological Sorting:** Order tasks with dependencies
2. **Cycle Detection:** Find cycles in directed/undirected graphs
3. **Path Finding:** Check if path exists between vertices
4. **Maze Solving:** Navigate through mazes
5. **Connected Components:** Find all connected parts
6. **Strongly Connected Components:** Kosaraju's algorithm
7. **Puzzle Solving:** Sudoku, N-Queens

---

## Implementation Variants

### BFS Variants
- **Multi-source BFS:** Start from multiple vertices
- **Bidirectional BFS:** Search from both ends
- **0-1 BFS:** For graphs with 0 and 1 edge weights
- **Level-order Traversal:** For trees

### DFS Variants
- **Recursive DFS:** Natural recursion approach
- **Iterative DFS:** Using explicit stack
- **Pre-order:** Process before children
- **Post-order:** Process after children
- **In-order:** For binary trees

---

## Key Differences in Behavior

### When to Use BFS
✅ Finding shortest path in unweighted graphs  
✅ Level-order operations  
✅ Minimum steps/hops problems  
✅ Finding all nodes within k distance  
✅ Testing bipartiteness  

### When to Use DFS
✅ Topological sorting  
✅ Detecting cycles  
✅ Finding connected components  
✅ Solving mazes/puzzles  
✅ Generating permutations  
✅ Memory constrained scenarios  

---

## Graph Representations

Both BFS and DFS can work with different graph representations:

### Adjacency List
```
0 → [1, 2]
1 → [0, 3, 4]
2 → [0, 5, 6]
...
```
**Best for:** Sparse graphs (few edges)  
**Space:** O(V + E)

### Adjacency Matrix
```
  0 1 2 3
0 0 1 1 0
1 1 0 0 1
2 1 0 0 1
3 0 1 1 0
```
**Best for:** Dense graphs (many edges)  
**Space:** O(V²)

---

## Common Pitfalls

### BFS Pitfalls
- ❌ Not marking vertices as visited before enqueueing → duplicates
- ❌ Using stack instead of queue → becomes DFS
- ❌ Not handling disconnected graphs

### DFS Pitfalls
- ❌ Not marking vertices as visited → infinite loop
- ❌ Stack overflow in recursive implementation
- ❌ Not tracking visited in cyclic graphs

---

## Optimization Tips

### For BFS
1. Use deque for O(1) enqueue/dequeue
2. Mark visited when enqueueing, not when dequeueing
3. For shortest path, store distance/parent information
4. Use bidirectional BFS for faster shortest path

### For DFS
1. Use iterative with stack to avoid recursion overhead
2. Use visited set for O(1) lookup
3. For cycle detection, track recursion stack separately
4. Consider tail recursion optimization

---

## Practice Problems

### BFS Problems
- Shortest path in unweighted graph
- Word Ladder
- Rotting Oranges
- 01 Matrix
- Binary Tree Level Order Traversal

### DFS Problems
- Number of Islands
- Course Schedule (cycle detection)
- Clone Graph
- Path Sum
- Surrounded Regions

---

## Visualization Benefits

This visualizer helps you:
- 🎯 See the difference in exploration order
- 📊 Understand queue vs stack behavior
- 🔍 Track visited nodes in real-time
- 🎨 Visualize the data structure state
- 📈 Compare performance characteristics

Try both algorithms on the same graph to see how they differ!

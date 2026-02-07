# Binary Heap

A **binary heap** is a complete binary tree that satisfies the **heap property**. It's a fundamental data structure used in priority queues and sorting algorithms.

---

## Heap Types

### Max Heap
- **Parent ≥ Children**: Every parent node is greater than or equal to its children
- Root contains the **maximum** element
- Used for **descending priority**

### Min Heap  
- **Parent ≤ Children**: Every parent node is less than or equal to its children
- Root contains the **minimum** element
- Used for **ascending priority**

---

## Key Properties

### Complete Binary Tree
- All levels are **completely filled** except possibly the last
- Last level is filled from **left to right**
- Height is always **$\log n$**

### Array Representation
Efficiently stored in an array where for node at index `i`:

- **Left child**: `2i + 1`
- **Right child**: `2i + 2`  
- **Parent**: `floor((i-1)/2)`

```
Array: [50, 30, 40, 10, 20]
         50
        /  \
      30    40
     / \
   10  20
```

---

## Core Operations

### Insertion - O(log n)
**Add element and restore heap property**

1. Add element at next available position (end of array)
2. Compare with parent
3. Swap if heap property violated
4. Repeat until property satisfied (**heapify-up**)

### Deletion - O(log n)
**Remove root and restore heap property**

1. Remove root element (min/max)
2. Replace root with **last element**
3. Compare with children
4. Swap with appropriate child (larger for max-heap, smaller for min-heap)
5. Repeat until property satisfied (**heapify-down**)

### Peek - O(1)
**View the root element**
- Returns min/max without removal
- Constant time operation

### Build Heap - O(n)
**Convert array to heap**
- Bottom-up heapify
- More efficient than n insertions

---

## Time Complexity

| Operation    | Time Complexity | Description |
|--------------|----------------|-------------|
| Insert       | O(log n)       | Heapify-up |
| Delete       | O(log n)       | Heapify-down |
| Peek         | O(1)           | Access root |
| Build Heap   | O(n)           | Bottom-up |
| Heapify      | O(log n)       | Restore property |

---

## Real-World Applications

### Data Structures
- **Priority Queues**: Task scheduling, event simulation
- **Heap Sort**: In-place O(n log n) sorting algorithm

### Algorithms
- **Dijkstra's Algorithm**: Shortest path finding
- **Prim's Algorithm**: Minimum spanning tree
- **Huffman Coding**: Data compression
- **K-way Merge**: Merging multiple sorted arrays

### Systems
- **Operating Systems**: Process scheduling
- **Memory Management**: Free memory blocks
- **Load Balancing**: Server selection
- **Median Maintenance**: Streaming data

---

## Advantages

✓ **Fast min/max access** O(1)
✓ **Efficient insertion/deletion** O(log n)
✓ **Space efficient** (array-based)
✓ **Cache-friendly** (contiguous memory)

## Limitations

✗ **No random access** to arbitrary elements
✗ **Slow search** O(n) for non-root elements
✗ **Not sorted** (only heap property maintained) 
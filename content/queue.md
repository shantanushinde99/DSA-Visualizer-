# Queue Data Structure

A **queue** is a linear data structure that follows the **First-In-First-Out (FIFO)** principle. Like a line at a ticket counter - the first person in line is served first.

---

## Core Operations

### Enqueue - O(1)
**Adds an element to the rear**
- Inserts a new element at the back of the queue
- Time Complexity: **O(1)** - constant time
- May cause **queue overflow** if full (in fixed-size implementations)

### Dequeue - O(1)
**Removes and returns the front element**
- Removes the oldest element from the front
- Time Complexity: **O(1)** - constant time
- May cause **queue underflow** if empty

### Front/Peek - O(1)
**Views the front element without removal**
- Returns the front element without modifying the queue
- Time Complexity: **O(1)** - constant time
- Useful for checking what will be dequeued next

---

## Key Properties

- **FIFO Order**: First element added is first to be removed
- **Two Access Points**: Front (for removal) and Rear (for insertion)
- **Sequential Processing**: Elements processed in arrival order
- **Implementation**: Arrays, linked lists, or circular buffers

---

## Real-World Applications

### Operating Systems
- **CPU Scheduling**: Process scheduling algorithms (Round Robin)
- **Disk Scheduling**: Managing disk I/O requests
- **Print Spooling**: Managing print jobs in order

### Algorithms
- **Breadth-First Search (BFS)**: Level-order tree/graph traversal
- **Level Order Traversal**: Processing tree nodes by levels
- **Cache Implementation**: LRU cache, page replacement

### Systems & Networking
- **Message Queues**: Asynchronous communication between services
- **Network Packets**: Router packet buffering
- **Web Servers**: Request handling and buffering
- **Call Centers**: Managing incoming calls in order

---

## Implementation Approaches

### Array-Based Implementation
- **Simple** but fixed size
- **Circular array** for better space utilization
- Fast access but memory limitation

### Linked List Implementation
- **Dynamic size** - grows as needed
- More memory overhead per element
- No size constraints

### Priority Queue Variant
- Elements have priorities
- Dequeue based on highest/lowest priority
- Used in task scheduling

---

## Time Complexity Summary

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Enqueue   | O(1)           | O(1)             |
| Dequeue   | O(1)           | O(1)             |
| Front     | O(1)           | O(1)             |
| Search    | O(n)           | O(1)             |

---

## Advantages

✓ **Fair ordering** (FIFO ensures fairness)
✓ **Fast operations** (constant time O(1))
✓ **Simple implementation**
✓ **Natural for real-world scenarios**

## Limitations

✗ **No random access** to elements
✗ **Fixed size** in array implementation
✗ **Wasted space** in simple array implementation
✗ **Linear search** required to find specific elements 
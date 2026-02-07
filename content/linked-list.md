# Linked List Data Structures

A **linked list** is a linear data structure where elements are stored in **nodes**, and each node contains data and a reference (pointer) to the next node in the sequence.

---

## Types of Linked Lists

### Singly Linked List (SLL)
**Forward-only traversal**

- Each node has **data** and **next pointer**
- Traversal only in **forward direction**
- **Memory efficient** (one pointer per node)
- Simple implementation

```
Head -> [Data|Next] -> [Data|Next] -> [Data|NULL]
```

### Doubly Linked List (DLL)
**Bidirectional traversal**

- Each node has **data**, **next**, and **previous** pointers
- **Bidirectional traversal** (forward and backward)
- More memory usage (two pointers per node)
- Easier deletion operations

```
NULL <- [Prev|Data|Next] <-> [Prev|Data|Next] -> NULL
```

### Circular Singly Linked List (CSLL)
**Last connects to first**

- Last node points back to **first node**
- **No NULL** references
- Useful for **circular queues**
- Round-robin scheduling

```
     [Data|Next] -> [Data|Next]
          ^                |
          |________________|
```

### Circular Doubly Linked List (CDLL)
**Most flexible, most complex**

- Combines features of **DLL** and **CSLL**
- **Bidirectional circular** traversal
- Most memory usage
- Complex but versatile

---

## Core Operations

### Insertion

| Position | Time Complexity | Description |
|----------|----------------|-------------|
| At Front | **O(1)** | Update head pointer |
| At End   | **O(n)** SLL, **O(1)** DLL | Traverse or use tail |
| At Position | **O(n)** | Traverse to position |

### Deletion

| Position | Time Complexity | Description |
|----------|----------------|-------------|
| From Front | **O(1)** | Update head pointer |
| From End | **O(n)** | Traverse to end |
| At Position | **O(n)** | Traverse to position |

### Traversal - O(n)
- **Forward** traversal (all types)
- **Backward** traversal (DLL/CDLL only)
- **Cycle detection** (Floyd's algorithm)

### Search - O(n)
- Linear search through nodes
- No random access (unlike arrays)

---

## Time Complexity Summary

| Operation | SLL | DLL | Array |
|-----------|-----|-----|-------|
| Insert Front | O(1) | O(1) | O(n) |
| Insert End | O(n) | O(1)* | O(1) |
| Delete Front | O(1) | O(1) | O(n) |
| Delete End | O(n) | O(1)* | O(1) |
| Search | O(n) | O(n) | O(n) |
| Access | O(n) | O(n) | O(1) |

*With tail pointer

---

## Real-World Applications

### Data Structures
- **Stack & Queue** implementation
- **Hash Tables** (chaining for collision resolution)
- **Adjacency List** (graph representation)

### Systems
- **Music/Video Playlists** (circular for repeat)
- **Image Viewer** (next/previous with DLL)
- **Browser History** (DLL for back/forward)
- **Undo/Redo Operations** (DLL for both directions)

### Memory Management
- **Dynamic Memory Allocation** (OS memory blocks)
- **Free Memory Lists** (heap management)
- **Garbage Collection** (tracking objects)

---

## Advantages vs Arrays

✓ **Dynamic size** (no fixed capacity)
✓ **Efficient insertion/deletion** at beginning
✓ **No wasted space** (grows as needed)
✓ **Easy to split/join** lists

## Limitations vs Arrays

✗ **No random access** (O(n) instead of O(1))
✗ **Extra memory** for pointers
✗ **Not cache-friendly** (scattered in memory)
✗ **Cannot use binary search** efficiently 
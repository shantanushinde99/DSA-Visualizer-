# AVL Tree (Adelson-Velsky and Landis)

An **AVL tree** is a **self-balancing Binary Search Tree** where the height difference (balance factor) between left and right subtrees of **any node** is at most **1**. It was the first self-balancing BST invented (1962).

---

## Balance Factor

For every node:
```
Balance Factor = Height(Left Subtree) - Height(Right Subtree)
```

**Valid values**: `-1`, `0`, or `+1`

```
     Balanced (BF = 0)      Unbalanced (BF = 2)
         50                       50
        /  \                     /
      30    70                 30
                              /
                            20  ← Need rotation!
```

---

## Rotations

When balance factor becomes **-2** or **+2**, perform rotations to rebalance:

### Right Rotation (LL Case)
**When left subtree is too tall on the left**

```
      z (BF=2)              y
     /                     / \
    y         →           x   z
   /
  x
```

### Left Rotation (RR Case)
**When right subtree is too tall on the right**

```
  x (BF=-2)                y
   \                      / \
    y         →          x   z
     \
      z
```

### Left-Right Rotation (LR Case)
**When left subtree is too tall on the right**

```
    z (BF=2)       z           y
   /              /           / \
  x      →       y     →     x   z
   \            /
    y          x
```

### Right-Left Rotation (RL Case)
**When right subtree is too tall on the left**

```
  x (BF=-2)      x             y
   \              \           / \
    z      →       y    →    x   z
   /                \
  y                  z
```

---

## Core Operations

### Insertion - O(log n)
**Insert and rebalance**

1. Insert as in regular BST
2. Update heights going back up
3. Check balance factor at each node
4. Perform rotation if |BF| > 1

### Deletion - O(log n)
**Delete and rebalance**

1. Delete as in regular BST
2. Update heights going back up
3. Check balance factor at each node
4. Perform rotation if |BF| > 1
5. May need multiple rotations

### Search - O(log n)
**Same as BST**
- Always O(log n) due to balanced height
- More predictable than regular BST

---

## Time Complexity

| Operation | AVL Tree | BST (avg) | BST (worst) |
|-----------|----------|-----------|-------------|
| Search    | **O(log n)** | O(log n) | O(n) |
| Insert    | **O(log n)** | O(log n) | O(n) |
| Delete    | **O(log n)** | O(log n) | O(n) |
| Space     | O(n)     | O(n)     | O(n) |

**Guaranteed** O(log n) for all operations!

---

## AVL vs Regular BST

### Height Guarantee
- **AVL**: Height is always **O(log n)**
- **BST**: Height can be **O(n)** (skewed)

### Maximum Height
For n nodes, AVL tree height ≤ **1.44 log₂(n)**

```
For 1000 nodes:
- AVL: height ≤ 14
- Skewed BST: height = 1000
```

---

## Comparison with Other Trees

| Feature | AVL | Red-Black | BST |
|---------|-----|-----------|-----|
| **Balance** | Strict | Relaxed | None |
| **Height** | ~1.44 log n | ~2 log n | Up to n |
| **Search** | Fastest | Fast | Variable |
| **Insert** | Slower | Faster | Fastest |
| **Use Case** | Frequent search | Frequent insert | Simple cases |

---

## Real-World Applications

### Databases
- **In-memory databases**: Fast lookups required
- **Indexing**: When read operations > write operations
- **Caching systems**: LRU cache with fast access

### File Systems
- **Directory structures**: Balanced access
- **File indexing**: Quick file location

### Graphics & Games
- **3D rendering**: Spatial partitioning
- **Collision detection**: Object tracking

### Language Runtimes
- **Maps/Dictionaries**: Some implementations use AVL
- **Symbol tables**: Compiler design

---

## Advantages

✓ **Guaranteed O(log n)** for all operations
✓ **Better search** than Red-Black trees
✓ **Highly balanced** (height difference ≤ 1)
✓ **Predictable performance**

## Limitations

✗ **More rotations** than Red-Black trees
✗ **Slower insertion** due to strict balancing
✗ **Higher constant factors** for modifications
✗ **Extra space** for storing heights

---

## When to Use AVL Trees

✓ **Use AVL when**:
- Search operations are **more frequent** than insertions
- Need **guaranteed** O(log n) performance
- Data is relatively **static**
- Strict balancing is required

✗ **Avoid AVL when**:
- Frequent insertions/deletions
- Can tolerate slightly worse search performance
- Need faster modifications (use Red-Black instead) 
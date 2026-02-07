# Binary Search Tree (BST)

A **Binary Search Tree** is a hierarchical data structure where each node has at most two children (left and right), and it maintains the **BST property**: all values in the left subtree are **less than** the node's value, and all values in the right subtree are **greater than** the node's value.

---

## BST Property

For every node in the tree:
- **Left subtree** contains only nodes with values **< node value**
- **Right subtree** contains only nodes with values **> node value**
- Both left and right subtrees are also BSTs

```
       50
      /  \
    30    70
   /  \  /  \
  20  40 60  80
```

---

## Core Operations

### Search - O(log n) average, O(n) worst
**Find a value in the tree**

1. Start at root
2. If value equals current node, found!
3. If value < current node, go **left**
4. If value > current node, go **right**
5. Repeat until found or reach NULL

### Insertion - O(log n) average, O(n) worst
**Add a new value**

1. Search for the value (as above)
2. When reaching NULL, insert new node there
3. Maintain BST property automatically

### Deletion - O(log n) average, O(n) worst
**Remove a node (3 cases)**

**Case 1: Leaf Node** (no children)
- Simply remove the node

**Case 2: One Child**
- Replace node with its child

**Case 3: Two Children**
- Find **inorder successor** (smallest in right subtree)
- Replace node value with successor
- Delete successor node

---

## Tree Traversals

### Inorder (Left-Root-Right)
**Produces sorted order**
```
For tree: 50, 30, 70, 20, 40
Inorder: 20, 30, 40, 50, 70 ✓ Sorted!
```

### Preorder (Root-Left-Right)
**Creates copy of tree**
```
Preorder: 50, 30, 20, 40, 70
Use: Tree serialization
```

### Postorder (Left-Right-Root)
**Deletes tree from leaves up**
```
Postorder: 20, 40, 30, 70, 50
Use: Tree deletion, expression evaluation
```

### Level-order (BFS)
**Level by level traversal**
```
Level-order: 50, 30, 70, 20, 40
Use: Finding shortest path
```

---

## Time Complexity

| Operation | Average | Worst Case | Best Case |
|-----------|---------|------------|----------|
| Search    | O(log n) | O(n)      | O(1)     |
| Insert    | O(log n) | O(n)      | O(1)     |
| Delete    | O(log n) | O(n)      | O(log n) |
| Traversal | O(n)     | O(n)      | O(n)     |

**Worst case** occurs when tree becomes **skewed** (like a linked list)

```
Skewed Tree:
  1
   \
    2
     \
      3  ← O(n) operations
       \
        4
```

---

## Properties

- **Height**: Number of edges on longest path from root to leaf
- **Depth**: Number of edges from root to a node
- **Balanced**: Height difference between subtrees ≤ 1
- **Complete**: All levels filled except possibly last

---

## Applications

### Databases & File Systems
- **Database Indexing**: B-trees are generalized BSTs
- **File Systems**: Directory structure
- **Priority Queues**: With heap property

### Search Operations
- **Dictionary**: Word lookups
- **Symbol Tables**: Compiler design
- **Auto-complete**: Prefix searching

### Algorithms
- **Expression Trees**: Mathematical expression parsing
- **Decision Trees**: Machine learning
- **Huffman Coding**: Data compression

---

## Advantages

✓ **Fast search** O(log n) average
✓ **Ordered data** (inorder gives sorted)
✓ **Dynamic**: Efficient insertion/deletion
✓ **Range queries**: Find all values in range

## Limitations

✗ **Can become unbalanced** (degrades to O(n))
✗ **No random access** like arrays
✗ **Extra memory** for pointers
✗ **Complex deletion** with two children

---

## Balanced Variants

To avoid worst-case O(n), use self-balancing trees:
- **AVL Tree**: Strict balancing (height difference ≤ 1)
- **Red-Black Tree**: Relaxed balancing, faster insertion
- **B-Tree**: Generalized for disk storage
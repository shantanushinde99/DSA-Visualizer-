# Red-Black Tree

A Red-Black Tree is a self-balancing binary search tree where each node stores an extra bit representing "color" (red or black), used to ensure the tree remains balanced during insertions and deletions.

## Properties

1. **Node Color**: Every node is either red or black
2. **Root Property**: The root is always black
3. **Leaf Property**: All leaves (NIL nodes) are black
4. **Red Property**: Red nodes cannot have red children (no two red nodes in a row)
5. **Black Height**: Every path from root to leaf has the same number of black nodes

## Operations

### Insertion
- Insert the new node as in a regular BST, colored red
- Fix violations by recoloring and rotating
- Ensure all properties are maintained

### Rotations
- **Left Rotation**: Pivot node becomes left child of its right child
- **Right Rotation**: Pivot node becomes right child of its left child

### Recoloring
- Change colors of nodes to maintain red-black properties
- Often combined with rotations for balancing

## Time Complexity

- **Search**: O(log n)
- **Insertion**: O(log n)
- **Deletion**: O(log n)
- **Space**: O(n)

## Advantages

- Guaranteed O(log n) operations
- More rigidly balanced than AVL trees
- Faster insertion and removal than AVL trees
- Used in many system libraries (e.g., Java TreeMap, C++ map)

## Use Cases

- Implementing associative arrays
- Functional programming (immutable data structures)
- Linux kernel scheduler
- Database indexing

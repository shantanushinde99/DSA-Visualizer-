# Stack Data Structure

A **stack** is a linear data structure that follows the **Last-In-First-Out (LIFO)** principle. Think of it like a stack of plates - you can only add or remove plates from the top.

---

## Core Operations

### Push - O(1)
**Adds an element to the top**
- Inserts a new element at the top of the stack
- Time Complexity: **O(1)** - constant time
- May cause **stack overflow** if the stack is full (in fixed-size implementations)

### Pop - O(1)
**Removes and returns the top element**
- Removes the most recently added element
- Time Complexity: **O(1)** - constant time
- May cause **stack underflow** if the stack is empty

### Peek/Top - O(1)
**Views the top element without removal**
- Returns the top element without modifying the stack
- Time Complexity: **O(1)** - constant time
- Useful for checking what will be popped next

---

## Key Properties

- **LIFO Order**: Last element added is first to be removed
- **Single Access Point**: Only the top element is directly accessible
- **Sequential Access**: Must remove top elements to access lower ones
- **Fixed/Dynamic Size**: Can be implemented with arrays (fixed) or linked lists (dynamic)

---

## Real-World Applications

### Programming & Systems
- **Function Call Stack**: Manages function calls and returns in programming languages
- **Expression Evaluation**: Converts and evaluates infix, prefix, and postfix expressions
- **Syntax Parsing**: Checks matching brackets, parentheses, and braces

### User Interfaces
- **Undo/Redo Operations**: Text editors, graphics software (Ctrl+Z)
- **Browser Navigation**: Back button functionality
- **Page History**: Navigation through previously visited pages

### Algorithms
- **Depth-First Search (DFS)**: Graph and tree traversal
- **Backtracking**: N-Queens, Sudoku solver, maze solving
- **Memory Management**: Allocation and deallocation of memory blocks

---

## Time Complexity Summary

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Push      | O(1)           | O(1)             |
| Pop       | O(1)           | O(1)             |
| Peek      | O(1)           | O(1)             |
| Search    | O(n)           | O(1)             |

---

## Advantages

✓ Fast insertion and deletion (O(1))
✓ Simple implementation
✓ Memory efficient
✓ Cache-friendly (for array implementation)

## Limitations

✗ No random access to elements
✗ Limited to top element operations
✗ Fixed size in array implementation 
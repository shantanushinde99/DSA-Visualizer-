# Backtracking Algorithms

Backtracking is a general algorithmic technique for finding solutions to computational problems by incrementally building candidates and abandoning a candidate ("backtracking") as soon as it determines the candidate cannot lead to a valid solution.

## Core Concept

Think of backtracking as exploring a maze:
- Try a path
- If it leads to dead end, go back and try another path
- Continue until you find the exit or exhaust all paths

## How It Works

1. **Choose**: Select an option from available choices
2. **Explore**: Recursively explore this choice
3. **Unchoose**: If choice doesn't work, undo it (backtrack)
4. **Try Next**: Try the next available option

## General Template

```
function backtrack(state):
    if is_solution(state):
        record_solution(state)
        return
    
    for each choice in available_choices(state):
        if is_valid(choice, state):
            make_choice(choice, state)
            backtrack(state)
            undo_choice(choice, state)  # Backtrack
```

## Classic Problems

### N-Queens Problem
Place N chess queens on N×N board so no two queens threaten each other.

**Constraints:**
- No two queens in same row
- No two queens in same column
- No two queens in same diagonal

**Approach:**
- Place queens row by row
- For each row, try each column
- Backtrack if placement violates constraints

### Sudoku Solver
Fill 9×9 grid so each row, column, and 3×3 box contains digits 1-9.

**Constraints:**
- Each row must have unique numbers 1-9
- Each column must have unique numbers 1-9
- Each 3×3 box must have unique numbers 1-9

**Approach:**
- Find empty cell
- Try digits 1-9
- Backtrack if digit violates constraints

### Maze Solver
Find path from start to end in a maze.

**Constraints:**
- Cannot go through walls
- Cannot revisit cells (in most variants)

**Approach:**
- Try moving in each direction (up, down, left, right)
- Mark visited cells
- Backtrack if path leads to dead end

### Knight's Tour
Move a chess knight to visit every square on board exactly once.

**Constraints:**
- Must use valid knight moves (L-shape: 2+1 or 1+2)
- Must visit each square exactly once

**Approach:**
- Try each possible knight move
- Mark visited squares
- Backtrack if no valid moves remain

## Optimization Techniques

### Pruning
Eliminate branches that cannot lead to solution early.

### Constraint Propagation
After each choice, immediately propagate constraints to reduce search space.

### Heuristics
Use domain-specific knowledge to try most promising options first.

### Memoization
Cache results of subproblems to avoid redundant computation.

## Time Complexity

Generally **exponential** in nature:
- N-Queens: O(N!)
- Sudoku: O(9^(n×n)) worst case, but pruning helps significantly
- Maze: O(4^(n×m)) worst case
- Knight's Tour: O(8^(n×n))

Actual runtime depends heavily on:
- Quality of pruning
- Order of trying choices
- Problem constraints

## Space Complexity

Usually **O(N)** for recursion stack depth, where N is the depth of solution.

## When to Use Backtracking

Use backtracking when:
- ✅ Need to find all solutions
- ✅ Need to find one valid solution
- ✅ Problem has clear constraints
- ✅ Can incrementally build and validate solutions
- ✅ No better algorithm exists (often NP-complete problems)

Don't use backtracking when:
- ❌ Problem can be solved with greedy algorithm
- ❌ Dynamic programming applies
- ❌ Problem has polynomial solution

## Applications

- **Puzzle Solving**: Sudoku, crosswords, logic puzzles
- **Game AI**: Chess, checkers (with alpha-beta pruning)
- **Constraint Satisfaction**: Scheduling, resource allocation
- **Combinatorial Optimization**: Subset sum, graph coloring
- **Pattern Matching**: Regular expressions
- **Parsing**: Compiler design, natural language processing

## Advantages

- Simple to implement recursively
- Finds all solutions systematically
- Memory efficient (O(N) space)
- Guaranteed to find solution if it exists

## Disadvantages

- Can be very slow (exponential time)
- Not suitable for large problem instances
- May need extensive pruning for efficiency
- Recursive implementation can cause stack overflow

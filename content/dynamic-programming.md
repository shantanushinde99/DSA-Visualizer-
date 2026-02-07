# Dynamic Programming

## Overview

**Dynamic Programming (DP)** is an algorithmic paradigm that solves complex problems by breaking them down into simpler overlapping subproblems and storing their solutions to avoid redundant computations.

## Key Concepts

### 1. Optimal Substructure
A problem has optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.

**Example**: In Fibonacci, F(n) = F(n-1) + F(n-2)

### 2. Overlapping Subproblems
The same subproblems are solved multiple times in a naive recursive approach.

**Example**: Computing F(5) requires F(4) and F(3), and F(4) also needs F(3) again.

### 3. Memoization (Top-Down)
- Start with the original problem
- Recursively solve subproblems
- Store results in a cache (memo table)
- Return cached result if subproblem already solved

```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

### 4. Tabulation (Bottom-Up)
- Start with smallest subproblems (base cases)
- Iteratively build up to the original problem
- Fill a DP table systematically
- Our visualizer uses this approach

```python
def fib_tabulation(n):
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

## Classic DP Problems

### 1. Fibonacci Number
**Problem**: Compute the nth Fibonacci number  
**Recurrence**: F(n) = F(n-1) + F(n-2), F(0)=0, F(1)=1  
**Complexity**: O(n) time, O(n) space  
**Application**: Growth patterns, golden ratio, recursion teaching

### 2. Longest Common Subsequence (LCS)
**Problem**: Find the longest subsequence common to two strings  
**Recurrence**:
```
LCS[i][j] = LCS[i-1][j-1] + 1           if str1[i] == str2[j]
          = max(LCS[i-1][j], LCS[i][j-1]) otherwise
```
**Complexity**: O(m×n) time, O(m×n) space  
**Applications**:
- Diff tools (git diff)
- DNA sequence alignment
- File comparison
- Plagiarism detection

### 3. 0/1 Knapsack
**Problem**: Maximize value within weight capacity constraint  
**Recurrence**:
```
dp[i][w] = max(
    value[i] + dp[i-1][w-weight[i]],  // include item i
    dp[i-1][w]                         // exclude item i
)
```
**Complexity**: O(n×W) time, O(n×W) space  
**Applications**:
- Resource allocation
- Budget planning
- Portfolio optimization
- Cargo loading

### 4. Coin Change (Minimum Coins)
**Problem**: Find minimum coins needed to make target amount  
**Recurrence**:
```
dp[amount] = min(dp[amount], dp[amount - coin] + 1) for each coin
```
**Complexity**: O(n×amount) time, O(amount) space  
**Applications**:
- Currency exchange
- Vending machines
- Making change optimally
- Payment systems

### 5. Edit Distance (Levenshtein Distance)
**Problem**: Minimum operations to transform one string to another  
**Operations**: Insert, Delete, Replace  
**Recurrence**:
```
dp[i][j] = min(
    dp[i-1][j] + 1,      // delete
    dp[i][j-1] + 1,      // insert
    dp[i-1][j-1] + cost  // replace (cost=0 if match, 1 otherwise)
)
```
**Complexity**: O(m×n) time, O(m×n) space  
**Applications**:
- Spell checkers
- DNA sequence alignment
- String similarity metrics
- Auto-correction systems

## DP Problem Patterns

### Linear DP
- 1D array/table
- Examples: Fibonacci, Climbing Stairs, House Robber
- Build solution from left to right

### 2D DP
- 2D table (matrix)
- Examples: LCS, Edit Distance, Knapsack
- Two dimensions represent two input sequences/constraints

### Sequence DP
- Process input sequence element by element
- Examples: Longest Increasing Subsequence, Maximum Subarray

### Grid DP
- Navigate a grid/matrix
- Examples: Unique Paths, Minimum Path Sum

### State Machine DP
- Track states with transitions
- Examples: Stock Buy/Sell, Paint House

## Steps to Solve DP Problems

1. **Identify the Problem Type**
   - Does it have optimal substructure?
   - Are there overlapping subproblems?

2. **Define the State**
   - What information do we need to track?
   - What are the dimensions of our DP table?

3. **Establish Base Cases**
   - What are the simplest subproblems?
   - Initialize DP table with base values

4. **Find the Recurrence Relation**
   - How does dp[i] relate to previous states?
   - What choices/transitions exist?

5. **Determine Iteration Order**
   - Which order fills the table correctly?
   - Ensure dependencies are computed first

6. **Compute Final Answer**
   - Where in the DP table is our answer?
   - May need to reconstruct the solution path

## Time vs Space Tradeoff

### Space Optimization Techniques

**Rolling Array**:
```python
# Instead of dp[n][m], use dp[2][m] or dp[prev][curr]
# Only keep previous row for 2D DP
```

**1D Array Reuse**:
```python
# Process in reverse order to avoid overwriting needed values
for i in range(n, -1, -1):
    dp[i] = ...  # uses dp[i+1], dp[i+2], etc.
```

**Fibonacci Example**:
```python
# O(n) space
def fib_array(n):
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# O(1) space
def fib_optimized(n):
    if n <= 1: return n
    prev, curr = 0, 1
    for _ in range(2, n+1):
        prev, curr = curr, prev + curr
    return curr
```

## When NOT to Use DP

- **No overlapping subproblems**: Use divide and conquer instead
- **No optimal substructure**: Greedy or other approaches may work
- **Space constraints are critical**: Recursive memoization may be too heavy
- **Simple greedy solution exists**: DP may be overkill

## Common Mistakes

1. **Wrong iteration order**: Dependencies not satisfied
2. **Off-by-one errors**: Array indexing issues
3. **Incorrect base cases**: Leading to wrong final answer
4. **Not handling edge cases**: Empty strings, zero capacity, etc.
5. **Overcomplicating state**: Too many dimensions than needed

## DP vs Other Paradigms

| Aspect | Dynamic Programming | Greedy | Divide & Conquer |
|--------|-------------------|--------|-----------------|
| Approach | Solve all subproblems | Make local optimal choice | Split into independent parts |
| Subproblems | Overlapping | No storage needed | Non-overlapping |
| Optimality | Guaranteed optimal | Not always optimal | Depends on problem |
| Examples | Knapsack, LCS | Dijkstra, Huffman | Merge Sort, Binary Search |

## Advanced Topics

### State Compression
Use bitmasks to represent states compactly in problems with subset choices.

### Digit DP
Count numbers with certain properties (e.g., count numbers with no consecutive 1s in binary).

### Tree DP
Apply DP on tree structures (e.g., maximum independent set on tree).

### DP with Binary Search
Optimize DP transition using binary search (e.g., Longest Increasing Subsequence in O(n log n)).

## Practice Strategy

1. **Master classic problems first**: Fibonacci, Knapsack, LCS
2. **Identify patterns**: Recognize similar problem structures
3. **Draw the table**: Visualize how values are computed
4. **Trace through small examples**: Understand the logic
5. **Code both approaches**: Memoization and Tabulation
6. **Optimize space**: After getting correct solution

## Complexity Analysis

| Problem | Time | Space | Optimized Space |
|---------|------|-------|-----------------|
| Fibonacci | O(n) | O(n) | O(1) |
| LCS | O(mn) | O(mn) | O(min(m,n)) |
| Knapsack | O(nW) | O(nW) | O(W) |
| Coin Change | O(n×amt) | O(amt) | O(amt) |
| Edit Distance | O(mn) | O(mn) | O(min(m,n)) |

## Resources

- **Book**: "Introduction to Algorithms" (CLRS), Chapter 15
- **Course**: MIT 6.006, Lecture on Dynamic Programming
- **Practice**: LeetCode DP tag, Codeforces DP problems
- **Visualization**: This tool! Experiment with different inputs

---

**Key Takeaway**: Dynamic Programming transforms exponential-time brute force solutions into polynomial-time algorithms by remembering what we've already computed. Master the patterns, and you'll recognize DP opportunities everywhere!

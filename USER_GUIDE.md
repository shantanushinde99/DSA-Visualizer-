# Quick Start Guide - DSA Visualizers

## 🚀 How to Use Each Visualizer

### 1. Hash Table (`/visualizer/hash-table`)
**What it teaches:** Hash tables, collision resolution, load factor

**How to use:**
1. Select collision method (Chaining, Linear Probing, or Quadratic Probing)
2. Enter a key-value pair (e.g., key: "apple", value: "fruit")
3. Click "Insert" - watch how collisions are handled
4. Try "Search" to find values
5. Observe the hash table buckets and color coding
6. Watch load factor change (auto-resize at 0.75)

**Try this:** Insert multiple keys that hash to same bucket to see collision handling!

---

### 2. Sorting Algorithms (`/visualizer/sorting`)
**What it teaches:** Comparison sorts, time complexity, stability

**How to use:**
1. Choose algorithm (Bubble, Selection, Insertion, Merge, Quick, Heap)
2. Enter custom array or click "Generate Random"
3. Click "Sort" - watch the algorithm work step-by-step
4. Use step controls to go forward/backward
5. Observe color coding:
   - Blue: Comparing
   - Red: Swapping
   - Green: Sorted

**Try this:** Compare Bubble Sort vs Merge Sort on same array!

---

### 3. Graph Traversal (`/visualizer/graph-traversal`)
**What it teaches:** BFS, DFS, graph representation, queue vs stack

**How to use:**
1. Choose BFS or DFS
2. Select example graph or create custom
3. Pick starting vertex
4. Click "Start Traversal"
5. Watch queue/stack in action
6. See visited nodes turn green

**Try this:** Run BFS and DFS on same graph - notice the difference!

---

### 4. Trie (`/visualizer/trie`)
**What it teaches:** Prefix trees, autocomplete, string searching

**How to use:**
1. Enter words one by one (e.g., "cat", "car", "card")
2. Click "Insert" for each
3. Try "Search" for complete words
4. Use "Autocomplete" with prefix (e.g., "ca" finds "cat", "car", "card")
5. "Delete" removes words carefully

**Try this:** Insert multiple words with common prefixes, then autocomplete!

---

### 5. Dynamic Programming (`/visualizer/dynamic-programming`)
**What it teaches:** DP patterns, memoization, recurrence relations

**How to use:**
1. Select problem (Fibonacci, LCS, Knapsack, Coin Change, Edit Distance)
2. Enter problem-specific inputs
3. Click "Solve with Dynamic Programming"
4. Watch the 2D table fill up cell by cell
5. Navigate steps to understand state transitions

**Examples:**
- **Fibonacci:** n=10
- **LCS:** "ABCDGH" and "AEDFHR"
- **Knapsack:** weights=[2,3,4,5], values=[3,4,5,6], capacity=8
- **Coin Change:** coins=[1,2,5], amount=11
- **Edit Distance:** "kitten" to "sitting"

---

### 6. Backtracking (`/visualizer/backtracking`)
**What it teaches:** Constraint satisfaction, decision trees, pruning

**How to use:**
1. Choose problem (N-Queens, Rat in Maze, Knight's Tour)
2. Set board size (4-8 recommended)
3. Click "Solve with Backtracking"
4. Watch algorithm try paths and backtrack
5. See dead ends and successful solutions

**Try this:**
- **N-Queens:** Try 4×4 (easy) then 8×8 (harder)
- **Maze:** Random maze each time!
- **Knight's Tour:** Start with 5×5 (warning: can be slow)

---

### 7. Minimum Spanning Tree (`/visualizer/mst`)
**What it teaches:** Greedy algorithms, MST, Kruskal vs Prim

**How to use:**
1. Choose algorithm (Kruskal or Prim)
2. Set number of vertices (4-8)
3. Click "Generate Random Graph"
4. Click "Find Minimum Spanning Tree"
5. Watch edges get selected/rejected
6. See total MST cost at the end

**Compare:** Run both algorithms on same graph - same MST, different process!

---

## 🎨 Understanding the Color Codes

### Common across all visualizers:
- **Blue:** Current item being processed
- **Green:** Completed/selected items
- **Red/Orange:** Rejected/backtracked items
- **Yellow:** Highlighted/focused items
- **Gray:** Unvisited/inactive items

### Specific to each:
- **Hash Table:** 
  - Empty bucket: Gray
  - Occupied: Green
  - Collision chain: Connected boxes
  
- **Sorting:**
  - Unsorted: White
  - Comparing: Blue
  - Swapping: Red
  - Sorted: Green
  
- **Graph Traversal:**
  - Unvisited: Gray
  - In queue/stack: Blue
  - Visited: Green
  
- **Backtracking:**
  - Try: Blue
  - Place/Move: Green
  - Backtrack: Orange
  - Success: Dark Green

---

## 📚 Learning Tips

### For Students:
1. **Start slow:** Use step-by-step navigation, don't rush
2. **Read descriptions:** Each step explains what's happening
3. **Try edge cases:** Empty input, single item, duplicate values
4. **Compare algorithms:** See why some are faster
5. **Use analysis panel:** Understand time/space complexity

### For Teachers:
1. **Live demos:** Project visualizer during lectures
2. **Assignments:** Have students explain algorithm steps
3. **Comparisons:** Show why we need different algorithms
4. **Real-world:** Connect to analysis panel's applications
5. **Quiz questions:** "At step X, what will happen next?"

---

## 🐛 Troubleshooting

**Visualizer not showing?**
- Refresh the page
- Check browser console for errors
- Ensure JavaScript is enabled

**Steps not navigating?**
- Click "Solve" or "Start" first
- Wait for algorithm to complete generating steps

**TypeScript errors in console?**
- These are development-time only
- Don't affect visualizer functionality
- Will resolve after TypeScript re-indexes

**Slow performance?**
- Reduce input size (especially Knight's Tour)
- Close other browser tabs
- Some algorithms are inherently slow (that's the point!)

---

## 🎯 Recommended Learning Path

**Beginner:**
1. Hash Table (Chaining method)
2. Sorting Algorithms (Bubble → Merge)
3. Graph Traversal (BFS first)

**Intermediate:**
4. Trie (Insert and Search)
5. Dynamic Programming (Fibonacci → LCS)
6. MST (Kruskal's)

**Advanced:**
7. Dynamic Programming (Knapsack, Edit Distance)
8. Backtracking (N-Queens → Knight's Tour)
9. All collision methods in Hash Table
10. Compare Kruskal vs Prim

---

## 📝 Example Sessions

### Session 1: "Understanding Sorting" (30 min)
1. Open Sorting visualizer
2. Try Bubble Sort on [5,2,8,1,9]
3. Count comparisons and swaps
4. Try Merge Sort on same array
5. Compare step counts
6. Read analysis panel
7. Answer: "Why is Merge Sort faster?"

### Session 2: "Graph Traversal Patterns" (30 min)
1. Open Graph Traversal
2. Load "Binary Tree" example
3. Run BFS from node 0
4. Observe queue behavior (level-order)
5. Reset, run DFS from node 0
6. Observe stack behavior (depth-first)
7. Answer: "When to use BFS vs DFS?"

### Session 3: "Dynamic Programming Intro" (45 min)
1. Open DP visualizer
2. Start with Fibonacci (n=7)
3. Observe table filling bottom-up
4. Move to LCS with simple strings
5. Trace back the actual LCS
6. Try Coin Change
7. Answer: "How does DP avoid recomputation?"

---

## ✨ Pro Tips

1. **Use keyboard:** Arrow keys often work for step navigation
2. **Bookmark favorites:** Save URLs for quick access
3. **Screenshot steps:** Capture interesting moments
4. **Experiment freely:** You can't break anything!
5. **Read tooltips:** Hover over elements for more info
6. **Check analysis:** Always read the "Analysis" panel
7. **Reset often:** Don't be afraid to start over
8. **Compare inputs:** Try sorted, reverse, random arrays

---

## 🔗 URL Reference

Quick access to all visualizers:

```
Base URL: http://localhost:3000 (or your deployment URL)

/visualizer/hash-table
/visualizer/sorting
/visualizer/graph-traversal
/visualizer/trie
/visualizer/dynamic-programming
/visualizer/backtracking
/visualizer/mst
```

---

**Happy Learning! 🎓**

Remember: The goal isn't just to see algorithms run, but to **understand why** they work the way they do!

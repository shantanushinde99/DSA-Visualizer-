# Sorting Algorithms

Sorting algorithms arrange elements in a specific order (typically ascending or descending). Understanding different sorting algorithms is fundamental to computer science and helps develop algorithmic thinking.

## Algorithm Overview

### 1. Bubble Sort
**Simple comparison-based sorting**

Repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.

**How it works:**
- Compare adjacent pairs
- Swap if out of order
- Repeat until no swaps needed
- Larger elements "bubble" to the end

### 2. Selection Sort
**Minimum selection approach**

Divides the array into sorted and unsorted portions. Repeatedly finds the minimum element from the unsorted portion and moves it to the end of the sorted portion.

**How it works:**
- Find minimum in unsorted portion
- Swap with first unsorted element
- Expand sorted portion by one
- Repeat until done

### 3. Insertion Sort
**Build sorted array one element at a time**

Builds the final sorted array one item at a time, inserting each new element into its proper position among the previously sorted elements.

**How it works:**
- Start with second element
- Compare with sorted portion
- Shift elements to make space
- Insert element in correct position
- Repeat for all elements

### 4. Merge Sort
**Divide and conquer approach**

Divides the array into two halves, recursively sorts them, and then merges the two sorted halves back together.

**How it works:**
- Divide array into halves
- Recursively sort each half
- Merge sorted halves
- Uses additional space for merging

### 5. Quick Sort
**Partition-based sorting**

Selects a 'pivot' element and partitions the array around it, placing smaller elements before the pivot and larger elements after it, then recursively sorts the partitions.

**How it works:**
- Choose pivot element
- Partition array around pivot
- Elements less than pivot go left
- Elements greater than pivot go right
- Recursively sort partitions

### 6. Heap Sort
**Heap data structure utilization**

Builds a max heap from the array, then repeatedly extracts the maximum element and rebuilds the heap until sorted.

**How it works:**
- Build max heap from array
- Swap root (max) with last element
- Reduce heap size
- Heapify root
- Repeat until sorted

## Complexity Comparison

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

## Key Concepts

### Stability
A sorting algorithm is **stable** if it preserves the relative order of equal elements. This matters when sorting objects with multiple fields.

**Stable:** Bubble, Insertion, Merge  
**Unstable:** Selection, Quick, Heap

### In-Place Sorting
An algorithm is **in-place** if it uses O(1) or O(log n) extra space. It modifies the input array directly rather than creating a copy.

**In-Place:** Bubble, Selection, Insertion, Quick (with care), Heap  
**Not In-Place:** Merge (requires O(n) space)

### Adaptive Algorithms
An **adaptive** algorithm takes advantage of existing order in the input, running faster on partially sorted data.

**Adaptive:** Bubble, Insertion  
**Non-Adaptive:** Selection, Merge, Heap, Quick

## When to Use Each Algorithm

### Bubble Sort
- ✅ Teaching and learning
- ✅ Very small datasets (< 10 elements)
- ✅ Nearly sorted data
- ❌ Any production code
- ❌ Large datasets

### Selection Sort
- ✅ When memory writes are expensive
- ✅ Small datasets
- ✅ When swap count matters more than comparisons
- ❌ Large datasets
- ❌ When stability is required

### Insertion Sort
- ✅ Small datasets (< 50 elements)
- ✅ Nearly sorted data
- ✅ Online sorting (data arrives over time)
- ✅ Part of hybrid algorithms (Timsort, Introsort)
- ❌ Large random datasets

### Merge Sort
- ✅ Large datasets
- ✅ When stable sort is required
- ✅ External sorting (data doesn't fit in memory)
- ✅ Linked lists
- ✅ Guaranteed O(n log n) performance
- ❌ When space is severely limited

### Quick Sort
- ✅ General-purpose sorting
- ✅ Large datasets
- ✅ When average performance matters most
- ✅ Good cache performance needed
- ❌ When worst-case O(n log n) is critical
- ❌ When stability is required

### Heap Sort
- ✅ When worst-case O(n log n) is required
- ✅ Space is limited (in-place)
- ✅ Priority queue operations
- ❌ When stability is required
- ❌ When cache performance matters (poor locality)

## Real-World Usage

### Language Standard Libraries
- **Python:** Timsort (hybrid of Merge + Insertion)
- **Java:** Dual-Pivot Quick Sort (primitives), Tim Sort (objects)
- **C++ STL:** Introsort (hybrid of Quick + Heap + Insertion)
- **JavaScript:** Varies (often Merge Sort or Quick Sort)

### Hybrid Algorithms
Modern implementations often use **hybrid approaches:**

1. **Timsort:** Merge + Insertion
   - Used in Python, Java
   - Exploits runs of sorted data
   - Very efficient for real-world data

2. **Introsort:** Quick + Heap + Insertion
   - Used in C++ STL
   - Starts with Quick Sort
   - Switches to Heap Sort if recursion depth exceeds limit
   - Uses Insertion Sort for small partitions

## Performance Tips

1. **For small arrays (< 50):** Use Insertion Sort
2. **For nearly sorted data:** Use Insertion Sort or Bubble Sort
3. **For guaranteed performance:** Use Merge Sort or Heap Sort
4. **For average-case speed:** Use Quick Sort
5. **For stability:** Use Merge Sort or Bubble/Insertion
6. **For minimal space:** Use Heap Sort or Quick Sort

## Try It Yourself!

Use the visualizer to:
- Compare algorithms on same data
- See how they handle sorted/reversed data
- Count comparisons and swaps
- Understand the step-by-step process
- Observe time complexity in action

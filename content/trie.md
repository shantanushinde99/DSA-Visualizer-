# Trie (Prefix Tree)

A **Trie** (pronounced "try"), also called a prefix tree, is a tree-like data structure used to store and retrieve strings efficiently. It excels at prefix-based operations and is widely used in autocomplete systems.

## Structure

Each node in a trie represents a single character. A path from the root to a node represents a prefix, and paths ending at marked nodes represent complete words.

```
       (root)
       /  |  \
      c   d   h
     /    |    \
    a     o     i
   / \    |
  t   r   g
      |
      e
```

This trie stores: cat, car, care, dog, hi

## Key Concepts

### Node Structure
```javascript
class TrieNode {
  children: Map<char, TrieNode>
  isEndOfWord: boolean
}
```

### Advantages
- ✅ Fast prefix searches: O(m) where m = string length
- ✅ No hash collisions
- ✅ Alphabetically sorted output
- ✅ Space-efficient for shared prefixes
- ✅ Can outperform hash tables for string operations

### Disadvantages
- ❌ Can use more memory than hash tables
- ❌ Slower than hash tables for exact matches
- ❌ Cache performance can be poor
- ❌ More complex implementation

## Operations

### Insert - O(m)
```
1. Start at root
2. For each character in word:
   a. If child exists, move to it
   b. Otherwise, create new child
3. Mark last node as end-of-word
```

### Search - O(m)
```
1. Start at root
2. For each character:
   a. If child doesn't exist, return false
   b. Move to child
3. Return whether current node is end-of-word
```

### Autocomplete - O(m + k)
```
1. Navigate to prefix (O(m))
2. Perform DFS from that node
3. Collect all words (O(k))
```
Where k = number of words with prefix

### Delete - O(m)
```
1. Navigate to word's end
2. Remove end-of-word marker
3. Delete nodes with no other children (backtrack)
```

## Time Complexity

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Insert | O(m) | m = word length |
| Search | O(m) | m = word length |
| Delete | O(m) | m = word length |
| Prefix Search | O(m) | m = prefix length |
| Autocomplete | O(m + k) | k = suggestions count |
| Space | O(n × m) | n = words, m = avg length |

## Common Use Cases

### 1. Autocomplete Systems
Perfect for search suggestions:
```
User types: "ca"
Trie returns: ["cat", "car", "care", "card"]
```

### 2. Spell Checkers
- Fast dictionary lookup
- Suggest corrections based on prefix
- Find words with similar prefixes

### 3. IP Routing
- Longest prefix matching
- Efficient IP address lookup
- Used in routers and firewalls

### 4. Text Prediction
- Mobile keyboard suggestions
- T9 predictive text
- Word completion

### 5. Genome Sequences
- DNA sequence analysis
- Pattern matching in genes
- Biological data indexing

## Variants

### 1. Compressed Trie (Radix Tree)
- Combines nodes with single children
- Saves space
- Used in Git, routing tables

### 2. Ternary Search Trie
- Each node has 3 children: <, =, >
- More space-efficient
- Faster than standard trie for some operations

### 3. Suffix Trie
- Stores all suffixes of strings
- Used for pattern matching
- Foundation for suffix arrays

## Optimization Techniques

### Memory Optimization
1. Use arrays instead of hashmaps for small alphabets
2. Compress single-child chains
3. Use bit vectors for end-of-word markers
4. Share common suffixes (DAWGs)

### Performance Tips
1. Pre-allocate children arrays for fixed alphabets
2. Use cache-friendly layouts
3. Implement lazy deletion
4. Balance between time and space

## Comparison with Hash Tables

### Trie Wins When:
- ✅ Need prefix-based operations
- ✅ Want sorted output
- ✅ Have many shared prefixes
- ✅ Need predictable worst-case time

### Hash Table Wins When:
- ✅ Only need exact matches
- ✅ Have random strings (few shared prefixes)
- ✅ Need better average-case space
- ✅ Want simpler implementation

## Real-World Applications

### Google Search
- Autocomplete suggestions
- "Did you mean?" corrections
- Related searches

### Mobile Keyboards
- SwiftKey, Gboard predictions
- T9 predictive text
- Emoji suggestions

### Network Routers
- IP address routing
- Longest prefix matching
- Fast packet forwarding

### Databases
- Index prefix searches
- Text search engines
- Auto-suggest features

### IDE/Text Editors
- Code completion
- Syntax highlighting
- Variable name suggestions

## Example Walkthrough

### Building a Trie
Words: ["cat", "car", "card"]

```
Step 1: Insert "cat"
    (root)
      |
      c
      |
      a
      |
      t*    (* = end of word)

Step 2: Insert "car"
    (root)
      |
      c
      |
      a
     / \
    t*  r*

Step 3: Insert "card"
    (root)
      |
      c
      |
      a
     / \
    t*  r*
        |
        d*
```

### Search "car"
1. root → c (exists)
2. c → a (exists)
3. a → r (exists)
4. r is end-of-word ✓
Result: Found!

### Autocomplete "ca"
1. Navigate: root → c → a
2. DFS from 'a': finds t*, r*, d*
3. Build words: cat, car, card
Result: ["cat", "car", "card"]

## Implementation Considerations

### Alphabet Size
- **Small (26 letters):** Use arrays
- **Large (Unicode):** Use hashmaps
- **Unknown:** Use dynamic structures

### Memory vs Speed
- **Speed Priority:** Pre-allocate arrays
- **Memory Priority:** Use hashmaps/pointers
- **Balanced:** Use hybrid approaches

### Thread Safety
- Immutable tries for concurrent reads
- Lock-based for writes
- Lock-free with atomic operations

## Practice Problems

1. Implement autocomplete system
2. Word search in 2D grid
3. Replace words (string substitution)
4. Longest word in dictionary
5. Stream of characters (build trie online)
6. Design search autocomplete system
7. Maximum XOR of two numbers

## Try It Yourself!

Use this visualizer to:
- 🌳 See trie structure grow
- 🔍 Watch search operations
- 💡 Explore autocomplete
- 🗑️ Understand deletion
- 📊 Compare with other structures

Insert some words and explore how the trie organizes them efficiently!

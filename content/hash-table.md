# Hash Table

A **Hash Table** (also called Hash Map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

## Key Concepts

### Hash Function
A hash function takes a key and computes an integer (hash value) that determines the index where the value should be stored. A good hash function:
- Distributes keys uniformly across the table
- Is deterministic (same key always produces same hash)
- Is fast to compute
- Minimizes collisions

### Collision Resolution

When two different keys hash to the same index, a **collision** occurs. There are several methods to handle collisions:

#### 1. Separate Chaining
- Each bucket contains a linked list of entries
- Multiple entries can share the same index
- Simple to implement
- Allows load factor > 1
- Extra memory for pointers

#### 2. Linear Probing (Open Addressing)
- If a slot is occupied, check the next slot
- Probe sequence: h(k), h(k)+1, h(k)+2, ...
- Can cause primary clustering
- No extra memory for pointers
- Must handle deletions carefully

#### 3. Quadratic Probing (Open Addressing)
- Uses quadratic function for probing
- Probe sequence: h(k), h(k)+1², h(k)+2², ...
- Reduces primary clustering
- May not probe all slots
- Better distribution than linear probing

### Load Factor

The **load factor** (α) is the ratio of the number of entries to the number of buckets:

```
α = n / m
```

where:
- n = number of entries
- m = number of buckets

**Guidelines:**
- Chaining: Typically rehash when α > 0.75
- Open Addressing: Rehash when α > 0.5 for better performance

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|--------------|------------|
| Insert    | O(1)         | O(n)       |
| Search    | O(1)         | O(n)       |
| Delete    | O(1)         | O(n)       |

**Note:** Average case assumes a good hash function with uniform distribution. Worst case occurs when all keys hash to the same index.

## Space Complexity

- **Chaining:** O(n + m) where n is the number of entries and m is table size
- **Open Addressing:** O(n) where n is the table size

## Common Operations

### Insert
1. Compute hash value: `index = hash(key) % tableSize`
2. Handle collision if slot is occupied
3. Insert key-value pair

### Search
1. Compute hash value for the key
2. Follow collision resolution method to find the key
3. Return value if found, null otherwise

### Delete
1. Compute hash value for the key
2. Find the entry using collision resolution
3. Remove the entry
4. For open addressing, may need lazy deletion (mark as deleted)

## Use Cases

Hash tables are ideal for:
- **Databases:** Fast record lookup
- **Caches:** Quick data retrieval
- **Symbol Tables:** Compiler implementation
- **Dictionaries:** Language implementations
- **Sets:** Unique element storage
- **Counting:** Frequency counting

## Advantages

1. **Fast Operations:** O(1) average case for insert, search, delete
2. **Flexible Keys:** Can use any hashable type as key
3. **Dynamic Size:** Can grow/shrink as needed
4. **Space Efficient:** Good space utilization with proper load factor

## Disadvantages

1. **Unordered:** No inherent ordering of elements
2. **Hash Function Dependency:** Performance depends on hash function quality
3. **Collisions:** Must handle collisions efficiently
4. **Memory Overhead:** Requires extra space for collision handling
5. **Worst Case:** Can degrade to O(n) with poor hash function

## Best Practices

1. Choose appropriate initial table size (typically a prime number)
2. Monitor load factor and resize when needed
3. Use a good hash function for your key type
4. Consider the collision resolution method based on use case
5. For open addressing, keep load factor < 0.7
6. For chaining, keep load factor < 1.0

## Implementation Notes

This visualization demonstrates:
- Three collision resolution methods
- Dynamic table resizing
- Hash function visualization
- Load factor monitoring
- Step-by-step operation tracking

Try different collision methods to understand their trade-offs!

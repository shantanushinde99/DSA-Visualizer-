import { useState, useCallback } from "react";

export type CollisionMethod = "chaining" | "linear-probing" | "quadratic-probing";

export interface HashEntry {
  key: string;
  value: number;
  hash: number;
}

export interface Bucket {
  index: number;
  entries: HashEntry[];
  isHighlighted?: boolean;
}

export interface HashTableStep {
  action: string;
  key?: string;
  value?: number;
  hash?: number;
  probeSequence?: number[];
  description: string;
}

export function useHashTable(initialSize: number = 10) {
  const [size, setSize] = useState(initialSize);
  const [buckets, setBuckets] = useState<Bucket[]>(() =>
    Array.from({ length: initialSize }, (_, i) => ({ index: i, entries: [] }))
  );
  const [collisionMethod, setCollisionMethod] = useState<CollisionMethod>("chaining");
  const [steps, setSteps] = useState<HashTableStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const hashFunction = useCallback((key: string, tableSize: number): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % tableSize;
    }
    return hash;
  }, []);

  const loadFactor = itemCount / size;

  const insert = useCallback((key: string, value: number) => {
    const hash = hashFunction(key, size);
    const newSteps: HashTableStep[] = [
      {
        action: "hash",
        key,
        value,
        hash,
        description: `Computing hash for key "${key}": hash = ${hash}`,
      },
    ];

    const newBuckets = buckets.map((bucket) => ({ ...bucket, entries: [...bucket.entries] }));

    if (collisionMethod === "chaining") {
      const existingIndex = newBuckets[hash].entries.findIndex((e) => e.key === key);
      if (existingIndex !== -1) {
        newBuckets[hash].entries[existingIndex] = { key, value, hash };
        newSteps.push({
          action: "update",
          key,
          value,
          hash,
          description: `Updated existing key "${key}" at bucket ${hash}`,
        });
      } else {
        newBuckets[hash].entries.push({ key, value, hash });
        newSteps.push({
          action: "insert",
          key,
          value,
          hash,
          description: `Inserted "${key}" into bucket ${hash} using chaining`,
        });
        setItemCount((prev) => prev + 1);
      }
    } else {
      // Linear or Quadratic Probing
      let index = hash;
      let i = 0;
      const probeSequence: number[] = [hash];

      while (i < size) {
        const currentBucket = newBuckets[index];
        const existingEntry = currentBucket.entries[0];

        if (!existingEntry || existingEntry.key === key) {
          currentBucket.entries = [{ key, value, hash }];
          newSteps.push({
            action: existingEntry ? "update" : "insert",
            key,
            value,
            hash: index,
            probeSequence,
            description: `${existingEntry ? "Updated" : "Inserted"} "${key}" at index ${index} after ${i} probes`,
          });
          if (!existingEntry) setItemCount((prev) => prev + 1);
          break;
        }

        i++;
        if (collisionMethod === "linear-probing") {
          index = (hash + i) % size;
        } else {
          // quadratic-probing
          index = (hash + i * i) % size;
        }
        probeSequence.push(index);

        if (i < size) {
          newSteps.push({
            action: "probe",
            hash: index,
            probeSequence: [...probeSequence],
            description: `Collision at index ${index - 1}, probing to ${index}`,
          });
        }
      }

      if (i >= size) {
        newSteps.push({
          action: "error",
          description: "Hash table is full! Cannot insert.",
        });
        setSteps(newSteps);
        setCurrentStep(0);
        return;
      }
    }

    setBuckets(newBuckets);
    setSteps(newSteps);
    setCurrentStep(0);
  }, [buckets, collisionMethod, hashFunction, size]);

  const search = useCallback((key: string) => {
    const hash = hashFunction(key, size);
    const newSteps: HashTableStep[] = [
      {
        action: "hash",
        key,
        hash,
        description: `Computing hash for key "${key}": hash = ${hash}`,
      },
    ];

    if (collisionMethod === "chaining") {
      const bucket = buckets[hash];
      const entry = bucket.entries.find((e) => e.key === key);
      
      if (entry) {
        newSteps.push({
          action: "found",
          key,
          value: entry.value,
          hash,
          description: `Found "${key}" in bucket ${hash} with value ${entry.value}`,
        });
      } else {
        newSteps.push({
          action: "not-found",
          key,
          hash,
          description: `Key "${key}" not found in bucket ${hash}`,
        });
      }
    } else {
      let index = hash;
      let i = 0;
      const probeSequence: number[] = [hash];
      let found = false;

      while (i < size) {
        const bucket = buckets[index];
        const entry = bucket.entries[0];

        if (!entry) {
          newSteps.push({
            action: "not-found",
            key,
            hash: index,
            probeSequence,
            description: `Key "${key}" not found (empty bucket at ${index})`,
          });
          break;
        }

        if (entry.key === key) {
          newSteps.push({
            action: "found",
            key,
            value: entry.value,
            hash: index,
            probeSequence,
            description: `Found "${key}" at index ${index} with value ${entry.value}`,
          });
          found = true;
          break;
        }

        i++;
        if (collisionMethod === "linear-probing") {
          index = (hash + i) % size;
        } else {
          index = (hash + i * i) % size;
        }
        probeSequence.push(index);

        newSteps.push({
          action: "probe",
          hash: index,
          probeSequence: [...probeSequence],
          description: `Key mismatch, probing to ${index}`,
        });
      }

      if (!found && i >= size) {
        newSteps.push({
          action: "not-found",
          key,
          description: `Key "${key}" not found after full table probe`,
        });
      }
    }

    setSteps(newSteps);
    setCurrentStep(0);
  }, [buckets, collisionMethod, hashFunction, size]);

  const remove = useCallback((key: string) => {
    const hash = hashFunction(key, size);
    const newSteps: HashTableStep[] = [
      {
        action: "hash",
        key,
        hash,
        description: `Computing hash for key "${key}": hash = ${hash}`,
      },
    ];

    const newBuckets = buckets.map((bucket) => ({ ...bucket, entries: [...bucket.entries] }));

    if (collisionMethod === "chaining") {
      const bucket = newBuckets[hash];
      const index = bucket.entries.findIndex((e) => e.key === key);
      
      if (index !== -1) {
        bucket.entries.splice(index, 1);
        newSteps.push({
          action: "delete",
          key,
          hash,
          description: `Deleted "${key}" from bucket ${hash}`,
        });
        setItemCount((prev) => prev - 1);
      } else {
        newSteps.push({
          action: "not-found",
          key,
          hash,
          description: `Key "${key}" not found, cannot delete`,
        });
      }
    } else {
      let index = hash;
      let i = 0;
      const probeSequence: number[] = [hash];

      while (i < size) {
        const bucket = newBuckets[index];
        const entry = bucket.entries[0];

        if (!entry) {
          newSteps.push({
            action: "not-found",
            key,
            hash: index,
            probeSequence,
            description: `Key "${key}" not found, cannot delete`,
          });
          break;
        }

        if (entry.key === key) {
          bucket.entries = [];
          newSteps.push({
            action: "delete",
            key,
            hash: index,
            probeSequence,
            description: `Deleted "${key}" from index ${index}`,
          });
          setItemCount((prev) => prev - 1);
          break;
        }

        i++;
        if (collisionMethod === "linear-probing") {
          index = (hash + i) % size;
        } else {
          index = (hash + i * i) % size;
        }
        probeSequence.push(index);
      }
    }

    setBuckets(newBuckets);
    setSteps(newSteps);
    setCurrentStep(0);
  }, [buckets, collisionMethod, hashFunction, size]);

  const clear = useCallback(() => {
    setBuckets(Array.from({ length: size }, (_, i) => ({ index: i, entries: [] })));
    setSteps([]);
    setCurrentStep(0);
    setItemCount(0);
  }, [size]);

  const resize = useCallback((newSize: number) => {
    if (newSize < 5 || newSize > 20) return;
    
    const oldBuckets = buckets;
    const newBuckets: Bucket[] = Array.from({ length: newSize }, (_, i) => ({ index: i, entries: [] }));
    
    // Rehash all entries
    oldBuckets.forEach((bucket) => {
      bucket.entries.forEach((entry) => {
        const newHash = hashFunction(entry.key, newSize);
        newBuckets[newHash].entries.push({ ...entry, hash: newHash });
      });
    });

    setBuckets(newBuckets);
    setSize(newSize);
    setSteps([{
      action: "resize",
      description: `Resized table from ${size} to ${newSize} buckets and rehashed all entries`,
    }]);
    setCurrentStep(0);
  }, [buckets, hashFunction, size]);

  const changeCollisionMethod = useCallback((method: CollisionMethod) => {
    setCollisionMethod(method);
    clear();
  }, [clear]);

  return {
    buckets,
    size,
    collisionMethod,
    steps,
    currentStep,
    itemCount,
    loadFactor,
    isAnimating,
    insert,
    search,
    remove,
    clear,
    resize,
    changeCollisionMethod,
    setCurrentStep,
    setIsAnimating,
  };
}

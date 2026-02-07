"use client";

import { useHashTable } from "@/hooks/use-hash-table";
import { HashTableControls } from "./hash-table-controls";
import { HashTableDisplay } from "./hash-table-display";
import { HashTableAnalysis } from "./hash-table-analysis";

export function HashTableVisualizer() {
  const hashTable = useHashTable(10);

  return (
    <div className="space-y-6">
      <HashTableControls hashTable={hashTable} />
      <HashTableDisplay hashTable={hashTable} />
      <HashTableAnalysis hashTable={hashTable} />
    </div>
  );
}

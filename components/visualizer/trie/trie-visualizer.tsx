"use client";

import { useTrie } from "@/hooks/use-trie";
import { TrieControls } from "./trie-controls";
import { TrieDisplay } from "./trie-display";
import { TrieAnalysis } from "./trie-analysis";

export function TrieVisualizer() {
  const trie = useTrie();

  return (
    <div className="space-y-6">
      <TrieControls trie={trie} />
      <TrieDisplay trie={trie} />
      <TrieAnalysis trie={trie} />
    </div>
  );
}

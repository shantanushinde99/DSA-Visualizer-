"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Search, Trash2, RefreshCw, Lightbulb, FileText } from "lucide-react";

interface TrieControlsProps {
  trie: ReturnType<typeof import("@/hooks/use-trie").useTrie>;
}

export function TrieControls({ trie }: TrieControlsProps) {
  const [word, setWord] = useState("");
  const { insert, search, autocomplete, deleteWord, clear, loadSampleWords } = trie;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="word">Word</Label>
          <Input
            id="word"
            placeholder="Enter a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && word && insert(word)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { insert(word); setWord(""); }} disabled={!word.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Insert
          </Button>
          <Button onClick={() => search(word)} variant="secondary" disabled={!word.trim()}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button onClick={() => autocomplete(word)} variant="secondary" disabled={!word.trim()}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Autocomplete
          </Button>
          <Button onClick={() => { deleteWord(word); setWord(""); }} variant="destructive" disabled={!word.trim()}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={clear} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Quick Actions</Label>
          <Button onClick={loadSampleWords} variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Load Sample Words
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm font-medium mb-2">Stored Words ({trie.words.length}):</div>
          <div className="flex flex-wrap gap-2">
            {trie.words.map((w, idx) => (
              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                {w}
              </span>
            ))}
            {trie.words.length === 0 && (
              <span className="text-sm text-muted-foreground italic">No words stored yet</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

import { useState, useCallback } from "react";

export interface TrieNode {
  char: string;
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  id: string;
  level: number;
}

export interface TrieStep {
  action: string;
  word?: string;
  path?: string[];
  nodeId?: string;
  found?: boolean;
  suggestions?: string[];
  description: string;
}

export function useTrie() {
  const [root, setRoot] = useState<TrieNode>(() => ({
    char: "",
    children: new Map(),
    isEndOfWord: false,
    id: "root",
    level: 0,
  }));
  const [steps, setSteps] = useState<TrieStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [words, setWords] = useState<string[]>([]);

  const createNode = useCallback((char: string, id: string, level: number): TrieNode => {
    return {
      char,
      children: new Map(),
      isEndOfWord: false,
      id,
      level,
    };
  }, []);

  const insert = useCallback((word: string) => {
    if (!word.trim()) return;

    const newRoot = JSON.parse(JSON.stringify(root, (key, value) => {
      if (value instanceof Map) {
        return Array.from(value.entries());
      }
      return value;
    }));

    const reconstructedRoot = JSON.parse(JSON.stringify(newRoot), (key, value) => {
      if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
        return new Map(value);
      }
      return value;
    });

    const newSteps: TrieStep[] = [];
    const path: string[] = [];
    let current = reconstructedRoot;

    newSteps.push({
      action: "start",
      word,
      description: `Inserting word "${word}"`,
    });

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      path.push(char);

      if (!current.children.has(char)) {
        const newNode = createNode(char, `${current.id}-${char}`, current.level + 1);
        current.children.set(char, newNode);
        newSteps.push({
          action: "create",
          word,
          path: [...path],
          nodeId: newNode.id,
          description: `Created new node for '${char}'`,
        });
      } else {
        newSteps.push({
          action: "traverse",
          word,
          path: [...path],
          nodeId: current.children.get(char)!.id,
          description: `Traversing to existing node '${char}'`,
        });
      }

      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
    newSteps.push({
      action: "complete",
      word,
      path: [...path],
      nodeId: current.id,
      description: `Marked end of word "${word}"`,
    });

    setRoot(reconstructedRoot);
    setWords((prev) => [...new Set([...prev, word.toLowerCase()])]);
    setSteps(newSteps);
    setCurrentStep(0);
  }, [root, createNode]);

  const search = useCallback((word: string) => {
    if (!word.trim()) return;

    const newSteps: TrieStep[] = [];
    const path: string[] = [];
    let current = root;

    newSteps.push({
      action: "start",
      word,
      description: `Searching for word "${word}"`,
    });

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      path.push(char);

      if (!current.children.has(char)) {
        newSteps.push({
          action: "not-found",
          word,
          path: [...path],
          found: false,
          description: `Character '${char}' not found. Word doesn't exist.`,
        });
        setSteps(newSteps);
        setCurrentStep(0);
        return;
      }

      newSteps.push({
        action: "traverse",
        word,
        path: [...path],
        nodeId: current.children.get(char)!.id,
        description: `Found '${char}', continuing search...`,
      });

      current = current.children.get(char)!;
    }

    if (current.isEndOfWord) {
      newSteps.push({
        action: "found",
        word,
        path: [...path],
        nodeId: current.id,
        found: true,
        description: `Word "${word}" found in trie!`,
      });
    } else {
      newSteps.push({
        action: "prefix-only",
        word,
        path: [...path],
        found: false,
        description: `"${word}" exists as prefix only, not a complete word.`,
      });
    }

    setSteps(newSteps);
    setCurrentStep(0);
  }, [root]);

  const autocomplete = useCallback((prefix: string) => {
    if (!prefix.trim()) return;

    const newSteps: TrieStep[] = [];
    const path: string[] = [];
    let current = root;

    newSteps.push({
      action: "start",
      word: prefix,
      description: `Finding words with prefix "${prefix}"`,
    });

    // Navigate to prefix
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i].toLowerCase();
      path.push(char);

      if (!current.children.has(char)) {
        newSteps.push({
          action: "not-found",
          word: prefix,
          suggestions: [],
          description: `Prefix "${prefix}" not found in trie.`,
        });
        setSteps(newSteps);
        setCurrentStep(0);
        return;
      }

      current = current.children.get(char)!;
    }

    // Find all words with this prefix
    const suggestions: string[] = [];
    
    const dfs = (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        suggestions.push(currentWord);
      }
      node.children.forEach((child, char) => {
        dfs(child, currentWord + char);
      });
    };

    dfs(current, prefix.toLowerCase());

    newSteps.push({
      action: "autocomplete",
      word: prefix,
      path: [...path],
      suggestions,
      description: `Found ${suggestions.length} word(s) with prefix "${prefix}"`,
    });

    setSteps(newSteps);
    setCurrentStep(0);
  }, [root]);

  const deleteWord = useCallback((word: string) => {
    if (!word.trim()) return;

    const newRoot = JSON.parse(JSON.stringify(root, (key, value) => {
      if (value instanceof Map) {
        return Array.from(value.entries());
      }
      return value;
    }));

    const reconstructedRoot = JSON.parse(JSON.stringify(newRoot), (key, value) => {
      if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
        return new Map(value);
      }
      return value;
    });

    const newSteps: TrieStep[] = [];
    const path: string[] = [];

    const deleteHelper = (node: TrieNode, word: string, index: number): boolean => {
      if (index === word.length) {
        if (!node.isEndOfWord) {
          newSteps.push({
            action: "not-found",
            word,
            description: `Word "${word}" not found in trie.`,
          });
          return false;
        }
        node.isEndOfWord = false;
        newSteps.push({
          action: "delete",
          word,
          path: [...path],
          description: `Removed end-of-word marker for "${word}"`,
        });
        return node.children.size === 0;
      }

      const char = word[index].toLowerCase();
      path.push(char);

      if (!node.children.has(char)) {
        newSteps.push({
          action: "not-found",
          word,
          description: `Word "${word}" not found in trie.`,
        });
        return false;
      }

      const shouldDeleteChild = deleteHelper(node.children.get(char)!, word, index + 1);

      if (shouldDeleteChild) {
        node.children.delete(char);
        newSteps.push({
          action: "delete-node",
          word,
          path: [...path],
          description: `Deleted node '${char}' (no other words use it)`,
        });
        return node.children.size === 0 && !node.isEndOfWord;
      }

      return false;
    };

    newSteps.push({
      action: "start",
      word,
      description: `Deleting word "${word}"`,
    });

    deleteHelper(reconstructedRoot, word.toLowerCase(), 0);

    setRoot(reconstructedRoot);
    setWords((prev) => prev.filter((w) => w !== word.toLowerCase()));
    setSteps(newSteps);
    setCurrentStep(0);
  }, [root]);

  const clear = useCallback(() => {
    setRoot({
      char: "",
      children: new Map(),
      isEndOfWord: false,
      id: "root",
      level: 0,
    });
    setWords([]);
    setSteps([]);
    setCurrentStep(0);
  }, []);

  const loadSampleWords = useCallback(() => {
    const sampleWords = ["cat", "car", "card", "care", "careful", "dog", "dodge", "door"];
    sampleWords.forEach((word, i) => {
      setTimeout(() => insert(word), i * 100);
    });
  }, [insert]);

  return {
    root,
    steps,
    currentStep,
    words,
    setCurrentStep,
    insert,
    search,
    autocomplete,
    deleteWord,
    clear,
    loadSampleWords,
  };
}

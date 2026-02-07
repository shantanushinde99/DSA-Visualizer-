"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Trash2, RefreshCw, Hash } from "lucide-react";
import type { CollisionMethod } from "@/hooks/use-hash-table";

interface HashTableControlsProps {
  hashTable: ReturnType<typeof import("@/hooks/use-hash-table").useHashTable>;
}

export function HashTableControls({ hashTable }: HashTableControlsProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [tableSize, setTableSize] = useState(hashTable.size.toString());

  const handleInsert = () => {
    if (key.trim() && value.trim()) {
      hashTable.insert(key.trim(), parseInt(value) || 0);
      setKey("");
      setValue("");
    }
  };

  const handleSearch = () => {
    if (key.trim()) {
      hashTable.search(key.trim());
    }
  };

  const handleDelete = () => {
    if (key.trim()) {
      hashTable.remove(key.trim());
      setKey("");
    }
  };

  const handleResize = () => {
    const newSize = parseInt(tableSize);
    if (!isNaN(newSize) && newSize >= 5 && newSize <= 20) {
      hashTable.resize(newSize);
    }
  };

  const handleCollisionMethodChange = (method: string) => {
    hashTable.changeCollisionMethod(method as CollisionMethod);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Collision Method Selection */}
        <div className="space-y-2">
          <Label>Collision Resolution Method</Label>
          <Select value={hashTable.collisionMethod} onValueChange={handleCollisionMethodChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chaining">Chaining (Separate Chaining)</SelectItem>
              <SelectItem value="linear-probing">Linear Probing (Open Addressing)</SelectItem>
              <SelectItem value="quadratic-probing">Quadratic Probing (Open Addressing)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key-Value Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              placeholder="e.g., 'apple'"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleInsert)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              placeholder="e.g., 100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleInsert)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInsert} disabled={!key.trim() || !value.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Insert
          </Button>
          <Button onClick={handleSearch} variant="secondary" disabled={!key.trim()}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button onClick={handleDelete} variant="destructive" disabled={!key.trim()}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={hashTable.clear} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* Table Size Control */}
        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="tableSize">Table Size (5-20)</Label>
            <Input
              id="tableSize"
              type="number"
              min="5"
              max="20"
              value={tableSize}
              onChange={(e) => setTableSize(e.target.value)}
            />
          </div>
          <Button onClick={handleResize} variant="outline">
            <Hash className="mr-2 h-4 w-4" />
            Resize
          </Button>
        </div>

        {/* Quick Test Data */}
        <div className="space-y-2">
          <Label>Quick Test Data</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                ["apple", "banana", "cherry", "date", "elderberry"].forEach((fruit, i) => {
                  setTimeout(() => hashTable.insert(fruit, (i + 1) * 10), i * 100);
                });
              }}
            >
              Load Fruits
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                ["alice", "bob", "charlie", "david", "eve"].forEach((name, i) => {
                  setTimeout(() => hashTable.insert(name, (i + 1) * 100), i * 100);
                });
              }}
            >
              Load Names
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold">{hashTable.itemCount}</div>
            <div className="text-sm text-muted-foreground">Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{hashTable.size}</div>
            <div className="text-sm text-muted-foreground">Buckets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{(hashTable.loadFactor * 100).toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Load Factor</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

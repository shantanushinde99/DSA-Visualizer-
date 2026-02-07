"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface DequeControlsProps {
  onAddFront: (value: number) => void
  onAddRear: (value: number) => void
  onRemoveFront: () => void
  onRemoveRear: () => void
  onClear: () => void
  isAnimating: boolean
  isFull: boolean
  isEmpty: boolean
}

export function DequeControls({
  onAddFront,
  onAddRear,
  onRemoveFront,
  onRemoveRear,
  onClear,
  isAnimating,
  isFull,
  isEmpty,
}: DequeControlsProps) {
  const [inputValue, setInputValue] = useState("")

  const handleAddFront = () => {
    const value = parseInt(inputValue)
    if (!isNaN(value)) {
      onAddFront(value)
      setInputValue("")
    }
  }

  const handleAddRear = () => {
    const value = parseInt(inputValue)
    if (!isNaN(value)) {
      onAddRear(value)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: 'front' | 'rear') => {
    if (e.key === 'Enter') {
      if (action === 'front') {
        handleAddFront()
      } else {
        handleAddRear()
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deque Controls</CardTitle>
        <CardDescription>Add or remove elements from both ends</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            placeholder="Enter a number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'rear')}
            disabled={isAnimating || isFull}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleAddFront}
            disabled={isAnimating || isFull || !inputValue}
            className="w-full"
          >
            Add Front
          </Button>
          <Button
            onClick={handleAddRear}
            disabled={isAnimating || isFull || !inputValue}
            className="w-full"
          >
            Add Rear
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onRemoveFront}
            disabled={isAnimating || isEmpty}
            variant="destructive"
            className="w-full"
          >
            Remove Front
          </Button>
          <Button
            onClick={onRemoveRear}
            disabled={isAnimating || isEmpty}
            variant="destructive"
            className="w-full"
          >
            Remove Rear
          </Button>
        </div>

        <Button
          onClick={onClear}
          disabled={isAnimating}
          variant="outline"
          className="w-full"
        >
          Clear All
        </Button>

        {isFull && (
          <p className="text-sm text-yellow-500">Deque is full!</p>
        )}
        {isEmpty && (
          <p className="text-sm text-muted-foreground">Deque is empty</p>
        )}
      </CardContent>
    </Card>
  )
}

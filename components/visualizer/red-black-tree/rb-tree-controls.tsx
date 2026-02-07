"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { RBStep } from "@/hooks/use-red-black-tree"

interface RBTreeControlsProps {
  onInsert: (value: number) => void
  onReset: () => void
  isAnimating: boolean
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
  steps: RBStep[]
}

export function RBTreeControls({
  onInsert,
  onReset,
  isAnimating,
  currentStep,
  totalSteps,
  onStepChange,
  steps,
}: RBTreeControlsProps) {
  const [inputValue, setInputValue] = useState("")

  const handleInsert = () => {
    const value = parseInt(inputValue)
    if (!isNaN(value)) {
      onInsert(value)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInsert()
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Red-Black Tree Controls</CardTitle>
          <CardDescription>Insert values to see balancing in action</CardDescription>
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
              onKeyPress={handleKeyPress}
              disabled={isAnimating}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleInsert}
              disabled={isAnimating || !inputValue}
              className="w-full"
            >
              Insert
            </Button>
            <Button
              onClick={onReset}
              disabled={isAnimating}
              variant="outline"
              className="w-full"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {totalSteps > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Step Controls</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {totalSteps}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Action</Label>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep]?.description || "No action"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onStepChange(currentStep - 1)}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <Button
                onClick={() => onStepChange(currentStep + 1)}
                disabled={currentStep >= totalSteps - 1}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>

            <Input
              type="range"
              min="0"
              max={totalSteps - 1}
              value={currentStep}
              onChange={(e) => onStepChange(parseInt(e.target.value))}
              className="w-full"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

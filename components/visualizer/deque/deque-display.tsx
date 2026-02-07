"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DequeNode } from "@/hooks/use-deque"
import { cn } from "@/lib/utils"

interface DequeDisplayProps {
  deque: DequeNode[]
  highlightedIndex: number | null
}

export function DequeDisplay({ deque, highlightedIndex }: DequeDisplayProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Deque Visualization</CardTitle>
        <CardDescription>
          Front ← Elements → Rear (Size: {deque.length})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          {deque.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Deque is empty</p>
              <p className="text-sm">Add elements from front or rear to get started</p>
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* Front Label */}
              <div className="text-center text-sm font-semibold text-primary">
                FRONT
              </div>

              {/* Deque Elements */}
              <div className="flex flex-col gap-2">
                {deque.map((node, index) => (
                  <div
                    key={node.id}
                    className={cn(
                      "flex items-center justify-center h-16 rounded-lg border-2 transition-all duration-500",
                      highlightedIndex === index
                        ? "border-primary bg-primary/20 scale-105"
                        : "border-border bg-card"
                    )}
                  >
                    <span className="text-2xl font-bold">{node.value}</span>
                  </div>
                ))}
              </div>

              {/* Rear Label */}
              <div className="text-center text-sm font-semibold text-primary">
                REAR
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

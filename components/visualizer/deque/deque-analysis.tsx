"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DequeOperation } from "@/hooks/use-deque"

interface DequeAnalysisProps {
  operations: DequeOperation[]
}

export function DequeAnalysis({ operations }: DequeAnalysisProps) {
  const getOperationColor = (type: string) => {
    switch (type) {
      case 'addFront':
        return 'text-blue-500'
      case 'addRear':
        return 'text-green-500'
      case 'removeFront':
        return 'text-red-500'
      case 'removeRear':
        return 'text-orange-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getOperationName = (type: string) => {
    switch (type) {
      case 'addFront':
        return 'Add Front'
      case 'addRear':
        return 'Add Rear'
      case 'removeFront':
        return 'Remove Front'
      case 'removeRear':
        return 'Remove Rear'
      default:
        return type
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operations History</CardTitle>
        <CardDescription>
          Track of all operations performed on the deque
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {operations.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No operations yet
            </p>
          ) : (
            operations.slice().reverse().map((op, index) => (
              <div
                key={operations.length - index}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <span className={`font-medium ${getOperationColor(op.type)}`}>
                  {getOperationName(op.type)}
                </span>
                {op.value !== undefined && (
                  <span className="text-sm">Value: {op.value}</span>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

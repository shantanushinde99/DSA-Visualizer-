import { useState } from "react"

export interface DequeNode {
  id: string
  value: number
  index: number
}

export interface DequeOperation {
  type: 'addFront' | 'addRear' | 'removeFront' | 'removeRear'
  value?: number
  timestamp: number
}

let nodeIdCounter = 0

export function useDeque(maxSize: number = 8) {
  const [deque, setDeque] = useState<DequeNode[]>([])
  const [operations, setOperations] = useState<DequeOperation[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const addFront = async (value: number) => {
    if (deque.length >= maxSize || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { type: 'addFront', value, timestamp: Date.now() }])

    // Highlight the new position
    setHighlightedIndex(0)
    
    // Add new node with animation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setDeque(prev => {
      const newDeque = [
        {
          id: `node-${nodeIdCounter++}`,
          value,
          index: 0,
        },
        ...prev
      ]
      // Update indices
      return newDeque.map((node, i) => ({
        ...node,
        index: i,
      }))
    })

    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const addRear = async (value: number) => {
    if (deque.length >= maxSize || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { type: 'addRear', value, timestamp: Date.now() }])

    // Highlight the new position
    setHighlightedIndex(deque.length)
    
    // Add new node with animation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setDeque(prev => [
      ...prev,
      {
        id: `node-${nodeIdCounter++}`,
        value,
        index: prev.length,
      }
    ])

    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const removeFront = async () => {
    if (deque.length === 0 || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { 
      type: 'removeFront', 
      value: deque[0].value, 
      timestamp: Date.now() 
    }])

    // Highlight the first element
    setHighlightedIndex(0)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setDeque(prev => {
      const newDeque = prev.slice(1)
      // Update indices
      return newDeque.map((node, i) => ({
        ...node,
        index: i,
      }))
    })
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const removeRear = async () => {
    if (deque.length === 0 || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { 
      type: 'removeRear', 
      value: deque[deque.length - 1].value, 
      timestamp: Date.now() 
    }])

    // Highlight the last element
    setHighlightedIndex(deque.length - 1)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setDeque(prev => prev.slice(0, -1))
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const clear = () => {
    setDeque([])
    setOperations([])
    setHighlightedIndex(null)
    setIsAnimating(false)
    nodeIdCounter = 0
  }

  return {
    deque,
    operations,
    isAnimating,
    highlightedIndex,
    addFront,
    addRear,
    removeFront,
    removeRear,
    clear,
    isFull: deque.length >= maxSize,
    isEmpty: deque.length === 0,
  }
}

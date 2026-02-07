"use client"

import { Card } from "@/components/ui/card"
import { LinkedList } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface LinkedListDisplayProps {
  list: LinkedList
  highlightedNodes: string[]
  message: string
  format?: (value: string) => React.ReactNode
}

interface Pointer {
  name: string
  nodeId: string | null
  color: string
}

interface ListNodeProps {
  id: string
  value: string
  isHighlighted: boolean
  showPrevArrow: boolean
  format?: (value: string) => React.ReactNode
}

function ListNode({ 
  id, 
  value, 
  isHighlighted,
  showPrevArrow,
  format,
  label,
}: ListNodeProps & { label?: string }) {
  const displayValue = format ? format(value) : value.toString()
  
  return (
    <motion.div
      layout
      data-id={id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        backgroundColor: isHighlighted 
          ? 'hsl(var(--primary))' 
          : 'hsl(var(--muted))',
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative flex-shrink-0"
    >
      {/* Label above node (HEAD/TAIL) */}
      {label && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
            {label}
          </span>
        </div>
      )}
      
      <div className="w-16 h-16 rounded-lg flex items-center justify-center border border-border">
        {showPrevArrow && (
          <motion.div 
            className="absolute -left-12 top-[60%] w-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full">
              <div className="h-[2px] w-full bg-muted-foreground" />
              <ArrowLeft className="h-4 w-4 text-muted-foreground absolute left-0 -translate-x-[2px] top-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        )}
        <span className={`text-lg font-mono ${
          isHighlighted ? 'text-primary-foreground' : ''
        }`}>
          {displayValue}
        </span>
      </div>
    </motion.div>
  )
}

function NextArrow({ isHighlighted, isCurved = false }: { isHighlighted: boolean, isCurved?: boolean }) {
  if (isCurved) {
    return (
      <motion.div 
        className="flex-shrink-0 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={`h-16 w-[2px] ${
          isHighlighted ? 'bg-primary' : 'bg-muted-foreground'
        }`} />
        <div className="relative w-32 h-8">
          <div className={`absolute inset-0 border-t-2 border-r-2 rounded-tr-2xl ${
            isHighlighted ? 'border-primary' : 'border-muted-foreground'
          }`} />
          <ArrowRight className={`h-4 w-4 absolute right-0 translate-x-[2px] top-1/2 -translate-y-1/2 ${
            isHighlighted ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="flex-shrink-0 w-12 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full -translate-y-2">
        <div className={`h-[2px] w-full ${
          isHighlighted ? 'bg-primary' : 'bg-muted-foreground'
        }`} />
        <ArrowRight className={`h-4 w-4 absolute right-0 translate-x-[2px] top-1/2 -translate-y-1/2 ${
          isHighlighted ? 'text-primary' : 'text-muted-foreground'
        }`} />
      </div>
    </motion.div>
  )
}

function PointerLabel({ name, position, color }: { 
  name: string
  position: { x: number; y: number }
  color: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute pointer-events-none"
      style={{ 
        left: position.x,
        top: position.y,
        color: color
      }}
    >
      <div className="flex flex-col items-center">
        <div className="text-sm font-mono">{name}</div>
        <div className="h-6 w-[2px]" style={{ backgroundColor: color }} />
      </div>
    </motion.div>
  )
}

export function LinkedListDisplay({ 
  list, 
  highlightedNodes, 
  message,
  pointers = [],
  format,
}: LinkedListDisplayProps & { pointers?: Pointer[] }) {

  const getNodeChain = () => {
    const chain: string[] = []
    let current = list.head
    const visited = new Set<string>()

    while (current) {
      const node = list.nodes.get(current)
      if (!node) break
      
      chain.push(current)
      visited.add(current)
      
      if (node.next && visited.has(node.next)) {
        break
      }
      
      current = node.next
    }

    return chain
  }

  const nodeChain = getNodeChain()
  const isCircular = list.type === 'CSLL' || list.type === 'CDLL'
  const isDoubly = list.type === 'DLL' || list.type === 'CDLL'

  const getNodePosition = (nodeId: string): { x: number; y: number } | null => {
    const element = document.querySelector(`[data-id="${nodeId}"]`)
    if (!element) return null
    const rect = element.getBoundingClientRect()
    const container = document.querySelector('.list-container')
    if (!container) return null
    const containerRect = container.getBoundingClientRect()
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top - 40
    }
  }

  // Calculate dynamic height based on list type and node count
  const minHeight = isCircular ? 'min-h-[500px]' : 'min-h-[250px]'
  const paddingBottom = isCircular ? 'pb-40' : 'pb-6'
  const paddingTop = 'pt-16' // Extra padding for HEAD/TAIL labels

  return (
    <Card className={`p-6 relative ${minHeight} ${paddingBottom} ${paddingTop} overflow-hidden`}>
      {message && (
        <div className="absolute top-4 left-4 right-4 text-sm text-muted-foreground max-w-md z-10">
          {message}
        </div>
      )}
      
      {/* Info badge for circular lists */}
      {isCircular && list.head && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              Circular {list.type}
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-start justify-center">
        <div className="list-container relative w-full">
          <AnimatePresence>
            {pointers.map(pointer => 
              pointer.nodeId && (
                <PointerLabel
                  key={pointer.name}
                  name={pointer.name}
                  color={pointer.color}
                  position={getNodePosition(pointer.nodeId) || { x: 0, y: 0 }}
                />
              )
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-0 items-center justify-center">
            <AnimatePresence mode="popLayout">
              {nodeChain.map((nodeId, index) => {
                const isHead = nodeId === list.head
                const isTail = nodeId === list.tail
                let label = ''
                if (isHead && isTail) {
                  label = 'HEAD/TAIL'
                } else if (isHead) {
                  label = 'HEAD'
                } else if (isTail) {
                  label = 'TAIL'
                }
                
                return (
                  <div key={nodeId} className="flex items-center">
                    <ListNode
                      id={nodeId}
                      value={list.nodes.get(nodeId)!.value}
                      isHighlighted={highlightedNodes.includes(nodeId)}
                      showPrevArrow={isDoubly && index > 0}
                      format={format}
                      label={label}
                    />
                    {index < nodeChain.length - 1 && (
                      <NextArrow 
                        isHighlighted={
                          highlightedNodes.includes(nodeId) && 
                          highlightedNodes.includes(nodeChain[index + 1])
                        }
                      />
                    )}
                  </div>
                )
              })}
            </AnimatePresence>
          </div>
          
          {/* Circular connection visualization */}
          {isCircular && list.head && nodeChain.length > 0 && (
            <motion.div 
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-2xl h-32">
                  {/* Curved arrow from tail back to head */}
                  <svg 
                    className="w-full h-full" 
                    viewBox="0 0 600 140"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ overflow: 'visible' }}
                  >
                    {/* Define arrowhead marker */}
                    <defs>
                      <marker
                        id="arrowhead-circular"
                        markerWidth="12"
                        markerHeight="12"
                        refX="11"
                        refY="6"
                        orient="auto"
                      >
                        <polygon 
                          points="0 0, 12 6, 0 12" 
                          className={highlightedNodes.includes(list.tail!) && highlightedNodes.includes(list.head) 
                            ? 'fill-primary' 
                            : 'fill-muted-foreground'}
                        />
                      </marker>
                      
                      {/* Animated dashed pattern */}
                      <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="stop-primary" style={{ stopColor: 'hsl(var(--primary))' }} />
                        <stop offset="100%" className="stop-primary/50" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Background glow effect for highlighted state */}
                    {highlightedNodes.includes(list.tail!) && highlightedNodes.includes(list.head) && (
                      <path
                        d="M 550 30 Q 600 70, 550 110 L 50 110 Q 0 70, 50 30 L 550 30"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        opacity="0.2"
                        filter="blur(4px)"
                      />
                    )}
                    
                    {/* Main curved path - elliptical arc */}
                    <path
                      d="M 550 30 Q 600 70, 550 110 L 50 110 Q 0 70, 50 30 L 550 30"
                      fill="none"
                      stroke={highlightedNodes.includes(list.tail!) && highlightedNodes.includes(list.head) 
                        ? 'url(#circularGradient)' 
                        : 'hsl(var(--muted-foreground))'}
                      strokeWidth="3"
                      strokeDasharray={highlightedNodes.includes(list.tail!) && highlightedNodes.includes(list.head) ? "10,5" : "0"}
                      markerEnd="url(#arrowhead-circular)"
                      strokeLinecap="round"
                    >
                      {highlightedNodes.includes(list.tail!) && highlightedNodes.includes(list.head) && (
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="30"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </path>
                    
                    {/* Labels with background */}
                    <g>
                      <rect x="10" y="55" width="50" height="30" fill="hsl(var(--background))" opacity="0.9" rx="4" />
                      <text x="35" y="75" className="text-xs fill-muted-foreground" fontSize="13" fontWeight="700" textAnchor="middle">
                        TAIL
                      </text>
                    </g>
                    <g>
                      <rect x="540" y="55" width="50" height="30" fill="hsl(var(--background))" opacity="0.9" rx="4" />
                      <text x="565" y="75" className="text-xs fill-muted-foreground" fontSize="13" fontWeight="700" textAnchor="middle">
                        HEAD
                      </text>
                    </g>
                  </svg>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 border border-border px-4 py-2 rounded-lg">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    highlightedNodes.includes(list.tail!) && highlightedNodes.includes(list.head)
                      ? 'bg-primary'
                      : 'bg-muted-foreground'
                  }`} />
                  <span className="text-sm font-semibold">
                    Circular Connection: Tail → Head
                  </span>
                  {isDoubly && (
                    <span className="text-xs text-muted-foreground">
                      (bidirectional)
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
} 
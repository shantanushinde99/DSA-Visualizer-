"use client"

import ReactMarkdown from "react-markdown"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Card, CardContent } from "@/components/ui/card"
import 'katex/dist/katex.min.css'

interface MarkdownContentProps {
  content: React.ReactNode | string
}

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mb-6 mt-8 text-primary border-b pb-2">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mb-4 mt-6 text-primary">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold mb-3 mt-4 text-foreground">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-xl font-semibold mb-2 mt-3">{children}</h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-7 text-muted-foreground">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-foreground">{children}</em>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isInline = !className
    return isInline ? (
      <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm">
        {children}
      </code>
    ) : (
      <code className={`${className} block p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto`}>
        {children}
      </code>
    )
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-5 p-4 rounded-lg bg-muted overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-5">
      <table className="min-w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-muted">{children}</thead>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="border-b border-border">{children}</tr>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-2 text-left font-semibold">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-2 text-muted-foreground">{children}</td>
  ),
  hr: () => (
    <hr className="my-8 border-border" />
  ),
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 max-h-[600px] overflow-y-auto">
        <div className="prose prose-invert max-w-none">
          {typeof content === 'string' ? (
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {content}
            </ReactMarkdown>
          ) : (
            content
          )}
        </div>
      </CardContent>
    </Card>
  )
}
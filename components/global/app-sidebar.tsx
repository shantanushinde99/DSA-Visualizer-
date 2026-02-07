"use client"

import { Binary, Home, Database, BrainCircuit, TreePine, List, SquareStack, SquareChevronLeft, Hash, ArrowRightLeft, BarChart3, GitBranch, Network, Grid3x3, Boxes, RouteIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/navigation/nav-main"
import { NavProjects } from "@/components/navigation/nav-projects"
import { NavUser } from "@/components/navigation/nav-user"

const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Data Structures",
    url: "/visualizer",
    icon: Database,
  },
]

const dataStructures = [
  {
    name: "Stack",
    url: "/visualizer/stack",
    icon: SquareStack,
    description: "LIFO data structure with push and pop operations",
  },  
  {
    name: "Queue",
    url: "/visualizer/queue",
    icon: SquareChevronLeft,
    description: "FIFO data structure with enqueue and dequeue operations",
  },
  {
    name: "Deque",
    url: "/visualizer/deque",
    icon: ArrowRightLeft,
    description: "Double-ended queue with operations at both ends",
  },  
  {
    name: "Linked List",
    url: "/visualizer/linked-list",
    icon: List,
    description: "Linear data structure with elements linked using pointers",
  },
  {
    name: "Binary Search Tree",
    url: "/visualizer/binary-tree",
    icon: Binary,
    description: "Basic binary tree with BST properties",
  },
  {
    name: "AVL Tree",
    url: "/visualizer/avl-tree",
    icon: TreePine,
    description: "Self-balancing binary search tree",
  },
  {
    name: "Red-Black Tree",
    url: "/visualizer/red-black-tree",
    icon: TreePine,
    description: "Self-balancing BST with color properties",
  },
  {
    name: "Heap",
    url: "/visualizer/heap",
    icon: Database,
    description: "Binary heap implementation with max/min heap variants",
  },
  {
    name: "Hash Table",
    url: "/visualizer/hash-table",
    icon: Hash,
    description: "Key-value storage with collision resolution methods",
  },
  {
    name: "Trie",
    url: "/visualizer/trie",
    icon: GitBranch,
    description: "Prefix tree for efficient string operations",
  },
  {
    name: "Graph",
    url: "/visualizer/graph",
    icon: Network,
    description: "Graph representations and visualizations",
  },
]

const algorithms = [
  {
    name: "Sorting Algorithms",
    url: "/visualizer/sorting",
    icon: BarChart3,
    description: "Visualize and compare 6 sorting algorithms",
  },
  {
    name: "BFS & DFS",
    url: "/visualizer/graph-traversal",
    icon: RouteIcon,
    description: "Graph traversal algorithms with queue/stack visualization",
  },
  {
    name: "Dijkstra's Algorithm",
    url: "/visualizer/dijkstra",
    icon: ArrowRightLeft,
    description: "Shortest path algorithm for weighted graphs",
  },
  {
    name: "MST Algorithms",
    url: "/visualizer/mst",
    icon: Network,
    description: "Kruskal's and Prim's minimum spanning tree algorithms",
  },
  {
    name: "Dynamic Programming",
    url: "/visualizer/dynamic-programming",
    icon: Grid3x3,
    description: "DP problems: LCS, Knapsack, Coin Change, Edit Distance",
  },
  {
    name: "Backtracking",
    url: "/visualizer/backtracking",
    icon: Boxes,
    description: "N-Queens, Sudoku, Maze, Knight's Tour problems",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <BrainCircuit className="h-6 w-6" />
          <h1 className="text-sm font-semibold">Data Structure Visualizer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects
          title="Data Structures"
          projects={dataStructures.map(ds => ({
            name: ds.name,
            url: ds.url,
            icon: ds.icon,
            description: ds.description,
          }))}
        />
        <NavProjects
          title="Algorithms"
          projects={algorithms.map(alg => ({
            name: alg.name,
            url: alg.url,
            icon: alg.icon,
            description: alg.description,
          }))}
        />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser
          user={{
            name: "Guest User",
            email: "guest@example.com",
            avatar: "",
          }}
        />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
} 
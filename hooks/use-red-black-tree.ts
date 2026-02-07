import { useState, useCallback } from "react";

export type RBColor = "RED" | "BLACK";

export interface RBNode {
  value: number;
  color: RBColor;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

export interface RBStep {
  tree: RBNode | null;
  action: "insert" | "rotate-left" | "rotate-right" | "recolor" | "fix" | "complete";
  description: string;
  highlightedNodes: number[];
}

export function useRedBlackTree() {
  const [root, setRoot] = useState<RBNode | null>(null);
  const [steps, setSteps] = useState<RBStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const createNode = (value: number, color: RBColor = "RED"): RBNode => ({
    value,
    color,
    left: null,
    right: null,
    parent: null,
  });

  const copyTree = (node: RBNode | null): RBNode | null => {
    if (!node) return null;
    const newNode: RBNode = {
      value: node.value,
      color: node.color,
      left: copyTree(node.left),
      right: copyTree(node.right),
      parent: null,
    };
    if (newNode.left) newNode.left.parent = newNode;
    if (newNode.right) newNode.right.parent = newNode;
    return newNode;
  };

  const rotateLeft = (node: RBNode, tempRoot: RBNode | null): RBNode | null => {
    const rightChild = node.right;
    if (!rightChild) return tempRoot;

    node.right = rightChild.left;
    if (rightChild.left) {
      rightChild.left.parent = node;
    }

    rightChild.parent = node.parent;
    if (!node.parent) {
      tempRoot = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;

    return tempRoot;
  };

  const rotateRight = (node: RBNode, tempRoot: RBNode | null): RBNode | null => {
    const leftChild = node.left;
    if (!leftChild) return tempRoot;

    node.left = leftChild.right;
    if (leftChild.right) {
      leftChild.right.parent = node;
    }

    leftChild.parent = node.parent;
    if (!node.parent) {
      tempRoot = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;

    return tempRoot;
  };

  const fixViolation = (node: RBNode, tempRoot: RBNode | null, newSteps: RBStep[]): RBNode | null => {
    let current: RBNode | null = node;
    let localRoot = tempRoot;

    while (current && current !== localRoot && current.parent && current.parent.color === "RED") {
      const parent: RBNode = current.parent;
      const grandparent: RBNode | null = parent.parent;

      if (!grandparent) break;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        if (uncle && uncle.color === "RED") {
          // Case 1: Uncle is red - recolor
          newSteps.push({
            tree: copyTree(localRoot),
            action: "recolor",
            description: `Recoloring: parent(${parent.value}), uncle(${uncle.value}) → BLACK, grandparent(${grandparent.value}) → RED`,
            highlightedNodes: [current.value, parent.value, uncle.value, grandparent.value],
          });

          parent.color = "BLACK";
          uncle.color = "BLACK";
          grandparent.color = "RED";
          current = grandparent;
        } else {
          // Case 2: Uncle is black
          if (current === parent.right) {
            newSteps.push({
              tree: copyTree(localRoot),
              action: "rotate-left",
              description: `Left rotation on parent(${parent.value})`,
              highlightedNodes: [current.value, parent.value],
            });

            current = parent;
            if (current) {
              localRoot = rotateLeft(current, localRoot);
            }
          }

          const newParent = current?.parent;
          if (newParent && newParent.parent) {
            newSteps.push({
              tree: copyTree(localRoot),
              action: "recolor",
              description: `Recoloring: parent(${newParent.value}) → BLACK, grandparent(${newParent.parent.value}) → RED`,
              highlightedNodes: [current?.value || 0, newParent.value, newParent.parent.value],
            });

            newParent.color = "BLACK";
            newParent.parent.color = "RED";

            newSteps.push({
              tree: copyTree(localRoot),
              action: "rotate-right",
              description: `Right rotation on grandparent(${newParent.parent.value})`,
              highlightedNodes: [current?.value || 0, newParent.value, newParent.parent.value],
            });

            localRoot = rotateRight(newParent.parent, localRoot);
          }
        }
      } else {
        // Mirror cases
        const uncle = grandparent.left;

        if (uncle && uncle.color === "RED") {
          newSteps.push({
            tree: copyTree(localRoot),
            action: "recolor",
            description: `Recoloring: parent(${parent.value}), uncle(${uncle.value}) → BLACK, grandparent(${grandparent.value}) → RED`,
            highlightedNodes: [current.value, parent.value, uncle.value, grandparent.value],
          });

          parent.color = "BLACK";
          uncle.color = "BLACK";
          grandparent.color = "RED";
          current = grandparent;
        } else {
          if (current === parent.left) {
            newSteps.push({
              tree: copyTree(localRoot),
              action: "rotate-right",
              description: `Right rotation on parent(${parent.value})`,
              highlightedNodes: [current.value, parent.value],
            });

            current = parent;
            if (current) {
              localRoot = rotateRight(current, localRoot);
            }
          }

          const newParent = current?.parent;
          if (newParent && newParent.parent) {
            newSteps.push({
              tree: copyTree(localRoot),
              action: "recolor",
              description: `Recoloring: parent(${newParent.value}) → BLACK, grandparent(${newParent.parent.value}) → RED`,
              highlightedNodes: [current?.value || 0, newParent.value, newParent.parent.value],
            });

            newParent.color = "BLACK";
            newParent.parent.color = "RED";

            newSteps.push({
              tree: copyTree(localRoot),
              action: "rotate-left",
              description: `Left rotation on grandparent(${newParent.parent.value})`,
              highlightedNodes: [current?.value || 0, newParent.value, newParent.parent.value],
            });

            localRoot = rotateLeft(newParent.parent, localRoot);
          }
        }
      }
    }

    if (localRoot) {
      localRoot.color = "BLACK";
    }

    return localRoot;
  };

  const insert = useCallback((value: number) => {
    const newSteps: RBStep[] = [];

    if (!root) {
      const newNode = createNode(value, "BLACK");
      newSteps.push({
        tree: copyTree(newNode),
        action: "insert",
        description: `Inserted ${value} as root (BLACK)`,
        highlightedNodes: [value],
      });
      newSteps.push({
        tree: copyTree(newNode),
        action: "complete",
        description: "Insertion complete",
        highlightedNodes: [],
      });
      setSteps(newSteps);
      setCurrentStep(0);
      setRoot(newNode);
      return;
    }

    let tempRoot = copyTree(root);
    let current = tempRoot;
    let parent: RBNode | null = null;

    // Find insertion point
    while (current) {
      parent = current;
      if (value < current.value) {
        current = current.left!;
      } else if (value > current.value) {
        current = current.right!;
      } else {
        // Duplicate - don't insert
        return;
      }
    }

    const newNode = createNode(value);
    newNode.parent = parent;

    if (value < parent!.value) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }

    newSteps.push({
      tree: copyTree(tempRoot),
      action: "insert",
      description: `Inserted ${value} as RED leaf`,
      highlightedNodes: [value],
    });

    // Fix violations
    tempRoot = fixViolation(newNode, tempRoot, newSteps);

    newSteps.push({
      tree: copyTree(tempRoot),
      action: "complete",
      description: "Red-Black tree balanced",
      highlightedNodes: [],
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setRoot(tempRoot);
  }, [root]);

  const reset = useCallback(() => {
    setRoot(null);
    setSteps([]);
    setCurrentStep(0);
  }, []);

  return {
    root,
    steps,
    currentStep,
    setCurrentStep,
    insert,
    reset,
  };
}

import { useState, useCallback } from "react";

export type SortingAlgorithm = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";

export interface SortStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  description: string;
  comparisons: number;
  swaps: number;
}

export function useSorting() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>("bubble");
  const [arraySize, setArraySize] = useState(10);

  const generateRandomArray = useCallback((size: number) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setArraySize(size);
  }, []);

  const generateSortedArray = useCallback((size: number) => {
    const newArray = Array.from({ length: size }, (_, i) => i + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setArraySize(size);
  }, []);

  const generateReversedArray = useCallback((size: number) => {
    const newArray = Array.from({ length: size }, (_, i) => size - i);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setArraySize(size);
  }, []);

  // Bubble Sort
  const bubbleSort = useCallback((arr: number[]) => {
    const steps: SortStep[] = [];
    const workArray = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [];

    for (let i = 0; i < workArray.length; i++) {
      for (let j = 0; j < workArray.length - i - 1; j++) {
        comparisons++;
        steps.push({
          array: [...workArray],
          comparing: [j, j + 1],
          sorted: [...sorted],
          description: `Comparing ${workArray[j]} and ${workArray[j + 1]}`,
          comparisons,
          swaps,
        });

        if (workArray[j] > workArray[j + 1]) {
          swaps++;
          [workArray[j], workArray[j + 1]] = [workArray[j + 1], workArray[j]];
          steps.push({
            array: [...workArray],
            swapping: [j, j + 1],
            sorted: [...sorted],
            description: `Swapped ${workArray[j + 1]} and ${workArray[j]}`,
            comparisons,
            swaps,
          });
        }
      }
      sorted.unshift(workArray.length - i - 1);
    }

    steps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, i) => i),
      description: "Array is sorted!",
      comparisons,
      swaps,
    });

    return steps;
  }, []);

  // Selection Sort
  const selectionSort = useCallback((arr: number[]) => {
    const steps: SortStep[] = [];
    const workArray = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [];

    for (let i = 0; i < workArray.length; i++) {
      let minIdx = i;

      for (let j = i + 1; j < workArray.length; j++) {
        comparisons++;
        steps.push({
          array: [...workArray],
          comparing: [minIdx, j],
          sorted: [...sorted],
          description: `Finding minimum in unsorted portion (comparing index ${minIdx} with ${j})`,
          comparisons,
          swaps,
        });

        if (workArray[j] < workArray[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        swaps++;
        [workArray[i], workArray[minIdx]] = [workArray[minIdx], workArray[i]];
        steps.push({
          array: [...workArray],
          swapping: [i, minIdx],
          sorted: [...sorted],
          description: `Swapped ${workArray[minIdx]} with ${workArray[i]}`,
          comparisons,
          swaps,
        });
      }

      sorted.push(i);
    }

    steps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, i) => i),
      description: "Array is sorted!",
      comparisons,
      swaps,
    });

    return steps;
  }, []);

  // Insertion Sort
  const insertionSort = useCallback((arr: number[]) => {
    const steps: SortStep[] = [];
    const workArray = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [0];

    for (let i = 1; i < workArray.length; i++) {
      const key = workArray[i];
      let j = i - 1;

      steps.push({
        array: [...workArray],
        comparing: [i],
        sorted: [...sorted],
        description: `Inserting ${key} into sorted portion`,
        comparisons,
        swaps,
      });

      while (j >= 0 && workArray[j] > key) {
        comparisons++;
        swaps++;
        workArray[j + 1] = workArray[j];
        steps.push({
          array: [...workArray],
          swapping: [j, j + 1],
          sorted: [...sorted],
          description: `Shifting ${workArray[j]} to the right`,
          comparisons,
          swaps,
        });
        j--;
      }

      if (j >= 0) comparisons++;
      workArray[j + 1] = key;
      sorted.push(i);

      steps.push({
        array: [...workArray],
        sorted: [...sorted],
        description: `Placed ${key} at position ${j + 1}`,
        comparisons,
        swaps,
      });
    }

    steps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, i) => i),
      description: "Array is sorted!",
      comparisons,
      swaps,
    });

    return steps;
  }, []);

  // Merge Sort
  const mergeSort = useCallback((arr: number[]) => {
    const steps: SortStep[] = [];
    const workArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    function merge(left: number, mid: number, right: number) {
      const leftArr = workArray.slice(left, mid + 1);
      const rightArr = workArray.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        steps.push({
          array: [...workArray],
          comparing: [left + i, mid + 1 + j],
          description: `Merging: comparing ${leftArr[i]} and ${rightArr[j]}`,
          comparisons,
          swaps,
        });

        if (leftArr[i] <= rightArr[j]) {
          workArray[k] = leftArr[i];
          i++;
        } else {
          workArray[k] = rightArr[j];
          j++;
        }
        swaps++;
        k++;
      }

      while (i < leftArr.length) {
        workArray[k] = leftArr[i];
        i++;
        k++;
        swaps++;
      }

      while (j < rightArr.length) {
        workArray[k] = rightArr[j];
        j++;
        k++;
        swaps++;
      }

      steps.push({
        array: [...workArray],
        sorted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        description: `Merged subarray from index ${left} to ${right}`,
        comparisons,
        swaps,
      });
    }

    function mergeSortHelper(left: number, right: number) {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        steps.push({
          array: [...workArray],
          comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          description: `Dividing array from index ${left} to ${right}`,
          comparisons,
          swaps,
        });

        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
      }
    }

    mergeSortHelper(0, workArray.length - 1);

    steps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, i) => i),
      description: "Array is sorted!",
      comparisons,
      swaps,
    });

    return steps;
  }, []);

  // Quick Sort
  const quickSort = useCallback((arr: number[]) => {
    const steps: SortStep[] = [];
    const workArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    function partition(low: number, high: number): number {
      const pivot = workArray[high];
      steps.push({
        array: [...workArray],
        pivot: high,
        description: `Choosing pivot: ${pivot} at index ${high}`,
        comparisons,
        swaps,
      });

      let i = low - 1;

      for (let j = low; j < high; j++) {
        comparisons++;
        steps.push({
          array: [...workArray],
          comparing: [j],
          pivot: high,
          description: `Comparing ${workArray[j]} with pivot ${pivot}`,
          comparisons,
          swaps,
        });

        if (workArray[j] < pivot) {
          i++;
          if (i !== j) {
            swaps++;
            [workArray[i], workArray[j]] = [workArray[j], workArray[i]];
            steps.push({
              array: [...workArray],
              swapping: [i, j],
              pivot: high,
              description: `Swapped ${workArray[j]} with ${workArray[i]}`,
              comparisons,
              swaps,
            });
          }
        }
      }

      swaps++;
      [workArray[i + 1], workArray[high]] = [workArray[high], workArray[i + 1]];
      steps.push({
        array: [...workArray],
        swapping: [i + 1, high],
        description: `Placed pivot ${pivot} at position ${i + 1}`,
        comparisons,
        swaps,
      });

      return i + 1;
    }

    function quickSortHelper(low: number, high: number) {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    }

    quickSortHelper(0, workArray.length - 1);

    steps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, i) => i),
      description: "Array is sorted!",
      comparisons,
      swaps,
    });

    return steps;
  }, []);

  // Heap Sort
  const heapSort = useCallback((arr: number[]) => {
    const steps: SortStep[] = [];
    const workArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    function heapify(n: number, i: number) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        comparisons++;
        steps.push({
          array: [...workArray],
          comparing: [largest, left],
          description: `Comparing parent ${workArray[largest]} with left child ${workArray[left]}`,
          comparisons,
          swaps,
        });

        if (workArray[left] > workArray[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        comparisons++;
        steps.push({
          array: [...workArray],
          comparing: [largest, right],
          description: `Comparing ${workArray[largest]} with right child ${workArray[right]}`,
          comparisons,
          swaps,
        });

        if (workArray[right] > workArray[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        swaps++;
        [workArray[i], workArray[largest]] = [workArray[largest], workArray[i]];
        steps.push({
          array: [...workArray],
          swapping: [i, largest],
          description: `Swapped ${workArray[largest]} with ${workArray[i]} to maintain heap property`,
          comparisons,
          swaps,
        });
        heapify(n, largest);
      }
    }

    // Build max heap
    for (let i = Math.floor(workArray.length / 2) - 1; i >= 0; i--) {
      heapify(workArray.length, i);
    }

    steps.push({
      array: [...workArray],
      description: "Max heap built",
      comparisons,
      swaps,
    });

    // Extract elements from heap
    for (let i = workArray.length - 1; i > 0; i--) {
      swaps++;
      [workArray[0], workArray[i]] = [workArray[i], workArray[0]];
      steps.push({
        array: [...workArray],
        swapping: [0, i],
        sorted: Array.from({ length: workArray.length - i }, (_, j) => i + j),
        description: `Moved max element ${workArray[i]} to position ${i}`,
        comparisons,
        swaps,
      });
      heapify(i, 0);
    }

    steps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, i) => i),
      description: "Array is sorted!",
      comparisons,
      swaps,
    });

    return steps;
  }, []);

  const sort = useCallback(() => {
    if (array.length === 0) return;

    let sortSteps: SortStep[] = [];

    switch (algorithm) {
      case "bubble":
        sortSteps = bubbleSort(array);
        break;
      case "selection":
        sortSteps = selectionSort(array);
        break;
      case "insertion":
        sortSteps = insertionSort(array);
        break;
      case "merge":
        sortSteps = mergeSort(array);
        break;
      case "quick":
        sortSteps = quickSort(array);
        break;
      case "heap":
        sortSteps = heapSort(array);
        break;
    }

    setSteps(sortSteps);
    setCurrentStep(0);
  }, [array, algorithm, bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort]);

  return {
    array,
    steps,
    currentStep,
    isAnimating,
    algorithm,
    arraySize,
    setArray,
    setCurrentStep,
    setIsAnimating,
    setAlgorithm,
    generateRandomArray,
    generateSortedArray,
    generateReversedArray,
    sort,
  };
}

// Do not edit the class below except for the buildHeap,
// siftDown, siftUp, peek, remove, and insert methods.
// Feel free to add new properties and methods to the class.
export class MinHeap {
  heap: number[];

  constructor(array: number[]) {
    this.heap = this.buildHeap(array);
  }

  private swap(first: number, second: number, heap: number[]) {
    [heap[first], heap[second]] = [heap[second], heap[first]];
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private childIndex(index: number, position: 1 | 2): number {
    return 2 * index + position;
  }

  // O(n) time | O(1) space
  buildHeap(array: number[]): number[] {
    const firstParentIdx = this.parentIndex(array.length - 1);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, heap: number[]): void {
    const endIdx = heap.length - 1;
    let childOneIdx = this.childIndex(currentIdx, 1);
    while (childOneIdx <= endIdx) {
      let childTwoIdx = this.childIndex(currentIdx, 2);
      if (childTwoIdx > endIdx) childTwoIdx = -1;
      let idxToSwap: number;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = this.childIndex(currentIdx, 1);
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: number[]): void {
    let parentIdx = this.parentIndex(currentIdx);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = this.parentIndex(currentIdx);
    }
  }

  // O(1) time | O(1) space
  peek(): number {
    return this.heap[0];
  }

  // O(log(n)) time | O(1) space
  remove(): number {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap);
    return valueToRemove || -1;
  }

  // O(log(n)) time | O(1) space
  insert(value: number): void {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }
}

const input = [8, 12, 23, 17, 31, 30, 44, 102, 18];
const heap = new MinHeap(input);

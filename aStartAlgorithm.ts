import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

enum Direction {
  DOWN,
  UP,
  LEFT,
  RIGHT,
}

type Graph = number[][];

class Node {
  id: string;
  distanceFromStart = Infinity; // G
  estimatedDistanceToEnd = Infinity; // F
  cameFrom: Node | null = null;

  constructor(public row: number, public col: number, public value: number) {
    this.id = row.toString() + "-" + col.toString();
  }
}

class MinHeap {
  nodePositionsInHeap: Record<string, number>;
  heap: Node[];

  constructor(array: Node[]) {
    this.nodePositionsInHeap = array.reduce((obj, node, i) => {
      obj[node.id] = i;
      return obj;
    }, {} as Record<string, number>);
    this.heap = this.buildHeap(array);
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public contains(node: Node) {
    return node.id in this.nodePositionsInHeap;
  }

  private swap(first: number, second: number, heap: Node[]): void {
    this.nodePositionsInHeap[this.heap[first].id] = second;
    this.nodePositionsInHeap[this.heap[second].id] = first;
    [heap[first], heap[second]] = [heap[second], heap[first]];
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private childIndex(index: number, position: 1 | 2): number {
    return 2 * index + position;
  }

  // O(n) time | O(1) space
  buildHeap(array: Node[]) {
    const firstParentIdx = this.parentIndex(array.length - 1);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, heap: Node[]): void {
    const endIdx = heap.length - 1;
    let childOneIdx = this.childIndex(currentIdx, 1);
    while (childOneIdx <= endIdx) {
      let childTwoIdx = this.childIndex(currentIdx, 2);
      if (childTwoIdx > endIdx) childTwoIdx = -1;
      let idxToSwap: number;
      if (
        childTwoIdx !== -1 &&
        heap[childTwoIdx].estimatedDistanceToEnd <
          heap[childOneIdx].estimatedDistanceToEnd
      ) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (
        heap[idxToSwap].estimatedDistanceToEnd <
        heap[currentIdx].estimatedDistanceToEnd
      ) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = this.childIndex(currentIdx, 1);
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: Node[]): void {
    let parentIdx = this.parentIndex(currentIdx);
    while (
      currentIdx > 0 &&
      heap[currentIdx].estimatedDistanceToEnd <
        heap[parentIdx].estimatedDistanceToEnd
    ) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = this.parentIndex(currentIdx);
    }
  }

  // O(1) time | O(1) space
  peek(): Node {
    return this.heap[0];
  }

  // O(log(n)) time | O(1) space
  remove(): Node | undefined {
    if (this.isEmpty()) return;
    this.swap(0, this.heap.length - 1, this.heap);
    const node = this.heap.pop()!;
    delete this.nodePositionsInHeap[node.id];
    this.siftDown(0, this.heap);
    return node;
  }

  // O(log(n)) time | O(1) space
  insert(node: Node): void {
    this.heap.push(node);
    this.nodePositionsInHeap[node.id] = this.heap.length - 1;
    this.siftUp(this.heap.length - 1, this.heap);
  }

  // O(log(n)) time | O(1) space
  update(node: Node) {
    this.siftUp(this.nodePositionsInHeap[node.id], this.heap);
  }
}

function calculateManhattanDistance(start: Node, end: Node): number {
  return Math.abs(start.row - end.row) + Math.abs(start.col - end.col);
}

function reconstructPath(endNode: Node): Graph {
  if (endNode.cameFrom === null) return [];

  let currentNode: Node | null = endNode;
  const path: number[][] = [];

  while (currentNode !== null) {
    path.push([currentNode.row, currentNode.col]);
    currentNode = currentNode.cameFrom;
  }

  path.reverse();

  return path;
}

function initializeNodes(graph: Graph): Node[][] {
  const nodes: Node[][] = [];
  for (const [i, row] of graph.entries()) {
    nodes.push([]);
    for (const [j, value] of row.entries()) {
      const node = new Node(i, j, value);
      nodes[i].push(node);
    }
  }
  return nodes;
}

function getNeighboringNode(
  node: Node,
  nodes: Node[][],
  direction: Direction
): Node | null {
  const numRows = nodes.length;
  const numCols = nodes[0].length;
  const { row, col } = node;
  switch (direction) {
    case Direction.DOWN:
      return row < numRows - 1 ? nodes[node.row + 1][node.col] : null;
    case Direction.LEFT:
      return col > 0 ? nodes[node.row][node.col - 1] : null;
    case Direction.RIGHT:
      return col < numCols - 1 ? nodes[node.row][node.col + 1] : null;
    case Direction.UP:
      return row > 0 ? nodes[node.row - 1][node.col] : null;
  }
}

function getNeighboringNodes(node: Node, nodes: Node[][]): Node[] {
  return [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP]
    .map((direction) => getNeighboringNode(node, nodes, direction))
    .filter(Boolean) as Node[];
}

export function aStarAlgorithm(
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  graph: Graph
) {
  const nodes = initializeNodes(graph);
  const startNode = nodes[startRow][startCol];
  const endNode = nodes[endRow][endCol];

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateManhattanDistance(
    startNode,
    endNode
  );

  const nodesToVisit = new MinHeap([startNode]);

  while (!nodesToVisit.isEmpty()) {
    const currentMinDistanceNode = nodesToVisit.remove()!;

    if (currentMinDistanceNode === endNode) {
      break;
    }

    const neighbors = getNeighboringNodes(currentMinDistanceNode, nodes);
    for (const neighbor of neighbors) {
      if (neighbor.value === 1) {
        continue;
      }

      const tentativeDistanceToNeighbor =
        currentMinDistanceNode.distanceFromStart + 1; // G

      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) {
        continue;
      }

      neighbor.cameFrom = currentMinDistanceNode;
      neighbor.distanceFromStart = tentativeDistanceToNeighbor; // G
      neighbor.estimatedDistanceToEnd =
        tentativeDistanceToNeighbor +
        calculateManhattanDistance(neighbor, endNode); // F = G + H

      if (!nodesToVisit.contains(neighbor)) {
        nodesToVisit.insert(neighbor);
      } else {
        nodesToVisit.update(neighbor);
      }
    }
  }

  return reconstructPath(endNode);
}

const data = {
  startRow: 0,
  startCol: 1,
  endRow: 4,
  endCol: 3,
  graph: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ],
};

const output = [
  [0, 1],
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [3, 1],
  [4, 1],
  [4, 2],
  [4, 3],
];

const result = aStarAlgorithm(
  data.startRow,
  data.startCol,
  data.endRow,
  data.endCol,
  data.graph
);

Deno.test({
  name: "test algorithm",
  fn: () => {
    assertEquals(result, output);
  },
});

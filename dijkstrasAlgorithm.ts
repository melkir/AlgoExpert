function getVertexWithMinDistance(
  minDistances: number[],
  visited: Set<number>
): [number, number] {
  let currentMinDistance = Infinity;
  let vertex = -1;

  for (const [vertexIdx, distance] of minDistances.entries()) {
    if (visited.has(vertexIdx)) continue;
    if (distance <= currentMinDistance) {
      vertex = vertexIdx;
      currentMinDistance = distance;
    }
  }
  return [vertex, currentMinDistance];
}

// O(v^2 + e) time | O(v) space - where v is
// the number of vertices and e is the number of edges
export function dijkstrasAlgorithm(
  start: number,
  edges: number[][][]
): number[] {
  const numberOfVertices = edges.length;
  const minDistances = Array.from({ length: numberOfVertices }, () => Infinity);
  minDistances[start] = 0;

  const visited = new Set<number>();

  while (visited.size < numberOfVertices) {
    const [vertex, currentMinDistance] = getVertexWithMinDistance(
      minDistances,
      visited
    );
    if (currentMinDistance === -1) break;
    visited.add(vertex);
    for (let [destination, distanceToDestination] of edges[vertex]) {
      if (visited.has(destination)) continue;
      let newPathDistance = currentMinDistance + distanceToDestination;
      let currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
      }
    }
  }

  return minDistances.map((value) => (value === Infinity ? -1 : value));
}

const { start, edges } = {
  start: 0,
  edges: [
    [[1, 7]],
    [
      [2, 6],
      [3, 20],
      [4, 3],
    ],
    [[3, 14]],
    [[4, 2]],
    [],
    [],
  ],
};

const output = dijkstrasAlgorithm(start, edges);
console.log(output);

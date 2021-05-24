type Dependency = [number, number];

export function topologicalSort(jobs: number[], deps: Dependency[]) {
  const stack: Record<number, number[]> = jobs.reduce(
    (acc, curr) => ({ ...acc, [curr]: [] }),
    {}
  );
  for (const [requirement, job] of deps) {
    stack[job].push(requirement);
  }
  return stack;
}

const output = topologicalSort(
  [1, 2, 3, 4],
  [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ]
);

console.log(output);

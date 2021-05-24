export function minimumWaitingTime(queries: number[]) {
  queries.sort((a, b) => a - b).pop();
  let sum = 0;
  queries.reduce((acc, curr) => {
    acc += curr;
    sum += acc;
    return acc;
  }, 0);
  return sum;
}

console.log(minimumWaitingTime([3, 2, 1, 2, 6]));

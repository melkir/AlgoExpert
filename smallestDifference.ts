function distance(item1: number, item2: number) {
  return Math.abs(item1 - item2);
}

export function smallestDifference(arrayOne: number[], arrayTwo: number[]) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let minDistance = Infinity;
  let minPair: [number, number] = [-1, -1]
  let idx1 = 0;
  let idx2 = 0;

  while (idx1 < arrayOne.length && idx2 < arrayTwo.length) {
    let a1 = arrayOne[idx1];
    let a2 = arrayTwo[idx2];
    let currentDistance = distance(a1, a2);

    if (currentDistance < minDistance) {
      minPair = [a1, a2];
      minDistance = currentDistance;
    }

    if (a1 < a2) ++idx1;
    else if (a1 > a2) ++idx2;
    else return [a1, a2];
  }

  return minPair;
}

const arrayOne = [-1, 5, 10, 20, 28, 3];
const arrayTwo = [26, 134, 135, 15, 17];

const output = smallestDifference(arrayOne, arrayTwo);
console.log(output);
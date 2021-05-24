// function findLargestNumberIndex(array: number[]): number {
//   let maxIndex = 0;
//   for (let index = 1; index < array.length; index++) {
//     if (array[maxIndex] < array[index]) maxIndex = index;
//   }
//   return maxIndex;
// }

// export function findThreeLargestNumbers(array: number[]) {
//   const result: number[] = [];
//   for (let index = 0; index < 3; index++) {
//     const maxIndex = findLargestNumberIndex(array);
//     result.push(array[maxIndex]);
//     array.splice(maxIndex, 1);
//   }
//   return result.sort((a, b) => a - b);
// }

export function findThreeLargestNumbers(array: number[]) {
  const result = array.slice(0, 3).sort((a, b) => a - b);

  for (let index = 3; index < array.length; index++) {
    const element = array[index];
    if (element > result[0]) {
      if (element > result[1]) {
        result.push(element);
        result.shift();
      } else {
        result[0] = element;
      }
      result.sort((a, b) => a - b);
    }
  }

  return result;
}

const array = [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7];
// const output = [18, 141, 541];
const result = findThreeLargestNumbers(array);
console.log(result);

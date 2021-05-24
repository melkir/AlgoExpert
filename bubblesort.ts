export function bubbleSort(array: number[]) {
  let isSorted = false;
  while (isSorted === false) {
    isSorted = true;
    Array.from({ length: array.length - 1 }).forEach((item, i) => {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        isSorted = false;
      }
    });
  }
  return array;
}

console.log(bubbleSort([8, 5, 2, 9, 5, 6, 3]));

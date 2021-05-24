function swap<T>(i: number, j: number, array: T[]) {
  [array[i], array[j]] = [array[j], array[i]];
}

export function selectionSort(array: number[]) {
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    let smallestIndex = startIdx;
    for (let i = startIdx + 1; i < array.length; ++i) {
      if (array[smallestIndex] > array[i]) smallestIndex = i;
    }
    swap(startIdx, smallestIndex, array);
    startIdx++;
  }
  return array;
}

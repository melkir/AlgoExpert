function swap<T>(i: number, j: number, array: T[]) {
  [array[i], array[j]] = [array[j], array[i]];
}

export function insertionSort(array: number[]) {
  for (let index = 0; index < array.length; ++index) {
    if (array[index + 1] < array[index]) {
      swap(index, index + 1, array);
      for (let i = index; i > 0; --i) {
        if (array[i] < array[i - 1]) {
          swap(i, i - 1, array);
        }
      }
    }
  }
  return array;
}

console.log(insertionSort([8, 5, 2, 9, 5, 6, 3]));

// 8 | 5, 2, 9, 5, 6, 3
// 5, 8 | 2, 9, 5, 6, 3
// 5, 8, 2 | 9, 5, 6, 3
// 5, 2, 8 | 9, 5, 6, 3
// 2, 5, 8 | 9, 5, 6, 3

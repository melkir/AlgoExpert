import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

export function binarySearch(array: number[], target: number): number {
  let lowerBound = 0;
  let upperBound = array.length - 1;

  while (lowerBound <= upperBound) {
    const index = Math.floor((lowerBound + upperBound) / 2);
    if (array[index] === target) {
      return index;
    } else if (array[index] < target) {
      // the value is on the upper band
      lowerBound = index + 1;
    } else {
      // the value is one the lower band
      upperBound = index - 1;
    }
  }
  return -1;
}

// function binary_search_leftmost(A, n, T):
//     L := 0
//     R := n
//     while L < R:
//         m := floor((L + R) / 2)
//         if A[m] < T:
//             L := m + 1
//         else:
//             R := m
//     return L

const array = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73];
const target = 33;
const result = binarySearch(array, target);

Deno.test({
  name: "test algorithm",
  fn: () => {
    assertEquals(result, 3);
  },
});

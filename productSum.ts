type SpecialArray = Array<number | SpecialArray>;

// Tip: You can use the Array.isArray function to check whether an item
// is a list or an integer.
export function productSum(array: SpecialArray) {
  return productSumDepth(array)
}

function productSumDepth(array: SpecialArray, depth = 1) {
  let sum = 0;
  for (const item of array) {
    if (Array.isArray(item)) {
      sum += productSumDepth(item, depth + 1)
    } else {
      sum += item
    }
  }
  return sum * depth;
}

// 5 + 2 + 2 * (7 - 1) + 3 + 2 * (6 + 3 * (-18 + 8) + 4)
const array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
console.log(productSum(array))
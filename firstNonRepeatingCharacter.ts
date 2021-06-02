export function firstNonRepeatingCharacter(string: string) {
  const hash: { [letter: string]: { index: number; count: number } } = {};
  for (let i = 0; i < string.length; ++i) {
    const char = string[i];
    if (hash[char]) {
      hash[char].count += 1;
    } else {
      hash[char] = { index: i, count: 1 };
    }
  }

  return Object.values(hash).find(({ count }) => count === 1)?.index ?? -1;
}

const output = firstNonRepeatingCharacter("abcdcaf");
console.log(output);

export function isPalindrome(string: string) {
  if (string.length < 2) {
    return true;
  }

  let i = 0;
  let j = string.length - 1;

  while (i < j) {
    if (string[i] !== string[j]) return false;
    ++i;
    --j;
  }

  return true;
}

console.assert(isPalindrome("ab") === false);

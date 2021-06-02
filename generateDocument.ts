// O(N+M) Time | O(c) Space
export function generateDocument(characters: string, document: string) {
  const charFrequencies: Record<string, number> = {};

  if (document.length === 0) return true;
  if (characters.length < document.length) return false;

  for (const char of characters) {
    if (!(char in charFrequencies)) charFrequencies[char] = 0;
    charFrequencies[char]++;
  }

  for (const char of document) {
    if (charFrequencies[char] === undefined || charFrequencies[char] <= 0) {
      return false;
    }
    charFrequencies[char]--;
  }

  return true;
}

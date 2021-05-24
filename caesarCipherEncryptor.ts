export function caesarCipherEncryptor(string: string, key: number) {
  const newLetters: string[] = [];
  const newKey = key % 26;
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  for (let letter of string) {
    const newLetterKey = alphabet.indexOf(letter) + newKey;
    newLetters.push(alphabet[newLetterKey % 26]);
  }
  return newLetters.join("");
}

console.assert(caesarCipherEncryptor("xyz", 2) === "zab");

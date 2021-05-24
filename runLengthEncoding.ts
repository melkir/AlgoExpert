export function runLengthEncoding(string: string) {
  const array = string.split("");
  let count = 0;
  let current_letter = array[0];
  let result = "";
  for (let index = 0; index < array.length; index++) {
    const letter = array[index];
    if (letter === current_letter && count < 9) {
      count += 1;
    } else {
      result += `${count}${current_letter}`;
      count = 1;
      current_letter = letter;
    }
  }
  result += `${count}${current_letter}`;
  return result;
}

const input = "AAAAAAAAAAAAABBCCCCDD";
const output = "9A4A2B4C2D";
console.log(runLengthEncoding(input));
console.assert(runLengthEncoding(input) === output);

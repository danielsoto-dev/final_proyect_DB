export default function parser() {
  const ROWS = 14;
  const COLUMNS = 6;
  const myArray1 = [];
  for (let i = 0; i < ROWS; i++) {
    myArray1[i] = [];
    for (let j = 0; j < COLUMNS; j++) {
      myArray1[i][j] = 1;
    }
  }
  return myArray1;
}

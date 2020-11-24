export default function deleteValue(array, condition) {
  const newArray = [...array];
  const index = newArray.findIndex(condition);
  console.log(index);
  if (index > -1) {
    newArray.splice(index, 1);
  }
  console.log(newArray);
  return newArray;
}

export default function deleteValue(array, condition) {
  const newArray = [...array];
  const index = newArray.findIndex(condition);
  if (index > -1) {
    newArray.splice(index, 1);
  }
  return newArray;
}

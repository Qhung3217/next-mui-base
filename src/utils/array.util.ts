export function compare2Array(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => JSON.stringify(item) === JSON.stringify(arr2[index]));
}

export function sortedObject(input) {
  return Object.keys(input)
    .sort()
    .reduce((result, key) => ({...result, [key]: input[key]}), {});
}

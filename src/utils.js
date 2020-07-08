function reverse_combinations(x) {
  return x.length > 3
    ? [x, ...reverse_combinations(x.slice(0, -1))]
    : x.length > 2
    ? [x, reverse_combinations(x.slice(0, -1))]
    : x;
}
function forward_combinations(x) {
  return x.length > 3
    ? [...reverse_combinations(x), ...forward_combinations(x.slice(1))]
    : x.length > 2
    ? [...reverse_combinations(x), forward_combinations(x.slice(1))]
    : x.length > 1
    ? x
    : [];
}
/**
 * Function that generates a few combinations of elements from an Array
 * @param {Array} x Set of elements
 */
export const combinations = (x) =>
  x.length === 2
    ? [forward_combinations(x)].concat(x.map((x) => [x]))
    : forward_combinations(x).concat(x.map((x) => [x]));
/**
 * Function that returns the factorial of an integer
 * @param {BigInteger} x The argument
 */
export const fact = (x) => (x > 1 ? x * fact(x - 1) : 1);

export const allCards = Array(21)
  .join()
  .split(",")
  .map((x, i) => "images/" + String(i) + ".jpg");
export const getSubset = (set, size) =>
  Array(size)
    .join()
    .split(",")
    .reduce(
      (acc, cur, ind) => [
        ...acc,
        set.filter((x) => !acc.includes(x))[
          Math.floor(Math.random() * (21 - ind))
        ],
      ],
      []
    );
export const duplicate = (arr) =>
  arr.reduce((acc, cur) => [...acc, cur, cur], []);
export const shuffle = (arr) => arr.sort((x) => Math.random() - 0.5);

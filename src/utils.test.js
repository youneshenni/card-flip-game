import {
  combinations,
  fact,
  allCards,
  getSubset,
  shuffle,
  duplicate,
} from "./utils";

describe("combinations", () => {
  it("Returns correct combinations", () => {
    expect.assertions(1);
    expect(combinations([1, 2, 3])).toStrictEqual([
      [1, 2, 3],
      [1, 2],
      [2, 3],
      [1],
      [2],
      [3],
    ]);
  });
});
describe("fact", () => {
  it("returns 1 if given 0", () => {
    expect(fact(0)).toBe(1);
  });
  it("returns 1 if given 1", () => {
    expect(fact(1)).toBe(1);
  });
  it("returns correct factorial (24 if given 4)", () => {
    expect(fact(4)).toBe(24);
  });
});
describe("allCards", () => {
  it("should output correct images", () => {
    expect.assertions(1);
    expect(allCards).toStrictEqual([
      "images/0.jpg",
      "images/1.jpg",
      "images/2.jpg",
      "images/3.jpg",
      "images/4.jpg",
      "images/5.jpg",
      "images/6.jpg",
      "images/7.jpg",
      "images/8.jpg",
      "images/9.jpg",
      "images/10.jpg",
      "images/11.jpg",
      "images/12.jpg",
      "images/13.jpg",
      "images/14.jpg",
      "images/15.jpg",
      "images/16.jpg",
      "images/17.jpg",
      "images/18.jpg",
      "images/19.jpg",
      "images/20.jpg",
    ]);
  });
});
describe("getSubset", () => {
  it("Should return array of correct size", () => {
    Array(21)
      .join()
      .split(",")
      .map((x, i) => expect(getSubset(allCards, i + 1).length).toBe(i + 1));
    expect.assertions(21);
  });
  it("Should have no repetitions", () => {
    Array(21)
      .join()
      .split(",")
      .map((x, i) =>
        expect(
          getSubset(allCards, i + 1).reduce(
            (acc, cur, ind, arr) =>
              acc ? (arr.slice(0, ind).includes(cur) ? false : true) : false,
            []
          )
        ).toBeTruthy()
      );
  });
  expect.assertions(21);
  it("Should only return strings (no undefined)", () => {
    expect.assertions(21);
    Array(21)
      .join()
      .split(",")
      .map((x, i) =>
        expect(
          getSubset(allCards, i + 1).some((x) => typeof x !== "string")
        ).toBeFalsy()
      );
  });
});
describe("duplicate", () => {
  it("Should return an array whose size is double the original size", () => {
    expect(duplicate([1, 2, 3]).length).toBe(6);
  });
  it("Should duplicate each item", () => {
    expect(
      duplicate([1, 2, 3]).reduce(
        (acc, cur) =>
          Object.keys(acc).includes(String(cur))
            ? { ...acc, [cur]: acc[cur] + 1 }
            : { ...acc, [cur]: 1 },
        {}
      )
    ).toStrictEqual({ 1: 2, 2: 2, 3: 2 });
  });
});

describe("Shuffle", () => {
  it("Should keep the length", () => {
    expect(shuffle([1, 2, 3]).length).toBe(3);
  });
  it("Should change the order", () => {
    expect(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);
  });
  it("Should keep the same elements", () => {
    expect.assertions(3);
    expect(shuffle([1, 2, 3]).includes(1)).toBeTruthy();
    expect(shuffle([1, 2, 3]).includes(2)).toBeTruthy();
    expect(shuffle([1, 2, 3]).includes(3)).toBeTruthy();
  });
});

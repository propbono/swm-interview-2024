const isPrime = (value: number): boolean => {
  if (value <= 1) return false;

  if (value <= 3) return true;

  if (value % 2 === 0 || value % 3 === 0) return false;

  for (let l1 = 5; l1 * l1 < value; l1 += 6) {
    if (value % l1 === 0 || value % (l1 + 2) === 0) return false;
  }

  return true;
};

const getNumbersOccuerdPrimeTimes = (
  sequence: number[]
): {
  [key: number]: number;
} => {
  const numbersCount: { [key: number]: number } = {};
  const primeCount: { [key: number]: number } = {};

  for (const num of sequence) {
    numbersCount[num] = (numbersCount[num] || 0) + 1;
  }

  for (const [num, frequency] of Object.entries(numbersCount)) {
    const index: number = Number(num);
    if (isPrime(frequency)) {
      primeCount[index] = frequency;
    }
  }

  return primeCount;
};

const filterTwoSequences = (
  sequenceA: number[],
  sequenceB: number[]
): number[] => {
  const numberOccuedPrimeTimes = getNumbersOccuerdPrimeTimes(sequenceB);
  const resultSequence = [];

  for (const num of sequenceA) {
    if (!numberOccuedPrimeTimes[num]) resultSequence.push(num);
  }

  return resultSequence;
};

// Tests
import { describe, expect, it } from "vitest";

describe("Project evaluation criteria", () => {
  it("should contain all elements from sequence A (maintaining the order) except those, that are present in sequence B p times, where p is a prime number", () => {
    const sequenceA = [2, 3, 9, 2, 5, 1, 3, 7, 10];
    const sequenceB = [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10];
    const expected = [2, 9, 2, 5, 7, 10];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(expected).toEqual(result);
  });

  it("should return an empty array if sequence A is empty", () => {
    const sequenceA: number[] = [];
    const sequenceB = [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10];

    const expected: number[] = [];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(expected).toEqual(result);
  });

  it("should return an sequence A array if sequence B is empty", () => {
    const sequenceA = [2, 3, 9, 2, 5, 1, 3, 7, 10];
    const sequenceB: number[] = [];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(sequenceA).toEqual(result);
  });

  it("should return an empty array if both sequence A and sequence B are empty", () => {
    const sequenceA: number[] = [];
    const sequenceB: number[] = [];

    const expected: number[] = [];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(expected).toEqual(result);
  });
});

describe("Is Prime number tests", () => {
  it("should return false if number is 0", () => {
    const result = isPrime(0);
    expect(result).toBeFalsy();
  });

  it("should return false if number is 1", () => {
    const result = isPrime(1);
    expect(result).toBeFalsy();
  });

  it("should return true if number is 2 or 3", () => {
    const result1 = isPrime(2);
    expect(result1).toBeTruthy();

    const result2 = isPrime(3);
    expect(result2).toBeTruthy();
  });

  it("should return false if number is divided by 2 or 3", () => {
    const result1 = isPrime(4);
    expect(result1).toBeFalsy();

    const result2 = isPrime(6);
    expect(result2).toBeFalsy();
  });

  it("should return false if number is 30", () => {
    const result = isPrime(30);
    expect(result).toBeFalsy();
  });

  it("should return true if number is 37", () => {
    const result = isPrime(37);
    expect(result).toBeTruthy();
  });

  it("should return false if number is negative", () => {
    const result = isPrime(-7);
    expect(result).toBeFalsy();
  });

  it("should return false if number is 0", () => {
    const result = isPrime(0);
    expect(result).toBeFalsy();
  });

  it("should return false if number is a large non-prime number", () => {
    const result = isPrime(1000000);
    expect(result).toBeFalsy();
  });

  it("should return true if number is a large prime number", () => {
    const result = isPrime(1000003);
    expect(result).toBeTruthy();
  });
});

describe("Count Prime Numbers function", () => {
  it("should return an object with keys and count that are n number in sequence when n is a prime", () => {
    const sequence = [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10];
    const expected: {
      [key: number]: number;
    } = {
      1: 2,
      3: 2,
      6: 2,
    };

    const result = getNumbersOccuerdPrimeTimes(sequence);

    expect(expected).toMatchObject(result);
  });
});

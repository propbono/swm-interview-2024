import { describe, expect, it } from 'vitest';
import { filterTwoSequences, getPossiblePrimeNumberOccurences } from './main';

describe('Project evaluation criteria', () => {
  it('should contain all elements from sequence A (maintaining the order) except those, that are present in sequence B p times, where p is a prime number', () => {
    const sequenceA = [2, 3, 9, 2, 5, 1, 3, 7, 10];
    const sequenceB = [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10];
    const expected = [2, 9, 2, 5, 7, 10];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(expected).toEqual(result);
  });

  it('should return an empty array if sequence A is empty', () => {
    const sequenceA: number[] = [];
    const sequenceB = [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10];

    const expected: number[] = [];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(expected).toEqual(result);
  });

  it('should return an sequence A array if sequence B is empty', () => {
    const sequenceA = [2, 3, 9, 2, 5, 1, 3, 7, 10];
    const sequenceB: number[] = [];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(sequenceA).toEqual(result);
  });

  it('should return an empty array if both sequence A and sequence B are empty', () => {
    const sequenceA: number[] = [];
    const sequenceB: number[] = [];

    const expected: number[] = [];

    const result = filterTwoSequences(sequenceA, sequenceB);

    expect(expected).toEqual(result);
  });
});
describe('getPossiblePrimeNumberOccurences - Find Prime Numbers Up to n max length of array', () => {
  it('should return an empty array if Sequence B is empty', () => {
    const sequence = [];
    const expected: Number[] = [];

    const result = getPossiblePrimeNumberOccurences(sequence.length);

    expect(expected).toMatchObject(result);
  });

  it('should return an empty array if Sequence B has only one element', () => {
    const sequence = [1];
    const expected: Number[] = [];

    const result = getPossiblePrimeNumberOccurences(sequence.length);

    expect(expected).toMatchObject(result);
  });

  it('should return an array of prime numbers calculated based on Sequence B length', () => {
    const sequence1 = [1, 2];
    const expected1: Number[] = [2];

    const result1 = getPossiblePrimeNumberOccurences(sequence1.length);

    expect(expected1).toMatchObject(result1);

    const sequence2 = [1, 2, 3, 4, 5, 6];
    const expected2: Number[] = [2, 3, 5];

    const result2 = getPossiblePrimeNumberOccurences(sequence2.length);

    expect(expected2).toMatchObject(result2);

    const sequence3 = [4, 6, 2, 5, 6, 7, 8, 0];
    const expected3: Number[] = [2, 3, 5, 7];

    const result3 = getPossiblePrimeNumberOccurences(sequence3.length);

    expect(expected3).toMatchObject(result3);
  });
});
describe('Occurrence counting in filterTwoSequences', () => {
  it('should correctly count occurrences of numbers from sequenceA in sequenceB', () => {
    const sequenceA = [1, 2, 3, 4, 5];
    const sequenceB = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    const result = filterTwoSequences(sequenceA, sequenceB);
    expect(result).toEqual([1, 4]);
  });

  it('should handle large numbers of occurrences', () => {
    const sequenceA = [1, 2];
    const sequenceB = new Array(100).fill(1).concat(new Array(101).fill(2));
    const result = filterTwoSequences(sequenceA, sequenceB);
    expect(result).toEqual([2]);
  });

  it('should handle numbers with zero occurrences', () => {
    const sequenceA = [1, 2, 3, 4, 5];
    const sequenceB = [1, 1, 2, 2, 4, 4, 5, 5];
    const result = filterTwoSequences(sequenceA, sequenceB);
    expect(result).toEqual([3]);
  });

  it('should handle negative numbers', () => {
    const sequenceA = [-1, -2, -3, 0, 1, 2, 3];
    const sequenceB = [-1, -1, -2, -2, -2, 0, 0, 1, 2, 2, 3, 3, 3];
    const result = filterTwoSequences(sequenceA, sequenceB);
    expect(result).toEqual([-1, 0, 1]);
  });

  it('should handle duplicate numbers in sequenceA', () => {
    const sequenceA = [1, 2, 2, 3, 3, 3];
    const sequenceB = [1, 2, 2, 3, 3, 3, 3];
    const result = filterTwoSequences(sequenceA, sequenceB);
    expect(result).toEqual([1, 2, 2]);
  });
});

// Language: Typescript 5.5.4
// Testing Lib: Vitest 2.0.4
// Time complexity: O(m + n + k log log k)
// Possible improvements: We could use sieve of Atking algorithm for calculating the set of possible prime number occurrences and improve time complexity to O(m + n + k/log log k) Howerver this alghoritm is more efficient for very large numbers. Taking into consideration the complexity of this alghoritm and that we use only maximum possible number occurence to calculate primes I decided to use Sieve of Erasthotenes algorithm.

/**
 * Calculates the set of possible prime number occurrences for a given sequence length.
 *
 * This function uses the Sieve of Eratosthenes algorithm to generate a list of prime numbers up to the given sequence length, and then returns a Set containing these prime numbers.
 *
 * @param sequenceLength - The maximum length of the sequence to consider.
 * @returns A Set of prime numbers that could occur in a sequence of the given length.
 */
export const getPossiblePrimeNumberOccurences = (
  sequenceLength: number
): Set<number> => {
  const resultSequence: number[] = [];

  if (sequenceLength <= 1) return new Set(resultSequence);

  const primes = Array.from({ length: sequenceLength + 1 }, (_, index) => true);

  for (let p = 2; p * p <= sequenceLength; p++) {
    if (primes[p]) {
      for (let i = p * p; i <= sequenceLength; i += p) {
        primes[i] = false;
      }
    }
  }

  for (let i = 2; i <= sequenceLength; i++) {
    if (primes[i]) {
      resultSequence.push(i);
    }
  }

  return new Set(resultSequence);
};

/**
 * Filters the elements of `sequenceA` that do not have a corresponding occurrence count in `sequenceB` that is a possible prime number occurrence.
 *
 * This function first counts the occurrences of each number in `sequenceB` and stores the counts in an object. It then uses the `getPossiblePrimeNumberOccurences` function to get a set of possible prime number occurrences based on the maximum occurrence count in `sequenceB`. Finally, it filters `sequenceA` to only include numbers that either do not appear in `sequenceB` or have an occurrence count that is not a possible prime number occurrence.
 *
 * @param sequenceA - The first sequence to filter.
 * @param sequenceB - The second sequence to use for occurrence counting.
 * @returns A new array containing the filtered elements of `sequenceA`.
 */
export const filterTwoSequences = (
  sequenceA: number[],
  sequenceB: number[]
): number[] => {
  const resultSequence = [];
  const occurenceCountInSequenceB: { [key: number]: number } = {};

  let maxOccurenceCount = 0;
  const sequenceASet = new Set(sequenceA);

  for (const num of sequenceB) {
    if (sequenceASet.has(num)) {
      occurenceCountInSequenceB[num] =
        (occurenceCountInSequenceB[num] || 0) + 1;
    }
    if (occurenceCountInSequenceB[num] > maxOccurenceCount)
      maxOccurenceCount = occurenceCountInSequenceB[num];
  }

  const maxPossiblePrimeOccurences =
    getPossiblePrimeNumberOccurences(maxOccurenceCount);

  for (const num of sequenceA) {
    const value = occurenceCountInSequenceB[num];
    if (!value || !maxPossiblePrimeOccurences.has(value))
      resultSequence.push(num);
  }

  return resultSequence;
};

const sequenceA = [
  62, 38, 80, 33, 47, 43, 5, 8, 95, 77, 36, 12, 3, 29, 44, 13, 98, 95, 7, 66,
  66, 60, 88, 75, 48, 41, 92, 34, 83, 33, 94, 48, 10, 33, 48, 15, 53, 48, 83,
  89, 60, 91, 69, 90, 24, 27, 77, 31, 48, 33, 67, 57, 27, 100, 27, 45, 91, 91,
  91, 31, 48, 70, 68, 75, 36, 94, 92, 67, 27, 14, 91, 62, 35, 79, 65, 56, 20,
  25, 49, 87, 25, 66, 23, 92, 8, 75, 49, 43, 25, 25, 36, 52, 77, 53, 14, 43, 15,
  12, 25, 84, 77, 13, 62, 61, 13, 91, 37, 7, 2, 29, 91, 68, 47, 60, 77, 95, 15,
  23, 8, 13, 79, 33, 97, 95, 41, 77, 62, 92, 20, 90, 42, 36, 77, 44, 90, 45, 48,
  33, 97, 30, 8, 25, 15, 52, 92, 63, 23, 77, 41, 25, 71, 18, 33, 66, 41, 25, 23,
  94, 94, 75, 97, 97, 23, 23, 48, 35, 12, 63, 69, 43, 24, 97, 89, 71, 25, 49,
  79, 94, 43, 69, 4, 83, 45, 67, 77, 89, 92, 8, 23, 7, 23, 33, 97, 50, 14, 71,
  15, 29, 77, 84, 53, 92, 47, 17, 88, 10, 47, 1, 68, 24, 34, 49, 65, 84, 98, 87,
  92, 83, 43, 50, 64, 24, 12, 56, 40, 85, 68, 5, 43, 48, 53, 67, 50, 50, 15, 61,
  15, 56, 75, 52, 50, 38, 95, 50, 27, 92, 77, 12, 38, 9, 98, 97, 57, 48, 8, 37,
  17, 67, 43, 69, 95, 82, 98, 22, 40, 21, 45, 13, 82, 49, 64, 20, 37, 4, 58, 25,
  67, 55, 52, 63, 7, 40, 19, 60, 61, 50, 2, 3, 59, 12, 89, 65, 61, 44, 3, 7, 80,
  42, 10, 72, 36, 49, 84, 60, 43, 35, 47, 100, 87, 67, 24, 76, 60, 29, 6, 14,
  91, 81, 85, 15, 46, 87, 3, 33, 25,
];
const sequenceB = [
  45, 51, 32, 65, 11, 63, 99, 97, 23, 79, 62, 22, 87, 8, 23, 100, 36, 85, 17, 2,
  84, 64, 24, 9, 7, 64, 92, 45, 100, 19, 36, 37, 82, 89, 91, 70, 10, 55, 80, 84,
  60, 75, 48, 72, 99, 31, 74, 45, 51, 27, 29, 57, 51, 71, 42, 91, 44, 74, 36,
  17, 15, 27, 97, 63, 100, 52, 11, 89, 39, 54, 78, 35, 89, 12, 32, 2, 25, 34,
  55, 34, 74, 59, 36, 18, 85, 55, 52, 23, 35, 3, 79, 65, 77, 70, 39, 88, 99, 47,
  49, 95, 78, 51, 15, 84, 98, 66, 78, 6, 67, 27, 5, 89, 67, 12, 74, 82, 73, 40,
  89, 7, 83, 67, 80, 12, 30, 78, 5, 63, 89, 72, 26, 8, 68, 19, 36, 44, 55, 59,
  72, 23, 72, 13, 79, 32, 67, 80, 69, 60, 95, 95, 62, 27, 37, 53, 25, 99, 91, 1,
  10, 63, 29, 98, 76, 39, 31, 29, 56, 84, 75, 48, 22, 80, 61, 85, 97, 93, 25,
  87, 30, 84, 2, 93, 81, 68, 43, 16, 74, 31, 44, 50, 2, 34, 4, 54, 89, 96, 6,
  58, 57, 14, 46, 86, 99, 42, 43, 97, 98, 28, 8, 70, 20, 83, 77, 100, 73, 55,
  84, 61, 55, 12, 32, 20, 77, 99, 83, 6, 74, 25, 55, 22, 74, 66, 20, 85, 59, 20,
  89, 80, 50, 75, 4, 90, 95, 74, 53, 45, 57, 12, 87, 14, 64, 25, 96, 54, 90, 93,
  68, 72, 53, 11, 3, 86, 26, 38, 62, 60, 25, 81, 68, 72, 64, 22, 41, 82, 47, 55,
  59, 47, 13, 14, 70, 11, 8, 20, 97, 34, 67, 72, 13, 58, 39, 6, 52, 27, 35, 54,
  84, 10, 75, 75, 55, 2, 18, 44, 74, 58, 20, 56, 6, 74, 55, 4, 68, 61, 97, 8,
  29, 24, 77, 81, 76, 96, 9, 44, 53, 19, 43, 94, 15, 52, 52, 20, 28, 36, 78, 76,
  100, 1, 22, 25, 18, 68, 85, 4, 58, 2,
];
const result = filterTwoSequences(sequenceA, sequenceB);

console.log(result);

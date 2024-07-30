# Project for interview at SWM

## Description

Interview task is composed from two parts, coding excercise and an essay. Below you can see the information about programming task. Essay can task can be found [here](swm-task.md)

### Programming Task

Write a function that receives two sequences: A and B of integers and returns one sequence C. Sequence C should contain all elements from sequence A (maintaining the order) except those, that are present in sequence B p times, where p is a prime number.

Example:
A=[2,3,9,2,5,1,3,7,10]

B=[2,1,3,4,3,10,6,6,1,7,10,10,10]

C=[2,9,2,5,7,10]

Notes:

1. The time complexity is important – try to write an algorithm with good time complexity and specify it in your answer.

2. You can choose any reasonable type present in your chosen language to represent the sequence.

3. Make sure the function signature is correct.

4. Write your own code to test primality.

## Programming task implementation

### Language

Typescript 5.5.4

### Testing Lib

Vitest 2.0.4

### Time complexity

O(m + n + k log log k)

### Possible improvements

We could use sieve of Atking algorithm for calculating the set of possible prime number occurrences and improve time complexity to O(m + n + k/log log k) Howerver this alghoritm is more efficient for very large numbers. Taking into consideration the complexity of this alghoritm and that we use only maximum possible number occurence to calculate primes I decided to use Sieve of Erasthotenes algorithm.

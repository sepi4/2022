import { readInput } from "../../lib/js/index.mjs"

let input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`


input = await readInput('./2022/01/input.txt')

let arr = input.split('\n')

let max = 0
let currentSum = 0
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === '') {
    if (currentSum > max) {
      max = currentSum
    }
    currentSum = 0
  } else {
    currentSum += Number(arr[i])
  }
}

console.log(max)


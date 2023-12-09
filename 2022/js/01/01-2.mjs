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
let allSums = []
let currentSum = 0
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === '' || i === arr.length - 1) {
    allSums.push(currentSum)
    currentSum = 0
  } else {
    currentSum += Number(arr[i])
  }
}
allSums.sort((a, b) => b - a)

let top3Sum = 0
for (let i = 0; i < 3; i++) {
  top3Sum += allSums[i]
}
console.log(allSums)
console.log(top3Sum)

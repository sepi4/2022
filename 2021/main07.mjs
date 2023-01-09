import { readInput } from "../lib/js/index.mjs"
let input = await readInput('./2021/main07-input.txt')

let arr = input.split(',').map(Number)
let max = -Infinity
let min = Infinity

for (let x of arr) {
    if (x > max) {
        max = x
    }
    if (x < min) {
        min = x
    }
}
// console.log(max)
// console.log(min)

let smallestSum = -1
for (let i = 0; i <= max; i++) {
    let sum = 0

    //// part1
    // for (let x of arr) {
    //     sum += Math.abs(i - x)
    // }

    //part2
    for (let x of arr) {
        let steps = Math.abs(i - x)
        for (let fuel = 1; fuel <= steps; fuel++) {
            sum += fuel
        }
    }

    if (smallestSum === -1 || sum < smallestSum) {
        smallestSum = sum
    }
    // console.log(sum)
}
console.log(smallestSum)

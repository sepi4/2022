import { readInput } from "../lib/js/index.mjs"
let input = await readInput('./2021/main06-input.txt')

// input = '3,4,3,1,2'

let nums = input.split(',').map(Number)

let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]

for (let f of nums) {
    arr[f]++
}
console.log(arr)

for (let d = 0; d < 256; d++) {
    // console.log(arr)
    let first = arr[0]
    for (let i = 0; i < 9 - 1; i++) {
        arr[i] = arr[i + 1]
    }
    arr[6] += first
    arr[8] = first
}

console.log(arr)

let sum = 0
for (let x of arr) {
    sum += x
}
console.log(sum)

// for (let i = 0, x = 0; i < 256; i++) {
//     let newArr = []
//     for (let j = 0; j < arr.length - x; j++) {
//         if (arr[j] === 0) {
//             arr.push(8)
//             arr[j] = 6
//             x++
//         } else {
//             arr[j]--
//         }
//     }
//     // console.log(i + 1 + 'day ', JSON.stringify(arr))
//     x = 0
// }
// console.log(arr.length)

import { readInput } from "../lib/js/index.mjs"

const data = await readInput('./2021/main01-input.txt')
const arr = data.split('\n').map((x) => Number(x))

// let i = 0
// let pre
// for (const x of arr) {
//   if (pre !== undefined) {
//     if (x > pre) {
//       i++
//     }
//   }
//   pre = x
// }

let pre
let incremets = 0
for (let i = 0; i + 2 < arr.length; i++) {
  let sum = arr[i] + arr[i + 1] + arr[i + 2]
  if (pre !== undefined) {
    if (sum > pre) {
      incremets++
    }
  }
  pre = sum
}
console.log(incremets)

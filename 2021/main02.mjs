import { readInput } from "../lib/js/index.mjs"
let data = await readInput('./2021/main02-input.txt')
data = data
  .split('\n')
  .map((x) => x.split(' '))
  .map((x) => [x[0], Number(x[1])])

let f = 0
let d = 0
let a = 0
for (const x of data) {
  if (x[0] === 'forward') {
    f += x[1]
    d += a * x[1]
  } else if (x[0] === 'down') {
    a += x[1]
  } else {
    a -= x[1]
  }
}

console.log(f * d)

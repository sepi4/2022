import { readInput } from "../../lib/js/index.mjs"

let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

input = await readInput('./2022/04/input.txt')

let inputArr = input
  .split('\n')
  .map(row => row.split(',')
    .map(x => x.split('-')
      .map(x => Number(x))
    )
  )


console.log(inputArr)

let amount = 0
for (let row of inputArr) {
  let a = row[0]
  let b = row[1]
  if (oneOverlap(a, b) || allOverlap(a, b)) {
    amount++
  }
}
console.log(amount)






function oneOverlap(a, b) {
  return a[1] >= b[0] && a[1] <= b[1] ||
    a[0] >= b[0] && a[0] <= b[1]
}
function allOverlap(a, b) {
  return a[0] <= b[0] && a[1] >= b[1] ||
    b[0] <= a[0] && b[1] >= a[1]

}
import { readInput } from "../../lib/js/index.mjs"

let input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

input = await readInput('./2022/03/input.txt')

let arr = input.split('\n')
console.log(arr)

let sum = 0
for (let row of arr) {
  console.log(row)
  let found = {}
  for (let i = 0; i < row.length / 2; i++) {
    let char = row[i]
    found[char] = char
  }

  for (let i = row.length / 2; i < row.length; i++) {
    let char = row[i]
    if (found[char] !== undefined) {
      if (char.toLowerCase() === char) {
        sum += lower(char)
      } else {
        sum += upper(char)
      }
      break
    }
  }
}

console.log(sum)


function lower(char) {
  return 1 + char.charCodeAt(0) - 'a'.charCodeAt(0)
}
function upper(char) {
  return 27 + char.charCodeAt(0) - 'A'.charCodeAt(0)
}


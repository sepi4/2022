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
let found
for (let i = 0; i < arr.length; i++) {
  let row = arr[i]
  if (i % 3 === 0) {
    found = {}
  }

  for (let x = 0; x < row.length; x++) {
    let char = row[x]
    if (!found[char]) {
      found[char] = {}
    }
    found[char][i % 3] = true
  }
  if (i % 3 === 2 ) {
    console.log(found)
    for (let c of Object.keys(found)) {
      let v = found[c]
      if (v[0] && v[1] && v[2]) {
        sum += getCharScore(c)
      }
    }
  }
  
}

console.log(sum)

function getCharScore(char) {
  if (char.toLowerCase() === char) {
    return lower(char)
  } else {
    return upper(char)
  }
}

function lower(char) {
  return 1 + char.charCodeAt(0) - 'a'.charCodeAt(0)
}
function upper(char) {
  return 27 + char.charCodeAt(0) - 'A'.charCodeAt(0)
}


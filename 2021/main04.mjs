import { readInput } from "../lib/js/index.mjs"
let data = await readInput('./2021/main04-input.txt')
data = data.split('\n\n')

const nums = data[0].split(',').filter((x) => x !== ' ')

const arr = data
  .slice(1)
  .map((x) => x.split('\n').map((k) => k.split(/ +?/g).filter((x) => x !== '')))

const showenNumbers = []
const winners = []

function check(index, hor) {
  for (let a = 0; a < arr[index].length; a++) {
    const aa = []
    for (let b = 0; b < arr[index][a].length; b++) {
      const x = hor ? arr[index][a][b] : arr[index][b][a]
      if (showenNumbers.includes(x)) {
        aa.push(x)
      }
    }
    if (aa.length === arr[index][a].length) {
      if (!winners.includes(index)) {
        winners.push(index)
      }
      if (winners.length === 100) {
        // last
        return true
      }
    }
  }
}

console.log(nums)
console.log(arr)

function winnerIndex() {
  for (const x of nums) {
    showenNumbers.push(x)
    for (let i = 0; i < arr.length; i++) {
      if (!winners.includes(i)) {
        if (check(i, true)) {
          return i
        }
        if (check(i, false)) {
          return i
        }
      }
    }
  }
}

function getSum(index) {
  let sum = 0
  for (let a = 0; a < arr[index].length; a++) {
    for (let b = 0; b < arr[index][a].length; b++) {
      const x = arr[index][a][b]
      if (!showenNumbers.includes(x)) {
        sum += Number(x)
      }
    }
  }
  return sum
}

// const win = winnerIndex()

winnerIndex()
const win = winners[winners.length - 1]

console.log(winners)
console.log(showenNumbers)
const sum = getSum(win)
const last = Number(showenNumbers[showenNumbers.length - 1])

// console.log(arr[win])
// console.log(showenNumbers)
console.log(sum)
console.log(last)
console.log(sum * last)

// check(99)

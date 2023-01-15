import { readInput } from "../../lib/js/index.mjs"

let input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

input = await readInput('./2022/05/input.txt')

let arr = input.split('\n')
let inputStacks = []
let inputMoves = []

let toMoves = false
for (let row of arr) {
  if (row.startsWith('move') && !toMoves) {
    toMoves = true
  }
  if (toMoves) {
    inputMoves.push(row)
  } else {
    inputStacks.push(row)
  }
}

let moves = makeMoves(inputMoves)
let stacks = makeStacks(inputStacks)
// console.log(stacks)
// console.log(moves)

for (let m of moves) {
  for (let i = m.move; i > 0; i--) {
    let x = stacks[m.from].pop()
    stacks[m.to].push(x)
  }
}

let message = ''
for (let s of stacks) {
  message += s[s.length - 1]
}
console.log(message)


function makeMoves(inputMoves) {
  let m = []
  for(let row of inputMoves) {
    let r = row.split(' ')
    m.push({
      move: +r[1],
      from: +r[3] - 1,
      to: +r[5] - 1,
    })
  }
  return m
}

function makeStacks(inputStacks) {
  inputStacks.pop()
  inputStacks.pop()

  let s = []
  for (let i = inputStacks.length - 1; i >= 0; i--) {
    let stackIndex = 0
    for (let j = 1; j < inputStacks[i].length; j += 4, stackIndex++) {
      const letter = inputStacks[i][j]
      if (i === inputStacks.length - 1) { // first
        s.push([])
      }
      if (letter !== ' ') {
        s[stackIndex].push(letter)
      }
    }
  }
  return s
}


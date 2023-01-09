import { readInput } from "../../lib/js/index.mjs"

let input = `A Y
B X
C Z`
input = await readInput('./2022/02/input.txt')


let rows = input.split('\n').map(row => row.split(' '))
console.log(rows)

let keys = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
}

let sum = 0
for (let row of rows) {
  let he = keys[row[0]]
  let me = keys[row[1]]
  if (he === 'Rock' && me === 'Paper') {
    // me
    sum += 6
    sum += 2
  } else if (he === 'Rock' && me === 'Scissors') {
    // he
    sum += 0
    sum += 3
  } else if (he === 'Rock' && me === 'Rock') {
    // draw
    sum += 3
    sum += 1
  } else if (he === 'Paper' && me === 'Rock') {
    // he
    sum += 0
    sum += 1
  } else if (he === 'Paper' && me === 'Scissors') {
    // me
    sum += 6
    sum += 3
  } else if (he === 'Paper' && me === 'Paper') {
    // draw
    sum += 3
    sum += 2
  } else if (he === 'Scissors' && me === 'Paper') {
    // he
    sum += 0
    sum += 2
  } else if (he === 'Scissors' && me === 'Rock') {
    //me
    sum += 6
    sum += 1
  } else if (he === 'Scissors' && me === 'Scissors') {
    // draw
    sum += 3
    sum += 3
  } else {
    throw Error('virhe')
  }
}
console.log(sum)


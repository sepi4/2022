import { readInput } from "../../lib/js/index.mjs"

let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

input = await readInput('./2022/09/input.txt')

let moves = input.split('\n').map(row => {
  row = row.split(' ')
  return {
    dir: row[0],
    n: Number(row[1]),
  }
})
// console.log(moves)

let H = { y: 0, x: 0, }
let T = { y: 0, x: 0, }

let tailMoves = {}

// console.log(H)
for (let move of moves) {
  while(move.n--) {
    H = makeHeadMove(H, move)
    T = makeTailMove(H, T)
    tailMoves[`${T.y},${T.x}`] = true
    // console.log(H, T)
  }
}

let tailMovesAmount = Object.keys(tailMoves).length
console.log(tailMovesAmount)

function makeTailMove(H, T) {
  let yDiff = Math.abs(H.y - T.y)
  let xDiff = Math.abs(H.x - T.x)
  if (yDiff > 1) {
    if (H.y > T.y) {
      T.y = T.y + 1
    } else {
      T.y = T.y - 1
    }
    if (xDiff > 0) {
      T.x = H.x
    }
  }
  if (xDiff > 1) {
    if (H.x > T.x) {
      T.x = T.x + 1
    } else {
      T.x = T.x - 1
    }
    if (yDiff > 0) {
      T.y = H.y
    }
  }
  return T
}

function makeHeadMove(coor, move) {
  switch (move.dir) {
    case 'U':
      return {
        y: coor.y + 1,
        x: coor.x,
      }
    case 'D':
      return {
        y: coor.y - 1,
        x: coor.x,
      }
    case 'L':
      return {
        y: coor.y,
        x: coor.x - 1,
      }
    case 'R':
      return {
        y: coor.y,
        x: coor.x + 1,
      }
    default:
      throw Error('wrong move')
  }
}


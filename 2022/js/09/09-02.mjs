import { readInput } from "../../lib/js/index.mjs"

/*
        ....H.
        ....1.
        ....2.
        .543..
        6.....
*/

let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

// // sepi test
// input = `R 3
// U 1
// L 1
// U 1
// R 1
// U 1
// `


input = await readInput('./2022/09/input.txt')

let moves = input.split('\n').map(row => {
  row = row.split(' ')
  return {
    dir: row[0],
    n: Number(row[1]),
  }
})
// console.log(moves)

let rope = [
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
  { y: 0, x: 0, },
]


let H = { y: 0, x: 0, }
let T = { y: 0, x: 0, }
let tailMoves = {}

let ii = 0
for (let move of moves) {
  while(move.n--) {
    rope[0] = makeHeadMove(rope[0], move)
    for (let i = 1; i < rope.length; i++) {
      rope[i] = makeTailMove(rope[i-1], rope[i])
    }
    let tail = rope[rope.length - 1]
    if (!tailMoves[`${tail.y}:${tail.x}`]) {
      // console.log(tail)
    }
    tailMoves[`${tail.y}:${tail.x}`] = true
    ii++
    // console.log(move, ii, JSON.stringify(rope))
  }
}

let tailMovesAmount = Object.keys(tailMoves).length
printTailPositions(tailMoves)
console.log(tailMovesAmount)
// console.log(tailMoves[`${1}:${-1}`])
// console.log(tailMoves)

/**
 * Tail calculated based on head position
 * @param {{y: number, x: number}} H 
 * @param {{y: number, x: number}} T 
 * @returns T
 */
function makeTailMove(H, T) {
  let yDiff = Math.abs(H.y - T.y)
  let xDiff = Math.abs(H.x - T.x)
  if (yDiff === 2) {
    if (H.y > T.y) {
      T.y = T.y + 1
    } else {
      T.y = T.y - 1
    }
    if (H.x > T.x) {
      T.x = T.x + 1
    } else if (H.x < T.x) {
      T.x = T.x - 1
    }
  } else if (xDiff === 2) {
    if (H.x > T.x) {
      T.x = T.x + 1
    } else {
      T.x = T.x - 1
    }
    if (H.y > T.y) {
      T.y = T.y + 1
    } else if (H.y < T.y) {
      T.y = T.y - 1
    }
  }
  return T
}

/**
 * Head moves first and tail follows
 * @param {{y: number, x: number}} coor 
 * @param {'U' | 'D' | 'L' | 'R'} move 
 * @returns 
 */
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

function printTailPositions(tailMoves) {
  let minY
  let minX
  let maxY
  let maxX
  for (let k of Object.keys(tailMoves)) {
    let [a, b] = k.split(':')
    a = Number(a)
    b = Number(b)
    if (minY === undefined || minY > a) {
      minY = a
    }
    if (minX === undefined || minX > b) {
      minX = b
    }
    if (maxY === undefined || maxY < a) {
      maxY = a
    }
    if (maxX === undefined || maxX < b) {
      maxX = b
    }
  }
  // console.log(minY, maxY, maxY - minY)
  // console.log(minX, maxX, maxX - minX)

  for (let y = maxY; y >= minY; y--) {
    let row = ''
    for (let x = minX; x <= maxX; x++) {
      if (y === 0 && x === 0) {
        row += 's'
      } else if (tailMoves[`${y}:${x}`]) {
        row += '#'
      } else {
        row += '.'
      }
    }
    console.log(row)
  }

}

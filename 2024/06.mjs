import { readInput } from '../lib/js/index.mjs'

class GuardWalking {
  matrix = null
  dir = { dy: -1, dx: 0 } // up
  position = null
  visited = {}

  constructor(input) {
    this.matrix = input.split('\n').map(row => row.split(''))
    this.position = this.getStartingPosition()
  }

  markPosition() {
    this.matrix[this.position.y][this.position.x] = 'X'
  }

  checkIfVisited() {
    let key = this.getVisitedKey()
    if (this.visited[key]) {
      return true
    }
    this.visited[key] = true
    return false
  }

  getVisitedKey() {
    let { dy, dx } = this.dir
    let { y, x } = this.position
    let key = `dy:${dy},dx:${dx}|y:${y},x:${x}`
    return key
  }

  isSteppingOutOfMatrix() {
    this.markPosition() // starting position
    while (this.position) {
      if (this.checkIfVisited()) {
        return false
      }
      if (!this.nextStepInMatrix()) {
        break
      }
      if (this.getNextStepChar() === '#' || this.getNextStepChar() === 'O') {
        this.turn()
      } else {
        this.stepForward()
        this.markPosition()
      }
    }
    return true
  }

  countMarked() {
    let sum = 0
    for (let row of this.matrix) {
      for (let char of row) {
        if (char === 'X') {
          sum++
        }
      }
    }
    return sum
  }

  stepForward() {
    this.position.y += this.dir.dy
    this.position.x += this.dir.dx
  }

  getStartingPosition() {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[0].length; x++) {
        let char = this.matrix[y][x]
        if (char === '^') {
          return { y, x }
        }
      }
    }
    return null
  }

  nextStepInMatrix() {
    let { y, x } = this.position
    if (
      y + this.dir.dy < 0 ||
      y + this.dir.dy >= this.matrix.length ||
      x + this.dir.dx < 0 ||
      x + this.dir.dx >= this.matrix[0].length
    ) {
      return false
    }
    return true
  }

  getNextStepChar() {
    let { y, x } = this.position
    let { dy, dx } = this.dir
    let char = this.matrix[y + dy][x + dx]
    return char
  }

  turn() {
    let { dy, dx } = this.dir
    if (dy === -1 && dx === 0) { // up -> right
      dy = 0
      dx = 1
    } else if (dy === 0 && dx === 1) { //right -> down
      dy = 1
      dx = 0
    } else if (dy === 1 && dx === 0) { // down -> left
      dy = 0
      dx = -1
    } else if (dy === 0 && dx == -1) { // left -> up
      dy = -1
      dx = 0
    } else {
      throw Error('error in dy, dx')
    }
    this.dir = { dy, dx }
  }

}

async function main() {
  let input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
  input = await readInput('06-input.txt')


  const obj = new GuardWalking(input)
  let yLen = obj.matrix.length
  let xLen = obj.matrix[0].length


  let sum = 0
  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      const gw = new GuardWalking(input)
      let char = gw.matrix[y][x]
      if (char === '.') {
        gw.matrix[y][x] = 'O'
        let result = gw.isSteppingOutOfMatrix()
        if (!result) {
          sum++
        }
      }
    }
  }
  console.log(sum)

}
main()

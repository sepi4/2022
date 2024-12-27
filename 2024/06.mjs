import { readInput } from '../lib/js/index.mjs'

class GuardWalking {
  matrix = null
  dir = { dy: -1, dx: 0 } // up
  position = null

  constructor(input) {
    this.matrix = input.split('\n').map(row => row.split(''))
    this.position = this.getStartingPosition()
    this.walk()
  }

  markPosition() {
    this.matrix[this.position.y][this.position.x] = 'X'
  }

  walk() {
    this.markPosition() // starting position
    while (this.position) {
      if (this.getNextStepChar() === '#' && this.getNextStepChar() === 'O') {
        this.turn()
      } else {
        try {
          this.stepForward()
          this.markPosition()
        } catch (error) {
          break
        }
      }
    }
    console.log(this.countMarked())
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
    console.log(this.position)
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

  getNextStepChar() {
    // console.log(this.)
    let y = this.position.y
    let x = this.position.x
    if (
      y + this.dir.dy < 0 ||
      y + this.dir.dy >= this.matrix.length ||
      x + this.dir.dx < 0 ||
      x + this.dir.dx >= this.matrix[0].length
    ) {
      return null
    }
    let char = this.matrix[y + this.dir.dy][x + this.dir.dx]
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
  // input = await readInput('06-input.txt')
  const gw = new GuardWalking(input)

}
main()

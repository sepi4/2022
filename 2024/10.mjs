import { readInput } from '../lib/js/index.mjs'

class TopographicMap {
  matrix = null

  dirs = [
    { dy: -1, dx: 0 },
    { dy: 0, dx: 1 },
    { dy: 1, dx: 0 },
    { dy: 0, dx: -1 },
  ]

  /**
   * @param {string} input 
   */
  constructor(input) {
    this.matrix = input.split('\n').filter(r => r.length).map(r => r.split('').map(x => +x))
  }

  findStarts() {
    let zeros = []
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[0].length; x++) {
        if (this.matrix[y][x] === 0) {
          zeros.push({ y, x })
        }
      }
    }
    return zeros
  }

  /**
   * @param {{y: number, x: number}} coor 
   */
  findNextCoors(coor) {
    let { y, x } = coor
    let currentValue = this.matrix[y][x]

    let nextSteps = []
    for (let dir of this.dirs) {
      let { dy, dx } = dir
      if (!this.coorIsDefined({ y: y + dy, x: x + dx, })) {
        continue
      }
      let v = this.matrix[y + dy][x + dx]
      if (currentValue + 1 === v) {
        nextSteps.push({
          y: y + dy,
          x: x + dx,
        })
      }
    }
    return nextSteps
  }

  /**
   * @param {{y: number, x: number}} coor 
   */
  coorIsDefined(coor) {
    let { y, x } = coor
    return !(this.matrix[y] === undefined || !Number.isFinite(this.matrix[y][x]))
  }

  /**
   * @param {{y: number, x: number}} coor 
   */
  coorIsFinal(coor) {
    let { y, x } = coor
    let currentValue = this.matrix[y][x]
    if (currentValue === 9) {
      return true
    }
    return false
  }

  howManyNinesCanBeReached() {
    let starts = this.findStarts()
    let n = 0
    for (let s of starts) {
      let reached = {}
      let nextCoors = this.findNextCoors(s)
      while (nextCoors.length) {
        let coor = nextCoors.pop()
        let { y, x } = coor
        if (
          this.coorIsFinal(coor)
          && reached[`${y}:${x}`] === undefined
        ) {
          reached[`${y}:${x}`] = true
          n++
          continue
        } else {
          let newNextCoors = this.findNextCoors(coor)
          newNextCoors.forEach(c => {
            nextCoors.push(c)
          })
        }
      }
    }
    console.log('9s can be reached: ', n)
  }

  countPathsToReachNine() {
    let starts = this.findStarts()
    let n = 0
    for (let s of starts) {
      let nextCoors = this.findNextCoors(s)
      while (nextCoors.length) {
        let coor = nextCoors.pop()
        if (
          this.coorIsFinal(coor)
        ) {
          n++
          continue
        } else {
          let newNextCoors = this.findNextCoors(coor)
          newNextCoors.forEach(c => {
            nextCoors.push(c)
          })
        }
      }
    }
    console.log('Paths to reach some 9: ', n)
  }
}

async function main() {


  let input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`


  // input = `
  // ...0...
  // ...1...
  // ...2...
  // 6543456
  // 7.....7
  // 8.....8
  // 9.....9
  // `
  // input =`
  // ..90..9
  // ...1.98
  // ...2..7
  // 6543456
  // 765.987
  // 876....
  // 987....
  // `


  input = await readInput('10-input.txt')

  let tm = new TopographicMap(input)

  // part 1
  tm.howManyNinesCanBeReached()

  // part 2
  tm.countPathsToReachNine()


  // ACCENTENTALY RESOLVED PART2 BEFORE PART1 xD
}
main()
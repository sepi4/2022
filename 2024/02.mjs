import { readInput } from '../lib/js/index.mjs'

class Report {
  expectedDirection = null
  constructor(row) {
    this.row = row
  }

  isSafe() {
    if (this.row.length < 2) {
      return false
    }
    this.expectedDirection = this.#getDirection(0, 1)
    return this.#checkAll()
  }

  #getDirection(a, b) {
    if (this.row[a] < this.row[b]) {
      return 'up'
    } else {
      return 'down'
    }
  }

  #badDiff(a, b) {
    let diff = Math.abs(this.row[a] - this.row[b])
    if (diff < 1 || diff > 3) {
      return true
    }
    return false
  }

  #checkAll() {
    for (let a = 0, b = 1; b < this.row.length; a++, b++) {
      if (this.#badDiff(a, b)) {
        return false
      }
      if (this.#getDirection(a, b) !== this.expectedDirection) {
        return false
      }
    }
    return true
  }
}


async function part1() {
  const str = await readInput('02-input.txt')
//   const str = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`
  let rows = str.split('\n').map(row => row.split(' ').map(x => +x))

  let safeSums = 0
  for (let values of rows) {
    const r = new Report(values)
    if (r.isSafe()) {
      safeSums++
    }
  }
  console.log(safeSums)
}

async function part2() {
  const str = await readInput('02-input.txt')
//   const str = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`
  let rows = str.split('\n').map(row => row.split(' ').map(x => +x))

  let safeSums = 0
  for (let values of rows) {
    const r = new Report(values)
    if (r.isSafe()) {
      safeSums++
    } else {
      // try without one num, all possibilities
      for (let i = 0; i < values.length; i++) {
        const newValues = [...values]
        newValues.splice(i, 1)
        const rr = new Report(newValues)
        if (rr.isSafe()) {
          safeSums++
          break
        }
      }
    }
  }
  console.log(safeSums)

}

part1()
part2()

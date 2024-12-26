import { readInput } from '../lib/js/index.mjs'

class WordCounter {
  matrix = null
  word = null
  dirs = [
    { dy: 0, dx: 1, },
    { dy: 0, dx: -1, },

    { dy: 1, dx: 0, },
    { dy: -1, dx: 0, },

    { dy: 1, dx: 1, },
    { dy: -1, dx: 1, },

    { dy: -1, dx: -1, },
    { dy: 1, dx: -1, },
  ]

  constructor(matrix, word) {
    this.matrix = matrix
    this.word = word
  }

  reversed(w) {
    return w.split('').toReversed().join('')
  }

  calculatePart2() {
    let count = 0
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[0].length; x++) {
        const l = this.matrix[y][x]
        if (l === this.word[1]) {
          if (
            y - 1 < 0 ||
            x - 1 < 0 ||
            y + 1 >= this.matrix.length ||
            x + 1 >= this.matrix[0].length
          ) {
            continue
          }
          let foundWord1 = this.matrix[y - 1][x - 1] + this.matrix[y][x] + this.matrix[y + 1][x + 1]
          let foundWord2 = this.matrix[y - 1][x + 1] + this.matrix[y][x] + this.matrix[y + 1][x - 1]

          if (
            (foundWord1 === this.word || this.reversed(foundWord1) === this.word) &&
            (foundWord2 === this.word || this.reversed(foundWord2) === this.word)
          ) {
            count++
          }
        }
      }
    }
    return count
  }





  calculatePart1() {
    let count = 0
    // loop all letters in matrix
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[0].length; x++) {
        const l = this.matrix[y][x]
        //   if first letter of the word
        if (l === this.word[0]) {
          //     check letters into all sides if in this possition is the word
          let num = this.searchWordsInPosition(y, x)
          count += num
        }
      }
    }
    return count
  }

  searchWordsInPosition(startY, startX) {
    let matchedWordCount = 0
    for (let dir of this.dirs) {
      let foundWord = this.matrix[startY][startX]
      let y = startY
      let x = startX
      for (let i = 0; foundWord.length < this.word.length; i++) {
        y += dir.dy
        x += dir.dx
        if (this.matrix[y] === undefined || this.matrix[y][x] === undefined) {
          break
        }
        foundWord += this.matrix[y][x]
      }
      if (foundWord === this.word) {
        matchedWordCount++
      }
    }
    return matchedWordCount
  }
}

main()

async function main() {
  const input = await readInput('04-input.txt')
//   const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX` // 18

  let matrix = input.split('\n')
    .map(row => row.split(''))

  // stupidPart1(matrix, word)

  let wcPart1 = new WordCounter(matrix, 'XMAS')
  console.log(wcPart1.calculatePart1())

  let wcPart2 = new WordCounter(matrix, 'MAS')
  console.log(wcPart2.calculatePart2())
}








function stupidPart1(matrix, word) {
  let rows = []

  // right, left
  for (let y = 0; y < matrix.length; y++) {
    let row = []
    for (let x = 0; x < matrix[0].length; x++) {
      row.push(matrix[y][x])
    }
    rows.push(row)
  }

  // down, up
  for (let x = 0; x < matrix[0].length; x++) {
    let row = []
    for (let y = 0; y < matrix.length; y++) {
      row.push(matrix[y][x])
    }
    rows.push(row)
  }

  // down-right, up-left
  for (let ys = matrix.length - 1, xs = 0; ys > 0; ys--) {
    let row = []
    for (let y = ys, x = xs; y < matrix.length && x < matrix[0].length; y++, x++) {
      row.push(matrix[y][x])
    }
    rows.push(row)
  }
  for (let ys = 0, xs = 0; xs < matrix[0].length; xs++) {
    let row = []
    for (let y = ys, x = xs; y < matrix.length && x < matrix[0].length; y++, x++) {
      row.push(matrix[y][x])
    }
    rows.push(row)
  }

  // down-left, up-right
  for (let ys = matrix.length - 1, xs = matrix[0].length - 1; ys > 0; ys--) {
    let row = []
    for (let y = ys, x = xs; y < matrix.length && x >= 0; y++, x--) {
      row.push(matrix[y][x])
    }
    rows.push(row)
  }
  for (let ys = 0, xs = matrix[0].length - 1; xs >= 0; xs--) {
    let row = []
    for (let y = ys, x = xs; y < matrix.length && x >= 0; y++, x--) {
      row.push(matrix[y][x])
    }
    rows.push(row)
  }

  rows = [...rows, ...rows.map(r => r.toReversed())]
  rows = rows.filter(r => r.length >= word.length)
  rows = rows.map(r => r.join(''))

  let amount = 0
  for (let row of rows) {
    const m = row.match(new RegExp(word, 'g'))
    if (m) {
      amount += m.length
    }
  }
  console.log(amount)
}
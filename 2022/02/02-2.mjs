let input = `A Y
B X
C Z`
input = await readInput('./2022/02/input.txt')


let rows = input.split('\n').map(row => row.split(' '))
console.log(rows)


let values = {
  AX: 0 + 3, // lose
  BX: 0 + 1, // lose
  CX: 0 + 2, // lose

  AY: 3 + 1, // draw
  BY: 3 + 2, // draw
  CY: 3 + 3, // draw

  AZ: 6 + 2, // win
  BZ: 6 + 3, // win
  CZ: 6 + 1, // win
}

let sum = 0
for (let row of rows) {
  let he = row[0]
  let me = row[1]
  let key = he + me
  sum += values[key]
}
console.log(sum)

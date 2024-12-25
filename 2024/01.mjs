import { readInput } from '../lib/js/index.mjs'

async function main() {
  const str = await readInput('01-input.txt')
//   const str = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`

  let left = []
  let right = []

  let rows = str.split('\n')
    .map(row => row.split('   '))
  
  for (let row of rows) {
    left.push(+row[0])
    right.push(+row[1])
  }
  let sortedLeft = left.toSorted()
  let sortedRight = right.toSorted()

  let distances = []

  for (let i = 0; i < sortedLeft.length; i++) {
    distances.push(Math.abs(sortedLeft[i] - sortedRight[i]))
  }
  
  let sum = distances.reduce((acc, cur) => acc + cur, 0)
  console.log(sum)

  // ---- part 2 -----
  let sum2 = getSum(left, right)
  console.log(sum2)

}

function getSum(left, right) {
  let rightAppeares = new Map()
  for (let x of right) {
    if (!rightAppeares.has(x)) {
      rightAppeares.set(x, 1)
    } else {
      rightAppeares.set(x, rightAppeares.get(x) + 1)
    }
  }
  let sum = 0
  for (let num of left) {
    if (rightAppeares.has(num)) {
      sum += num * rightAppeares.get(num)
    } else {
      sum += num * 0
    }
  }
  return sum
}
main()
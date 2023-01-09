import { readInput } from "../../lib/js/index.mjs"

let input = `30373
25512
65332
33549
35390`

input = await readInput('./2022/08/input.txt')

let arr = input.split('\n').map(row => row.split('').map(x => Number(x)))

let maxIndex = [-1, -1]
let max = -1
for (let y = 0; y < arr.length; y++) {
  for (let x = 0; x < arr[0].length; x++) {
    let v = countSceneScore(arr, y, x)
    if (v > max) {
      max = v
      maxIndex = [y, x]
    }
  }
}
if (230112 === max) {
  console.log('correct')
}


/**
 * 
 * @param {number[][]} arr 
 * @param {number} y 
 * @param {number} x 
 */
function countSceneScore(arr, y, x) {
  let currentTree = arr[y][x]

  // up
  let up = 0
  for (let i = y - 1; i >= 0; i--) {
    up++
    if (arr[i][x] >= currentTree) {
      break
    }
  }

  // down
  let down = 0
  for (let i = y + 1; i < arr.length; i++) {
    down++
    if (arr[i][x] >= currentTree) {
      break
    }
  }

  // right
  let right = 0
  for (let i = x + 1; i < arr[0].length; i++) {
    right++
    if (arr[y][i] >= currentTree) {
      break
    }
  }

  // left
  let left = 0
  for (let i = x - 1; i >= 0; i--) {
    left++
    if (arr[y][i] >= currentTree) {
      break
    }
  }
   
  return up * down * left * right
}


import { readInput } from "../../lib/js/index.mjs"

let input = `30373
25512
65332
33549
35390`
input = `3037330373
2551225512
6533265332
3354933549
3539035390
3037330373
2551225512
6533265332
3354933549
3539035390`
input = await readInput('./2022/08/input.txt')

/*
  2222222222

2 3037330373     x..x......
2 2551225512     xx........
1 6533265332     x.........
3 3354933549     x.x.x.....
3 3539035390     xx.x......
2 3037330373     x..x......
2 2551225512     xx........
1 6533265332     x.........
3 3354933549     x.x.x.....
3 3539035390     xx.x......
                 

*/


let arr = input.split('\n').map(row => row.split('').map(x => Number(x)))
let marked = arr.map(r => r.map(x => false))
console.log('arr len:', arr.length)
console.log('marked len:', marked.length)
// console.log(arr.length)
// console.log(arr[0].length)
// console.log(marked.length)
// console.log(marked[0].length)
// console.log(marked[0])
countVisibleTreesFromEdges(arr)
print(marked)
// let n = 0
// for (let row of marked) {
//   for (let x of row) {
//     if (x) {
//       n++
//     }
//   }
// }
// console.log(n)


/**
 * 
 * @param {number[][]} arr 
 */
function countVisibleTreesFromEdges(arr) {
  // let sum = down(arr) + left(arr) + up(arr) + right(arr)
  let d = down(arr)
  let r = right(arr)
  let l = left(arr)
  let u = up(arr)
  let sum = d + r + l + u
  console.log(sum)
}

function mark(arr, marked, max, n, y, x) {
  if (max === undefined || arr[y][x] > max) {
    max = arr[y][x]
    if (!marked[y][x]) {
      n++
    }
    marked[y][x] = true
  }
  return [arr, marked, max, n, y, x]
}

/**
 * 
 * @param {number[][]} arr 
 */
function left(arr) {
  let n = 0
  for (let y = 0; y < arr.length; y++) {
    let max
    for (let x = arr[0].length - 1; x >= 0; x--) {
      [arr, marked, max, n, y, x] = mark(arr, marked, max, n, y, x)
    }
  }
  return n
}

/**
 * 
 * @param {number[][]} arr 
 */
function right(arr) {
  let n = 0
  for (let y = 0; y < arr.length; y++) {
    let max
    for (let x = 0; x < arr[0].length; x++) {
      [arr, marked, max, n, y, x] = mark(arr, marked, max, n, y, x)
    }
  }
  return n
}

/**
 * 
 * @param {number[][]} arr 
 */
function up(arr) {
  let n = 0
  for (let x = 0; x < arr[0].length; x++) {
    let max
    for (let y = arr.length - 1; y >= 0; y--) {
      [arr, marked, max, n, y, x] = mark(arr, marked, max, n, y, x)
    }
  }
  return n
}

/**
 * 
 * @param {number[][]} arr 
 */
function down(arr) {
  let n = 0
  for (let x = 0; x < arr[0].length; x++) {
    let max
    for (let y = 0; y < arr.length; y++) {
      [arr, marked, max, n, y, x] = mark(arr, marked, max, n, y, x)
    }
  }
  return n
}



function print(arr) {
  for (let row of arr) {
    let rowStr = ''
    for (let c of row) {
      rowStr += c ? 'x' : '.'
    }
    console.log(rowStr)
  }
}
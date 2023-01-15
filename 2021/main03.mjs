import { readInput } from "../lib/js/index.mjs"
let data = await readInput('./2021/main03-input.txt')

data = data.split('\n')

// const len = data[0].length

// const arr = []
// for (let i = 0; i < len; i++) {
//   arr.push([0, 0])
// }

// // console.log(JSON.stringify(arr))
// for (const x of data) {
//   for (let i = 0; i < len; i++) {
//     if (x[i] === '1') {
//       arr[i][0]++
//     } else {
//       arr[i][1]++
//     }
//   }
// }

// // console.log(JSON.stringify(arr))

// let gamma = ''
// let epsilon = ''
// for (let i = 0; i < len; i++) {
//   if (arr[i][0] > arr[i][1]) {
//     gamma += '1'
//     epsilon += '0'
//   } else {
//     gamma += '0'
//     epsilon += '1'
//   }
// }

// console.log(gamma, parseInt(gamma, 2))
// console.log(epsilon, parseInt(epsilon, 2))

let data1 = data.map((x) => x)
let data2 = data.map((x) => x)

function count(arr, index, mostCommon) {
  let ones = 0
  let zeros = 0
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i][index]
    if (element === '1') {
      ones++
    } else {
      zeros++
    }
  }

  if (mostCommon) {
    if (zeros > ones) {
      return '0'
    }
    return '1'
  }

  if (ones < zeros) {
    return '1'
  }
  return '0'
}

function run(array, mostCommon) {
  const len = array[0].length
  for (let i = 0; i < len && array.length > 1; i++) {
    const v = count(array, i, mostCommon)
    array = array.filter((x) => x[i] === v)
    // console.log(JSON.stringify(array, undefined, 2))
  }

  console.log(JSON.stringify(array, undefined, 2))
  return parseInt(array[0], 2)
}
let test = `100100100100
100011010010
001110001111
000101101110
111000101100
111001110000`.split('\n')

// console.log(run(test, false))

const a = run(data1, true)
const b = run(data2, false)

console.log(a * b)

import { readInput } from '../lib/js/index.mjs'
import fs from 'fs/promises'

async function main() {
  let input = '2333133121414131402'
  input = await readInput('09-input.txt')

  let arr = []
  for (let i = 0; i < input.length; i++) {
    let x = Number(input[i])
    if (i % 2 === 0) {
      // file
      let id = i / 2
      for (let j = 0; j < x; j++) {
        arr.push(id + '')
      }
    } else {
      // free space
      for (let j = 0; j < x; j++) {
        arr.push('.')
      }
    }
  }

  // // PART1
  // for (let a = 0, b = arr.length - 1; a < b;) {
  //   if (arr[a] === '.' && arr[b] !== '.') {
  //     let tmp = arr[a]
  //     arr[a] = arr[b]
  //     arr[b] = tmp
  //   }
  //   // incrementing
  //   if (arr[a] !== '.') {
  //     a++
  //   }
  //   if (arr[b] === '.') {
  //     b--
  //   }
  // }


  // PART 2
  function swapper(ai, bi, n, arr) {
    while (n--) {
      let tmp = arr[ai]
      arr[ai] = arr[bi]
      arr[bi] = tmp

      ai++
      bi++
    }
  }

  let arrA = []
  let arrB = []
  for (
    let a = 0, b = arr.length - 1;
    b >= 0;
  ) {
    // new element found
    if (arrB.length && arrB[0] !== arr[b]) {

      // find free space
      if (arrA.length === arrB.length) {
        // swap
        swapper(
          a - arrA.length,
          b + 1,
          arrB.length,
          arr,
        )

        arrB = []
        arrA = []
        a = 0 // KISSA PASKOO!!!

      } else if (a > b) {
        // no free space found for current element -> more to next element
        arrB = []
        arrA = []
        a = 0
      } else if (arr[a] !== '.') {
        arrA = []
        a++
      } else if (arr[a] === '.') {
        arrA.push(arr[a])
        a++
      } else {
        a++
      }
    } else {
      if (arr[b] !== '.') {
        arrB.push(arr[b])
      }
      b--
    }
  }

  // console.log('write')
  // await fs.writeFile('./output.txt', arr.join('|'))

  // checksum
  let checksum = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '.') {
      continue
    }
    checksum += arr[i] * i
  }
  console.log(checksum)

}


main()
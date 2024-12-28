import { readInput } from '../lib/js/index.mjs'

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
  // console.log(arr)

  // part1
  for (let a = 0, b = arr.length - 1; a < b;) {
    if (arr[a] === '.' && arr[b] !== '.') {
      let tmp = arr[a]
      arr[a] = arr[b]
      arr[b] = tmp
    }
    // incrementing
    if (arr[a] !== '.') {
      a++
    }
    if (arr[b] === '.') {
      b--
    }
  }


  // console.log(arr.join(''))

  // checksum
  let checksum = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '.') {
      break
    }
    checksum += arr[i] * i
  }
  console.log(checksum)

}


main()

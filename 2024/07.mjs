import { readInput } from '../lib/js/index.mjs'

async function main() {
  let input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
  input = await readInput('07-input.txt')

  let rows = input.split('\n')
    .map(row => row.split(':'))
    .map(([result, values]) => {
      return {
        result: +result,
        values: values.trim().split(' ').map(x => +x)
      }
    })

  let arr = []
  for (let row of rows) {
    let { result, values } = row
    let possibleOps = getPossibleOperations(values.length - 1)
    for (let ops of possibleOps ) {
      if (result === calculate(values, ops)) {
        arr.push(result)
        break
      }
    }
  }
  console.log(arr)
  console.log(arr.reduce((acc, cur) => acc + cur, 0))
}

main()

function calculate(values, ops) {
  let result = values[0]
  for (let i = 1; i < values.length; i++) {
    let op = ops[i - 1]
    if (op === '*') {
      result *= values[i]
    } else if (op === '+') {
      result += values[i]
    } else {
      throw Error('error in operation')
    }
  }
  return result
}

function getPossibleOperations(len) {
  let ops = ['*', '+']
  let allOps = []
  for (let i = 0; i < len; i++) {
    if (allOps.length === 0) {
      for (let op of ops) {
        allOps.push(op)
      }
    } else {
      let newAllOps = []
      for (let item of allOps) {
        for (let op of ops) {
          newAllOps.push(item + op)
        }
      }
      allOps = newAllOps
    }
  }
  return allOps
}

// function calculateAll(nums) {
//   // ops = ['*', '+']
//   if (nums.length === 1) {
//     return nums[0]
//   }

//   const [head, tail] = nums
//   head * 
// }
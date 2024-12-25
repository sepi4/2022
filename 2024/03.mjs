
import { readInput } from '../lib/js/index.mjs'

// part1()
part2()

async function part1() {
  const input = await readInput('03-input.txt')
  // const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
  const regexMul = /mul\((\d{1,3}),(\d{1,3})\)/g
  const muls = input.match(regexMul)
  let sum = 0
  for (let mul of muls) {
    const m = mul.match(/mul\((\d{1,3}),(\d{1,3})\)/)
    const num1 = +m[1]
    const num2 = +m[2]
    sum += num1 * num2
  }
  console.log(sum)
}

async function part2() {
  const input = await readInput('03-input.txt')
  // const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
  const regexMul = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g
  const instructions = input.match(regexMul)
  let calculate = true
  let sum = 0
  for (let item of instructions) {
    switch (item) {
      case 'do()':
        calculate = true
        break;
      case "don't()":
        calculate = false
        break;
      default:
        if (calculate) {
          const m = item.match(/mul\((\d{1,3}),(\d{1,3})\)/)
          const num1 = +m[1]
          const num2 = +m[2]
          sum += num1 * num2
        }
        break;
    }
  }
  console.log(sum)
}
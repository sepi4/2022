import { readInput } from '../lib/js/index.mjs'

// Za + Ub - R = 0
// Wa + Hb - K = 0

// a  = (HR -UK) / (HZ -UW)
// b  = (-Wa + K) / H
async function main() {
  let input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

  input = await readInput('13-input.txt')

  let nums = getNums(input)
  let sum = 0
  for (let v of nums) {
    // console.log(v)
    let a = calcA(v)
    if (!Number.isInteger(a) || a < 0) {
      continue
    }
    let b = calcB(v, a)
    if (!Number.isInteger(b) || b < 0) {
      continue
    }
    sum += a * 3 + b
    // console.log('a:', a)
    // console.log('b:', b)
  }
  console.log(sum)


}

function calcA(values) {
  let { Z, U, W, H, R, K } = values
  let a = (H * R - U * K) / (H * Z - U * W)
  return a
}
function calcB(values, a) {
  let { Z, U, W, H, R, K } = values
  let b = (-W * a + K) / H
  return b
}


function getNums(input) {
  let reg = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g
  let matches = input.matchAll(reg)
  let nums = []
  for (let m of matches) {
    nums.push({
      Z: +m[1],
      W: +m[2],
      U: +m[3],
      H: +m[4],
      R: +m[5],
      K: +m[6],
    })
  }
  return nums
}


main()
import { readInput } from "../../lib"

export {}
async function main() {
  
  let input: string = await readInput('./2022/10/input.txt')
  // let input: string = getExampleInput()
  type Addx = {
    action: 'addx',
    value: number,
  }
  type Noop = {
    action: 'noop',
  }
  let arr: (Addx | Noop)[] = input
    .split('\n')
    .map((row: string) => {
      let temp = row.split(' ')
      if (temp[0] === 'noop') {
        return {
          action: 'noop'
        }
      } else {
        return {
          action: 'addx',
          value: Number(temp[1])
        }
      }
    })
  
  let X = 1
  let cycle = 1
  let sums: number[] = []
  let answer = ''
  
  for (let com of arr) {
    if (com.action === 'noop') {
      check(com)
      cycle++
    } else {
      check(com)
      cycle++
      check(com)
      cycle++
      X += com.value
    }
  }
  
  console.log(sums)
  console.log(sums.reduce((a, b) => a + b, 0))
  console.log(answer)
  
  
  
  function check(com: any) {
    if ((cycle - 1) % 40 === 0) {
      answer += '\n'
    }
    let temp = cycle % 40
    if (temp === X || temp === X+1 || temp === X+2) {
      answer += '#'
    } else {
      answer += '.'
    }
    if (
      cycle === 20 ||
      cycle === 60 ||
      cycle === 100 ||
      cycle === 140 ||
      cycle === 180 ||
      cycle === 220
    ) {
      sums.push(cycle * X)
    }
  }
}
main()

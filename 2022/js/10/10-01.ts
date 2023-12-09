import { readInput } from "../../lib"

export {}
async function main() {
  let input: string = await readInput('./2022/10/input.txt')
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
  
  
  
  function check(com: any) {
    console.log(X, cycle, com)
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

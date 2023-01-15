import { readInput } from "../../lib/js/index.mjs"

let input = await readInput('./2022/11/input.txt')

let mArr = input.split(/\n\n/)

let monkeys = {}
for (let m of mArr) {
  let monkey = {}
  let indexMatch = m.match(/Monkey (\d+):\n/)
  monkey.index = indexMatch[1]
  let itemsMatch = m.match(/Starting items: (.+)\n/)
  monkey.items = itemsMatch[1].split(', ').map(x => Number(x))
  let opMatch = m.match(/Operation: new = (.+)\n/)
  // console.log(opMatch[1])
  monkey.op = function (old) {
    if (opMatch[1] === 'old * old') {
      return Math.floor(old * old / 3)
    } else if (opMatch[1] === 'old + old') {
      return Math.floor((old + old) / 3)
    } else {
      let s = opMatch[1].substring(4, 5)
      let d = opMatch[1].substring(6)
      if (s === '+') {
        return Math.floor((old + Number(d)) / 3)
      } else {
        return Math.floor(old * Number(d) / 3)
      }
    }
  }

  let divMatch = m.match(/Test: divisible by (\d+)/)
  monkey.div = Number(divMatch[1])
  monkey.test = function (num) {
    monkey.inspected++
    let trueMatch = m.match(/If true: throw to monkey (\d+)/)
    let falseMatch = m.match(/If false: throw to monkey (\d+)/)
    if (num % monkey.div === 0) {
      monkeys[trueMatch[1]].items.push(num)
    } else {
      monkeys[falseMatch[1]].items.push(num)
    }
  }
  monkeys[monkey.index] = monkey
  monkey.inspected = 0
}

// console.log(mArr)
// console.log(mArr.length)
// console.log(monkeys)


let round = 20
while (round--) {
  for (let [k, m] of Object.entries(monkeys)) {
    m.items = m.items.reverse()
    let i = 0
    while (m.items.length) {
      let v = m.items.pop()
      // console.log(v)
      v = m.op(v)
      m.test(v)
    }
    // console.log('---')
    i++
  }
}
for (let [k, m] of Object.entries(monkeys)) {
  for (let v of m.items) {
    // console.log(v)
  }
  // console.log('---')
}

let ordered = Object.entries(monkeys).sort((a, b) => b[1].inspected - a[1].inspected)
console.log(ordered)

console.log(ordered[0][1].inspected * ordered[1][1].inspected)



function getExampleInput() {
  return `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`
}
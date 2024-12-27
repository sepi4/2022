import { readInput } from '../lib/js/index.mjs'


async function main() {
  //   let input = `47|53
  // 97|13
  // 97|61
  // 97|47
  // 75|29
  // 61|13
  // 75|53
  // 29|13
  // 97|29
  // 53|29
  // 61|53
  // 97|53
  // 61|29
  // 47|13
  // 75|47
  // 97|75
  // 47|61
  // 75|61
  // 47|29
  // 75|13
  // 53|13

  // 75,47,61,53,29
  // 97,61,53,29,13
  // 75,29,13
  // 75,97,47,61,53
  // 61,13,29
  // 97,13,75,29,47`

  let input = await readInput('05-input.txt')

  let [rulesStr, numsStr] = input.split('\n\n')
  let rules = rulesStr.split('\n').map(r => r.split('|').map(x => +x))
  let rows = numsStr.split('\n').map(x => x.split(',').map(v => +v))

  let incorrects = new Map()
  for (let row of rows) {
    let map = new Map()
    for (let i = 0; i < row.length; i++) {
      map.set(row[i], i)
    }

    let swapped = true
    while (swapped) {
      swapped = false
      for (let rule of rules) {
        let [a, b] = rule
        if (map.has(a) && map.has(b)) {
          let ai = map.get(a)
          let bi = map.get(b)
          if (ai > bi) {
            incorrects.set(row, row)
            map.set(b, ai)
            map.set(a, bi)
            swapped = true
          }
        }
      }
    }
    // new order
    for (let [k, v] of map.entries()) {
      row[v] = k
    }
  }

  let sumOfCorrectMiddleNumbers = 0
  let corrects = rows
    .filter(r => !incorrects.has(r))
  for (let row of corrects) {
    let i = Math.floor(row.length / 2)
    sumOfCorrectMiddleNumbers += row[i]
  }
  console.log(sumOfCorrectMiddleNumbers)

  let sumOfIncorrectMiddleNumbers = 0
  for (let row of incorrects.values()) {
    let i = Math.floor(row.length / 2)
    sumOfIncorrectMiddleNumbers += row[i]
  }
  console.log(sumOfIncorrectMiddleNumbers)

}
main()
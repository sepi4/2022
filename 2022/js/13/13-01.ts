import { readInput } from "../../lib"

export { }
type V = number | any[] | undefined
async function main() {
  let input = await readInput('./2022/13/input.txt')
  // let input = getExampleInput()
  let pairs = input.split('\n\n').map(pair => pair.split('\n').map(x => JSON.parse(x))) as [V, V][]
  let indexes: number[] = []
  for (let i = 0; i < pairs.length; i++) {
    let a = pairs[i][0]
    let b = pairs[i][1]

    if (compare(a, b)) {
      indexes.push(i + 1)
    }
  }
  let sum = indexes.reduce((a, b) => a + b, 0)
  console.log(sum)
}
main()

function compare(a: V, b: V): boolean | undefined {
  if (typeof a === 'undefined' && typeof b !== 'undefined') {
    return true
  } else if (typeof b === 'undefined' && typeof a !== 'undefined') {
    return false
  } else if (typeof a === 'number' && typeof b === 'number') {
    if (a < b) {
      return true
    } else if (a > b) {
      return false
    }
  } else if (Array.isArray(a) && Array.isArray(b)) {
    let L = Math.max(a.length, b.length)
    for (let i = 0; i < L; i++) {
      let r = compare(a[i], b[i])
      if (r !== undefined) {
        return r
      }
    }
  } else if (typeof a === 'number' && Array.isArray(b)) {
      return compare([a], b)
  } else if (typeof b === 'number' && Array.isArray(a)) {
      return compare(a, [b])
  }
}

function getExampleInput() {
  return `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`
}
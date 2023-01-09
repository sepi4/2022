import { readInput } from "../../lib/js/index.mjs"

// let input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`
// let input = `bvwbjplbgvbhsrlpgdmjqwftvncz`
// let input = `nppdvjthqldpwncqszvftbrmjlhg`
// let input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`
// let input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`
let input = await readInput('./2022/06/input.txt')


console.log(new Set(['a', 'b', 'a']))

for (let i = 3; i < input.length; i++) {
  let sub = input.substring(i - 3, i + 1)
  sub = sub.split('')
  let set = new Set(sub)
  if (set.size === sub.length) {
    console.log(i + 1, sub)
    break
  }
}

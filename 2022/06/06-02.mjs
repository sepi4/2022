import { readInput } from "../../lib/js/index.mjs"

// let inputs = [`mjqjpqmgbljsphdztnvjfqwrcgsmlb`]
// inputs.push(`bvwbjplbgvbhsrlpgdmjqwftvncz`)
// inputs.push(`nppdvjthqldpwncqszvftbrmjlhg`)
// inputs.push(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)
// inputs.push(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)

let input = await readInput('./2022/06/input.txt')

let inputs = [input]


for (let input of inputs) {
  for (let i = 13; i < input.length; i++) {
    let sub = input.substring(i - 13, i + 1)
    sub = sub.split('')
    let set = new Set(sub)
    if (set.size === sub.length) {
      console.log(i + 1, sub)
      break
    }
  }
}


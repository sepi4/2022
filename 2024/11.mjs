import { readInput } from '../lib/js/index.mjs'

class Stones {
  stones = new Map()

  /**
   * @param {string} input 
   */
  constructor(input) {
    let arr = input.split(' ')
    for (let e of arr) {
      if (this.stones.has(e)) {
        let n = this.stones.get(e)
        this.stones.set(e, n + 1)
      } else {
        this.stones.set(e, 1)
      }
    }
  }

  blink() {
    let map = new Map()
    for (let [key, n] of this.stones) {
      if (key === '0') {
        // all 0 -> 1
        this.addStones(map, '1', n)
      } else if (key.length > 0 && key.length % 2 === 0) {
        let index = key.length / 2
        let a = key.substring(0, index)
        let b = key.substring(index)
        a = `${+a}`
        b = `${+b}`

        this.addStones(map, a, n)
        this.addStones(map, b, n)

      } else {
        let x = `${+key * 2024}`
        this.addStones(map, x, n)
      }
    }
    this.stones = map
  }

  addStones(map, key, amount) {
    if (map.has(key)) {
      let n = map.get(key)
      map.set(key, n + amount)
    } else {
      map.set(key, amount)
    }
  }
}

/**
 * Idea in part 2 is that amount of values in array would get super big and it would take too long to calclulate this
 * And there is no possiblity to store them any where in array for example, because it amout is going over the limit
 * of what array can handle. 
 * But values in our calculation are not unique and they do no depend on one on other. So be can calculate unique
 * values and store amount of them in object/Map.
 */
async function main() {
  let input = '125 17'

  input = await readInput('11-input.txt')

  let obj = new Stones(input)
  let amount = 75;
  for (let i = 0; i < amount; i++) {
    obj.blink()
    // console.log(obj.stones)
  }
  let sum = 0
  for (let v of obj.stones.values()) {
    sum += v
  }
  console.log(sum)


}

main()
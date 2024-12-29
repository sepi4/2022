import { readInput } from '../lib/js/index.mjs'

class Stones {

  stones = []

  /**
   * @param {string} input 
   */
  constructor(input) {
    this.stones = input.split(' ')
  }

  blink() {
    let ss = []
    for (let s of this.stones) {
      if (s === '0') {
        ss.push('1')
      } else if (s.length > 0 && s.length % 2 === 0) {
        let index = s.length / 2
        let a = s.substring(0, index)
        let b = s.substring(index)

        ss.push(`${+a}`)
        ss.push(`${+b}`)
      } else {
        ss.push(`${+s * 2024}`)
      }
    }
    this.stones = ss
  }
}

async function main() {
  let input = '125 17'

  input = await readInput('11-input.txt')
  let obj = new Stones(input)
  console.log(obj.stones)

  let amount = 25;
  for (let i = 0; i < amount; i++) {
    obj.blink()
    // console.log(obj.stones.join())
  }
  // console.log('max num:', Math.max(obj.stones))
  // let ff = obj.stones.filter(s => isNaN(s))
  // console.log(ff)
  console.log(obj.stones.length)
  
}

main()
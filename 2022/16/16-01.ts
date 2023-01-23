import { readInput } from "../../lib"

export { }

class Tunnel {
  public name: string
  public rate: number
  public arr: string[]
  public isOpen: boolean = false
  public notUsed: boolean = true

  public leadsTo: Tunnel[] = []

  public flow: number = 0
  public fromStack: Tunnel[] = []

  constructor(name: string, rate: number, arr: string[]) {
    this.name = name
    this.rate = rate
    this.arr = arr
  }

  public initLeadsTo(tunnels: Map<string, Tunnel>) {
    for (let tunnelName of this.arr) {
      let t = tunnels.get(tunnelName)
      if (t) {
        this.leadsTo.push(t)
      }
    }
  }
}

function parseInput(row: string) {
  const reg = /Valve ([A-Z]{2}) has flow rate=(\d+?); tunnels? leads? to valves? (.+?)(\n|$)/
  const matches = row.match(reg)
  if (matches && matches[1] && matches[2] && matches[3]) {
    const name = matches[1]
    const rate = Number(matches[2])
    const tunnelsStr = matches[3]
    const leadTo = tunnelsStr.split(', ')
    return {
      name,
      rate,
      arr: leadTo,
    }
  }
  throw new Error("Error in row");
}

function getExampleInput() {
  return `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`
}

function calc(
  tunnels: Map<string, Tunnel>,
  currentName: string,
  timeLeft: number,
  sum: number,
) {
  if (timeLeft === 0) {
    return sum
  }

  let current = tunnels.get(currentName)!
  let arr = current.leadsTo
  let sums: number[] = []

  if (!current.isOpen && current.rate > 0) {
    current.isOpen = true
    sums.push(calc(
      tunnels,
      current.name,
      timeLeft - 1,
      sum,
    ))
  } else if (current.notUsed) {
    // console.log(currentName, timeLeft, sum)
    sum += timeLeft * current.rate
    current.notUsed = false
    console.log(currentName, timeLeft, sum)

  }
  for (let t of arr) {
    sums.push(calc(
      tunnels,
      t.name,
      timeLeft - 1,
      sum,
    ))
  }
  return Math.max(...sums)
}

async function main() {
  // let input = await readInput('./2022/16/input.txt')
  let input = getExampleInput()
  let rows = input.split('\n')
  let arr = rows.map(r => parseInput(r))
  let tunnels: Map<string, Tunnel> = new Map()
  for (let a of arr) {
    const t = new Tunnel(a.name, a.rate, a.arr)
    tunnels.set(a.name, t);
  }
  for (let t of tunnels.values()) {
    t.initLeadsTo(tunnels)
  }
  let time = 5;
  let sum = 0;
  let current = tunnels.get('AA')!
  console.log(current)

  // let result = calc(
  //   tunnels,
  //   current.name,
  //   time,
  //   sum
  // )
  // console.log('result:', result)

  let stack: Tunnel[] = []
  stack.push(current)
  for (let timeLeft = 30; timeLeft > 0; timeLeft--) {
    while (stack.length) {
      let c = stack.pop()!
    }
  }


}
main()



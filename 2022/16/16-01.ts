import { readInput } from "../../lib"

export { }

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

type Tunnels = {
  [key: string]: Tunnel
}

class Tunnel {
  public name: string
  public rate: number
  public arr: string[]
  public isOpen: boolean = false

  public leadsTo: Tunnel[] = []


  constructor(name: string, rate: number, arr: string[]) {
    this.name = name
    this.rate = rate
    this.arr = arr
  }

  public initLeadsTo(tunnels: Tunnels) {
    for (let tunnelName of this.arr) {
      let t = tunnels[tunnelName];
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

type OpenEdges = {
  [key: string]: number,
};

function goIn(
  name: string,
  tunnels: Tunnels,
  timeLeft: number,
  openEdges: OpenEdges,
): OpenEdges | undefined {
  if (timeLeft === 0) {
    // console.log(openEdges, timeLeft, name);
    return openEdges;
  }
  // console.log(name, timeLeft, openEdges);
  let current = tunnels[name];

  let sums = [];
  if (!openEdges[current.name] && current.rate > 0) {
     goIn(
      current.name,
      tunnels,
      timeLeft - 1,
      { ...openEdges, [current.name]: timeLeft - 1 }
    );
  } else {
    for (let t of current.leadsTo) {
      goIn(
        t.name,
        tunnels,
        timeLeft - 1,
        { ...openEdges }
      );
    }
  }
}

async function main() {
  // INIT ==================

  // let input = await readInput('./2022/16/input.txt')
  let input = getExampleInput()
  let rows = input.split('\n')
  let arr = rows.map(r => parseInput(r))
  let tunnels: Tunnels = {};
  for (let a of arr) {
    const t = new Tunnel(a.name, a.rate, a.arr)
    tunnels[a.name] = t;
  }
  for (let t of Object.values(tunnels)) {
    t.initLeadsTo(tunnels);
  }

  // MAIN ==================
  // console.log(tunnels);
  goIn('AA', tunnels, 25, {});

}

main()
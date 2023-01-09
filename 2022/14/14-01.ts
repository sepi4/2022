import { readInput } from "../../lib"

let sands: Record<string, boolean> = {}
let rocks: Record<string, boolean> = {}
let edgeValues: EdgesValues;
type SandPosition = { y: number, x: number }
type EdgesValues = {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}

async function main() {
  let input = await readInput('./2022/14/input.txt')
  // let input = getExampleInput()
  let arr = toArr(input)
  edgeValues = getEdgeValues(arr)
  rocks = getRocks(arr)
  // print(arr)
  let startPosition = { y: 0, x: 500 }

  let s = getSandPosition(startPosition)
  while (s !== null) {
    sands[s.x + ',' + s.y] = true
    s = getSandPosition(startPosition)
  }
  console.log(s)
  console.log(Object.values(sands).length)
}
main()

function getSandPosition( current: SandPosition,): SandPosition | null {
  if (current.y > edgeValues.yMax) {
    return null // over
  }
  let nextY = current.y + 1

  let nextX = current.x
  if (notBlocked(nextX, nextY)) {
    return getSandPosition({y: nextY, x: nextX})
  }
  nextX = current.x - 1
  if (notBlocked(nextX, nextY)) {
    return getSandPosition({y: nextY, x: nextX})
  }
  nextX = current.x + 1
  if (notBlocked(nextX, nextY)) {
    return getSandPosition({y: nextY, x: nextX})
  }
  return current
}

function notBlocked(x: number, y: number) {
  return !rocks[x + ',' + y] && !sands[x + ',' + y]
}

function toArr(str: string): number[][][] {
  const arr = str.split('\n').map(
    row => row.split(' -> ').map(
      x => x.split(',').map(v => Number(v))
    )
  )
  return arr
}

function getEdgeValues(arr: number[][][]): EdgesValues {
  let xMax = -Infinity
  let xMin = Infinity
  let yMax = -Infinity
  let yMin = Infinity
  for (let row of arr) {
    for (let v of row) {
      let x = v[0]
      let y = v[1]
      if (y < yMin) {
        yMin = y
      }
      if (y > yMax) {
        yMax = y
      }
      if (x < xMin) {
        xMin = x
      }
      if (x > xMax) {
        xMax = x
      }
    }
  }
  return { xMax, xMin, yMax, yMin, }
}

function getRocks(arr: number[][][]) {
  let coords: Record<string, boolean> = {}
  for (let rockSlice of arr) {
    for (let i = 0; i < rockSlice.length - 1; i++) {
      let a = rockSlice[i]
      let b = rockSlice[i + 1]
      let dy: number = 0
      let dx: number = 0
      let start: number
      let end: number
      let [xa, ya] = a
      let [xb, yb] = b

      if (xa !== xb) {
        start = xa
        end = xb
        if (xa < xb) {
          dx = 1
        } else {
          dx = -1
        }

      } else {
        start = ya
        end = yb
        if (ya < yb) {
          dy = 1
        } else {
          dy = -1
        }
      }
      let x = xa
      let y = ya
      do {
        coords[`${x},${y}`] = true
        x += dx
        y += dy
      } while (x !== xb || y !== yb)
      coords[`${x},${y}`] = true
    }
  }
  return coords
}

function print(arr: number[][][]) {
  const coords = getRocks(arr)
  let str = ''
  for (let y = 0; y < edgeValues.yMax + 3; y++) {
    let row = ''
    for (let x = edgeValues.xMin - 1; x <= edgeValues.xMax + 1; x++) {
      if (y === 0 && x === 500) {
        row += '+'
      } else if (coords[`${x},${y}`]) {
        row += '#'
      } else {
        row += '.'
      }
    }
    str += row + '\n'
  }
  console.log(str)

}

function getExampleInput() {
  return `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`
}

export { }

import { readInput } from "../../lib"

export { }

type MinMax = [number, number]
type Pair = {
  sensor: { x: number, y: number }
  beacon: { x: number, y: number }
  dist: number
  maxMin?: MinMax
}

async function main() {
  // --------- PARSING
  // let input = getExampleInput();
  let input = await readInput('./2022/15/input.txt')
  let arr = parseInput(input)
  let sensorsBeacons: Pair[] = getSensorsBeacons(arr)

  // --------- BOUNDARIES
  const minY = 0
  // const maxY = 20
  const maxY = 4_000_000
  const minX = 0
  // const maxX = 20
  const maxX = 4_000_000


  let searchingX = -1
  let searchingY = -1

  // MAIN LOOP FOR EVERY Y -------------
  for (let y = minY; y <= maxY; y++) {
    addMinMaxForCurrentY(y, sensorsBeacons)
    let minMaxs = sensorsBeacons
      .map(v => v.maxMin)
      .filter(v => v !== undefined) as MinMax[]

    let combinedMinMaxs = combineIfCrossing(minMaxs)
    // can be only one point
    if (combinedMinMaxs.length > 1) {
      console.log(y, ':', combinedMinMaxs)
      searchingY = y
      if (combinedMinMaxs[0][1] < combinedMinMaxs[1][0]) {
        searchingX = combinedMinMaxs[0][1] + 1
      } else {
        searchingX = combinedMinMaxs[1][1] + 1
      }
    }
  }
  console.log(searchingX, searchingY)
  console.log('answer:', searchingX * maxX + searchingY)

}
main()

function combineIfCrossing(aa: MinMax[]) {
  let arr = [...aa]
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (isCrossing(arr[i], arr[j]) || sideBySide(arr[i], arr[j])) {
        arr[i] = combine(arr[i], arr[j])
        arr.splice(j, 1)
        i--
        break
      }
    }
  }
  return arr
}

function sideBySide(a: MinMax, b: MinMax) {
  return Math.abs(a[1] - b[0]) === 1 || Math.abs(a[0] - b[1]) === 1
}

function isCrossing(a: MinMax, b: MinMax) {
  return a[0] <= b[0] && b[0] <= a[1] ||
    b[0] <= a[0] && a[0] <= b[1]
}

function combine(a: MinMax, b: MinMax) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])] as MinMax
}

/**
 * calculate min and max ( edge points for current Y row)
 * @param rowY 
 * @param sensorsBeacons 
 */
function addMinMaxForCurrentY(rowY: number, sensorsBeacons: Pair[]) {
  for (let s of sensorsBeacons) {
    let a = s.dist - Math.abs(rowY - s.sensor.y)
    if (a >= 0) {
      s.maxMin = [s.sensor.x - a, s.sensor.x + a]
    } else {
      s.maxMin = undefined
    }
  }
}

function getDist(x: number, y: number, x2: number, y2: number) {
  return Math.abs(x - x2) + Math.abs(y - y2)
}

function parseInput(input: string) {
  let arr = input.split('\n')
    .map(row => row.replace(/Sensor at | closest beacon is at /g, ''))
    .map(row => row.split(':')
      .map(pair => pair.split(', ')
        .map(v => Number(v.substring(2)))
      )
    )
  return arr
}

function getSensorsBeacons(arr: number[][][]) {
  let sensorsBeacons: Pair[] = []
  for (let row of arr) {
    sensorsBeacons.push({
      sensor: {
        x: row[0][0],
        y: row[0][1],
      },
      beacon: {
        x: row[1][0],
        y: row[1][1],
      },
      dist: getDist(row[0][0], row[0][1], row[1][0], row[1][1]),
    })
  }
  return sensorsBeacons
}

function getExampleInput() {
  return `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`
}
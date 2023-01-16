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
  // let input = getExampleInput();
  let input = await readInput('./2022/15/input.txt')
  let arr = parseInput(input)
  let sensorsBeacons: Pair[] = getSensorsBeacons(arr)
  let allBeacons: { [key: string]:  { x: number, y: number } } = {}
  let allSensors: { [key: string]:  { x: number, y: number } } = {}
  for (let cur of sensorsBeacons) {
    allBeacons[cur.beacon.x + ':' + cur.beacon.y] = cur.beacon
    allSensors[cur.sensor.x + ':' + cur.sensor.y] = cur.sensor
  }
  
  // addMinMaxForRow(10, sensorsBeacons)
  addMinMaxForRow(2000000, sensorsBeacons)
  let minMaxs = sensorsBeacons
  .map(v => v.maxMin)
  .filter(v => v !== undefined) as MinMax[]
  
  // console.log(sensorsBeacons)
  console.log(minMaxs)
  let aa = combineIfCrossing(minMaxs)
  console.log(aa)
  let sum = getSum(aa)
  console.log(sum)
}
main()

function getSum(arr: MinMax[]) {
  let sum = 0
  for (let [a, b] of arr) {
    sum += Math.abs(a - b)
  }
  return sum
}

function combineIfCrossing(aa: MinMax[]) {
  let arr = [...aa]
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (isCrossing(arr[i], arr[j])) {
        arr[i] = combine(arr[i], arr[j])
        arr.splice(j, 1)
        i--
        break
      }
    }
  }
  return arr
}

function isCrossing(a: MinMax, b: MinMax) {
  return a[0] <= b[0] && b[0] <= a[1] ||
    b[0] <= a[0] && a[0] <= b[1]
}

function combine(a: MinMax, b: MinMax) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])] as MinMax
}

function addMinMaxForRow(rowY: number, sensorsBeacons: Pair[]) {
  for (let s of sensorsBeacons) {
    let a = s.dist - (Math.abs(rowY - s.sensor.y))
    if (a >= 0) {
      s.maxMin = [s.sensor.x - a, s.sensor.x + a]
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
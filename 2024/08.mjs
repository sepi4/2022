import { readInput } from '../lib/js/index.mjs'

async function main() {
  let input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`
  // input = await readInput('08-input.txt')

  let rows = input.split('\n').map(x => x.split(''))

  let map = new Map()
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      let char = rows[y][x]
      if (char === '.') {
        continue
      }
      let coor = { y, x }
      if (map.has(char)) {
        let arr = map.get(char)
        arr.push(coor)
        map.set(char, arr)
      } else {
        map.set(char, [coor])
      }
    }
  }
  console.log(map)

  let hashes = {}

  function markHash(hash) {
    if (
      hash.y >= 0 &&
      hash.y < rows.length &&
      hash.x >= 0 &&
      hash.x < rows[0].length
    ) {
      hashes[`${hash.y}:${hash.x}`] = true
    }
  }
  for (let [k, coors] of map) {
    for (let a = 0; a < coors.length - 1; a++) {
      for (let b = a + 1; b < coors.length; b++) {
        let dy = coors[a].y - coors[b].y
        let dx = coors[a].x - coors[b].x
        let hashA = {
          y: coors[a].y + dy,
          x: coors[a].x + dx,
        }
        let hashB = {
          y: coors[b].y - dy,
          x: coors[b].x - dx,
        }
        markHash(hashA)
        markHash(hashB)

      }
    }

  }

  console.log(hashes)
  console.log(Object.keys(hashes).length)

}


main()

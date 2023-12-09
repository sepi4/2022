export { }

type V = {
  visited: boolean,
  value: string,
  dist: number,
  prev?: V,
  height: number,
  coor: [number, number]
}
function main() {
  // let input = getExampleInput()
  let input = getInput()
  let arrStr = input.split('\n').map(row => row.split(''))
  let arr: V[][] = arrStr.map((row, y) => row.map((c, x) => {
    let height = c.charCodeAt(0) - 'a'.charCodeAt(0)
    if (c === 'S') {
      height = 0
    }
    if (c === 'E') {
      height = 'z'.charCodeAt(0) - 'a'.charCodeAt(0)
    }
    return {
      value: c,
      visited: false,
      dist: c === 'S' ? 0 : Infinity,
      height,
      coor: [y, x]
    }
  }))

  let [sY, sX] = findStart(arr)
  let [eY, eX] = findEnd(arr)
  let dest = arr[eY][eX]
  let start = arr[sY][sX]

  let unvisited: V[] = []
  for (let row of arr) {
    for (let v of row) {
      unvisited.push(v)
    }
  }
  let i = 0
  unvisited.sort((a, b) => b.dist - a.dist)
  let visited: V[] = []

  while (unvisited.length > 0) {
    i++
    let current = unvisited.pop()
    if (current?.dist === Infinity) {
      break
    }
    if (!current) {
      throw Error('No current')
    }
    let [y, x] = current.coor
    let neighbors = getNeighbors(y, x, arr)
    for (let n of neighbors) {
      let possDist = current.dist + 1
      if (possDist < n.dist) {
        n.dist = possDist
        n.prev = current
      }
    }
    unvisited.sort((a, b) => b.dist - a.dist)
    current.visited = true
    visited.push(current)
    if (current.value === 'E') {

    }

  }
  console.log(dest)
  console.log(i)
  for (let row of arr) {
    let str = ''
    for (let v of row) {
      // str += v.dist + '\t'
      str += v.visited ? 'x' : '.'
    }
    console.log(str)
  }

}
main()

function findEnd(arr: V[][]): [number, number] {
  for (let row of arr) {
    for (let v of row) {
      if (v.value === 'E') {
        return v.coor
      }
    }
  }
  throw new Error("Can't find start position");
}

function findStart(arr: V[][]): [number, number] {
  for (let row of arr) {
    for (let v of row) {
      if (v.value === 'S') {
        return v.coor
      }
    }
  }
  throw new Error("Can't find start position");
}

function getNeighbors(y: number, x: number, arr: V[][]) {
  let neighbors: V[] = []
  if (y - 1 >= 0 && compare(arr[y][x], arr[y - 1][x])) {
    neighbors.push(arr[y - 1][x])
  }
  if (y + 1 < arr.length && compare(arr[y][x], arr[y + 1][x])) {
    neighbors.push(arr[y + 1][x])
  }
  if (x - 1 >= 0 && compare(arr[y][x], arr[y][x - 1])) {
    neighbors.push(arr[y][x - 1])
  }
  if (x + 1 < arr[0].length && compare(arr[y][x], arr[y][x + 1])) {
    neighbors.push(arr[y][x + 1])
  }
  return neighbors
}

function compare(original: V, neighbor: V) {
  if (neighbor === undefined || neighbor.visited) {
    return false
  }
  return  neighbor.height - original.height <= 1
}


function getExampleInput() {
  return `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`
}
function getInput() {
  return `abaccccccccccccccaaaccccaaaaaaaaaaaaaccccccaacccccccccccccccccccccccccccccaaaaaa
abaaccaacccccccccaaaaaccccaaaaaaaaaaaaaccccaaacccccccccccccccccccccccccccccaaaaa
abaaccaaacccccccaaaaaacccaaaaaaaaaaaaaacaaaaaaaaccccccccaacccccccccccccccccccaaa
abcaaaaaaaacccccaaaaaacccaaaaaaaaaaaaaacaaaaaaaacccccccaaaacccccccccccccccccaaaa
abcaaaaaaaaccccccaaaaaccaaaaaaaaccaaaaaccaaaaaaccccccccaaaaccaaaccccccccccccaaac
abccaaaaaacccccccaaaaccaaaaaaaaaacaaaacccaaaaaacccccccccakkaaaaaacccccccccccaacc
abccaaaaaacccccccccccccaaaaaaaaaaccccccccaaaaaaccccccckkkkkkkaaacccccccccccccccc
abccaaaaaaccccccccccccccccaaaaaaaaaccccccaacaaacccccckkkkkkkkkaccccccaccaaaccccc
abccaacaaacccccaaccccccccaaacacaaaacaaccccccccccccccakkkoppkkkkicccccaaaaaaccccc
abccccccccccccaaaccccccccaacccccaaaaaaccccccccccccccjkkooppppkiicccccccaaaaccccc
abccccccccccaaaaaaaaccccccccccaaaaaaaccccccccccccccjjjooopppppiiiicccccccaaacccc
abaaacccccccaaaaaaaacccccccaacaaaaaaccccccccccccccjjjjooouuppppiiiiiicccccaacccc
abaaaccccccccaaaaaaccccccccaaaccaaaaacccccccccccjjjjjooouuuupppiiiiiiiiccccacccc
abaaaaaacccccaaaaaacccccaaaaaaaaaacaaaccccccccjjjjjjooouuuuuupppppiiiiiicccccccc
abaaaaaacccccaaaaaacccccaaaaaaaaaacccccccccccjjjjjooooouuxxuupppppqqqijjjccccccc
abaaaacccccaaaaccaaccccccaaaaaaccccccccccccciijjnooooouuuxxxuuupqqqqqqjjjdddcccc
abaaaaaccaaaaaaccacccccccaaaaaaccccccccccaaiiiinnootttuuxxxxuuvvvvvqqqjjjdddcccc
abaaaaaccaaaaaacaaaccaaccaaaaaaccccccccccaaiiinnnntttttuxxxxxvvvvvvqqqjjjdddcccc
abaaccacccaaaaacaaaaaaaccaaccaaccccccccccaaiiinnnttttxxxxxxxyyyyyvvqqqjjjdddcccc
abcccccccaaaaacccaaaaaaccccccaaaaacccccccaaiiinnntttxxxxxxxyyyyyvvvqqqjjjddccccc
SbcccccccaaaaacaaaaaaaaccccccaaaaaccccccccciiinnntttxxxEzzzzyyyyvvqqqjjjdddccccc
abcccccccccccccaaaaaaaaaccccaaaaaaccccccccciiinnnntttxxxxyyyyyvvvvqqjjjdddcccccc
abcccccccccccccaaaaaaaaaacccaaaaaacccccccccciiinnnttttxxxyyyyyvvvqqqjjjdddcccccc
abccccccccccccccccaaaaaaacccaaaaaaccccccccccciiinnnntttwyyywyyyvvrrrkkjdddcccccc
abcccccccccccccccaaaaaaaaccccaaaccccccccccccciiihnnnttwwwywwyyywvrrrkkkeeccccccc
abcccccccccccccccaaaaaaaaccccccccccccccccccccchhhmmmsswwwwwwwwwwwvrrkkkeeccccccc
abcccccccaacccccccacaaacccccccccccccccccccaacchhhhmmsswwwwwswwwwwrrrkkkeeccccccc
abcccccccaaaccacccccaaacccccccccccccccaaccaaccchhhmmssswwwssrrwwwrrrkkkeeccccccc
abcccccccaaaaaaacccccccccccaaaccccccccaaaaaaccchhhmmssssssssrrrrrrrrkkkeeaaacccc
abcccccaaaaaaaaccccccccccccaaaaccccccccaaaaaaachhhmmmssssssllrrrrrrkkkeeeaaacccc
abccccaaaaaaaaaccccccccccccaaaacccccccccaaaaacchhhmmmmsssllllllllkkkkkeeeaaacccc
abccccaaaaaaaaaccccccccccccaaacccccccccaaaaacccchhhmmmmmlllllllllkkkkeeeeaaccccc
abcccccccaaaaaaccccccccccaacccccccaaccaaacaacccchhhmmmmmlllgfflllkkffeeeaaaacccc
abccccccaaaaaaaccccccccccaaaaaaaaaaaaaccccaacccchhhggmmmggggffffffffffeaaaaacccc
abccaacccaacccaaaaccaccccaaaaaaaaaaaaacccccccccccgggggggggggffffffffffaacccccccc
abaaaaccaaaccccaaaaaaccccaaaaaacaaaaaaccccccccccccgggggggggaaaaccffccccccccccccc
abaaaacccccccccaaaaaaccaaaaaaaaaaaaaacccccccccccccccgggaaaaaaaacccccccccccccccca
abaaaaacccccccaaaaaaaccaaaaaaaaaaaaaacccccccccccccccccaaacccaaaaccccccccccccccaa
abaaaaacaaaaccaaaaaaaacaaaaaaaaaaaccccccccccccccccccccaaaccccaaaccccccccccaaacaa
abaaaaacaaaaccaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccaaaaaa
abaaacccaaaaccccaaaccccaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccaaaaa`
}


// let char = 'a'
// let code = char.charCodeAt(0)
// let chars = ''
// do {
//   char = String.fromCharCode(code++)
//   chars += char
// } while (char !== 'z');
// console.log(chars)
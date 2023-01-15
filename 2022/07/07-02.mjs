import { readInput } from "../../lib/js/index.mjs"

let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

input = await readInput('./2022/07/input.txt')


class Dir {
  name
  dirs = []
  files = []
  constructor(name) {
    this.name = name
  }
}

class File {
  name
  size
  constructor(name, size) {
    this.name = name
    this.size = size
  }
}

main()
function main() {
  let arr = input.split('\n')
  let fileTree = getFileTree(arr)
  let sums = getSums(fileTree)
  sums.sort((a, b) => b - a)
  let rootDirSize = sums[0]
  sums = sums.reverse()
  let freeSpaceNeeded = 30_000_000 - (70_000_000 - rootDirSize)
  let answer
  for (let size of sums) {
    if (size >= freeSpaceNeeded) {
      answer = size
      break
    }
  }
  if (answer === 7991939) {
    console.log(answer)
    console.log('correct')
  }
}

function getSums(rootDir) {
  let sums = []
  function traverseDirs(dir) {
    let sum = 0
    for (let d of dir.dirs) {
      sum += traverseDirs(d)
    }
    for (let f of dir.files) {
      let x = Number(f.size)
      sum += x
    }
    sums.push(sum)
    return sum
  }
  traverseDirs(rootDir)
  return sums
}

function getFileTree(arr) {
  let stack = []
  for (let row of arr) {
    let vv = row.split(' ')
    const currentDir = stack[stack.length - 1]
    if (vv[0] === '$') {
      cd(vv, currentDir, stack)
    } else if (vv[0] === 'dir') {
      dir(vv, currentDir)
    } else {
      file(vv, currentDir)
    }
  }
  return stack[0]
}
function file(vv, currentDir, stack) {
  let fileSize = vv[0]
  let fileName = vv[1]
  currentDir.files.push(new File(fileName, fileSize))
}

function dir(vv, currentDir) {
  let dirName = vv[1]
  currentDir.dirs.push(new Dir(dirName))
}

function cd(vv, currentDir, stack) {
  if (vv[1] === 'cd' && vv[2] === '..') {
    stack.pop()
  } else if (vv[1] === 'cd') {
    let dirName = vv[2]
    const found = currentDir?.dirs.find(d => d.name === dirName)
    stack.push(found ? found : new Dir(vv[2]))
  }
}


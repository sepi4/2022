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


let arrNames = []
class Dir {
  name
  dirs = []
  files = []
  constructor(name) {
    this.name = name
    arrNames.push(name)
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

let arr = input.split('\n')
let dirs = {}

let stack = []
for (let row of arr) {
  let values = row.split(' ')
  const currentDir = stack[stack.length - 1]
  if (values[0] === '$') {
    // commands
    if (values[1] === 'cd') {
      // navigate
      if (values[2] === '..') {
        console.log('cd ..:', row)
        stack.pop()
      } else {
        console.log('cd dir:', row)
        let dirName = values[2]
        const found = currentDir?.dirs.find(d => d.name === dirName)
        stack.push(found ? found : new Dir(values[2]))
      }
    } else if (values[1] === 'ls') {
      // ls
      console.log('ls:', row)
    }
  } else if (values[0] === 'dir') {
    // dir
    console.log('dir:', row)
    let dirName = values[1]
    currentDir.dirs.push(new Dir(dirName))

  } else {
    // file
    console.log('file:', row)
    let fileSize = values[0]
    let fileName = values[1]
    currentDir.files.push(new File(fileName, fileSize))
  }
}


let fileTree = stack[0]
// console.log(JSON.stringify(fileTree, null, 2))


let ss = 0
function traverseDir(dir) {
  let sum = 0
  for (let d of dir.dirs) {
    sum += traverseDir(d)
  }
  for (let f of dir.files) {
    let x = Number(f.size)
    sum += x
  }
  if (sum <= 100000) {
    ss += sum
  }
  return sum
}
console.log('----------')
let s = traverseDir(fileTree)
console.log(ss)

// traverseFileTree(fileTree)

// function traverseFileTree(tree) {
//   let dirStack = [tree]
//   while(dirStack.length) {
//     let last = dirStack[dirStack.length - 1]
//     if (last.dirs.length > 0) {
//       for (let d of last.dirs) {
//         dirStack.push(d)
//       }
//     } else {
//       for (let f of last.files) {
//         debugger
//         console.log(f, dirStack)
//       }
//       dirStack.pop()
//     }
//   }
// }


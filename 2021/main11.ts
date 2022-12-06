// tsc main11.ts -w --target es6 --sourceMap --outfile bundle.js

let input: string = `11111
19991
19191
19991
11111`

input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

input = `7313511551
3724855867
2374331571
4438213437
6511566287
6727245532
3736868662
2348138263
2417483121
8812617112`

let arr: number[][] = input.split('\n').map((x) => x.split('').map(Number))
// console.log(arr)

function addToNext(y, x) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue
            }
            let nY = y + i
            let nX = x + j
            if (
                nY >= 0 &&
                nY < arr.length &&
                nX >= 0 &&
                nX < arr[0].length &&
                arr[nY][nX] < 10
            ) {
                arr[nY][nX]++
            }
        }
    }
}

function runLoop() {
    // initial ++
    let allowed = []
    for (let y = 0; y < arr.length; y++) {
        allowed[y] = []
        for (let x = 0; x < arr[y].length; x++) {
            arr[y][x]++
            allowed[y][x] = true
        }
    }

    // loop check for flash
    let edited = true
    while (edited) {
        edited = false
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[y].length; x++) {
                if (arr[y][x] > 9 && allowed[y][x]) {
                    allowed[y][x] = false
                    edited = true
                    addToNext(y, x)
                }
            }
        }
    }

    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] > 9) {
                arr[y][x] = 0
            }
        }
    }
}

function countFlashes() {
    let sum = 0
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] === 0) {
                sum++
            }
        }
    }
    return sum
}

function allZero() {
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] !== 0) {
                return false
            }
        }
    }
    return true
}

// console.table(arr)

// let sum = 0
// for (let n = 0; n < 100; n++) {
//     // console.log('loop: ', n + 1)
//     runLoop()
//     sum += countFlashes()
//     // console.table(arr)
// }
// console.log(sum)

for (let i = 1; ; i++) {
    runLoop()
    if (allZero()) {
        console.log(i)
        break
    }
}

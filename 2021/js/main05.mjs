import { readInput } from "../lib/js/index.mjs"
let input = await readInput('./2021/main05-input.txt')

// input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`

let data = input.split('\n').map((x) => {
    let temp = x.split(/,| -> /)
    return {
        x1: Number(temp[0]),
        y1: Number(temp[1]),
        x2: Number(temp[2]),
        y2: Number(temp[3]),
    }
})

// console.log(data)
data = data.filter((line) => {
    const xD = Math.abs(line.x1 - line.x2)
    const yD = Math.abs(line.y1 - line.y2)
    if (xD !== 0 && yD !== 0) {
        return xD === yD
    }
    return true
})

// console.log('filtered: ', data)

let points = new Map()

function getPoints(line) {
    let xStep = 0
    if (line.x1 < line.x2) {
        xStep = 1
    } else if (line.x1 > line.x2) {
        xStep = -1
    }

    let yStep = 0
    if (line.y1 < line.y2) {
        yStep = 1
    } else if (line.y1 > line.y2) {
        yStep = -1
    }

    let xCurrent = line.x1
    let yCurrent = line.y1
    while (true) {
        let key = xCurrent + '-' + yCurrent
        if (!points.has(key)) {
            points.set(key, 0)
        }
        points.set(key, points.get(key) + 1)

        // console.log(xCurrent, yCurrent)
        // console.log(line.x2, line.y2)

        if (xCurrent === line.x2 && yCurrent === line.y2) {
            break
        }

        xCurrent += xStep
        yCurrent += yStep
    }
}

for (let l of data) {
    getPoints(l)
}

// console.log('lines: ', points)
// kissa

let amount = 0
for (const v of points.values()) {
    if (v > 1) {
        amount++
    }
}
console.log(amount)

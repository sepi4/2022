// tsc main13.ts -w --target es2016 --sourceMap --outfile bundle.js

import { readInput } from "../lib"

async function main() {

    let input = await readInput('./2021/main13-input.txt')

    // input = `6,10
    // 0,14
    // 9,10
    // 0,3
    // 10,4
    // 4,11
    // 6,0
    // 6,12
    // 4,1
    // 0,13
    // 10,12
    // 3,4
    // 3,0
    // 8,4
    // 1,10
    // 2,14
    // 8,10
    // 9,0
    
    // fold along y=7
    // fold along x=5`
    
    let coords: number[][] = []
    let folds: [string, number][] = []
    
    let arr = input.split('\n')
    
    for (let a of arr) {
        if (a.match(/^fold/)) {
            let str = a.split(' ')[2]
            let [along, value] = str.split('=')
            folds.push([along, Number(value)])
        } else if (a.match(/\d+,\d+/)) {
            let [x, y] = a.split(',')
            coords.push([Number(x), Number(y)])
        }
    }
    
    let maxs = [-1, -1]
    for (let [x, y] of coords) {
        if (x > maxs[0]) {
            maxs[0] = x
        }
        if (y > maxs[1]) {
            maxs[1] = y
        }
    }
    
    // console.log(coords.length)
    
    // console.log(folds)
    // console.log(maxs)
    
    for (let [dir, fold] of folds) {
        let dirI = -1
        if (dir === 'x') {
            dirI = 0
        } else if (dir === 'y') {
            dirI = 1
        } else {
            throw Error('kissa')
        }
        let iF = fold
        let iMax = maxs[dirI]
        let newSize = Math.max(iF, iMax - iF)
    
        let newCoords = []
        for (let v of coords) {
            if (v[dirI] === iF) {
                continue
            } else if (newSize > iF) {
                let d = newSize - iF
                if (v[dirI] < iF) {
                    v[dirI] = v[dirI] + d
                } else {
                    v[dirI] = 2 * iF - v[dirI] + d
                }
            } else {
                if (v[dirI] > iF) {
                    v[dirI] = 2 * iF - v[dirI]
                }
            }
            newCoords.push(v)
        }
        coords = newCoords
        maxs[dirI] = newSize - 1
    }
    
    // console.log(coords.length)
    
    let map = new Map()
    for (let v of coords) {
        map.set(v[0] + ',' + v[1], true)
    }
    console.log(map.size)
    console.log(maxs)
    // console.log(maxs[0] * maxs[1] - map.size)
    
    function printMatrix() {
        let str = ''
        for (let y = 0; y <= maxs[1]; y++) {
            for (let x = 0; x <= maxs[0]; x++) {
                if (map.has(x + ',' + y)) {
                    str += '#'
                } else {
                    str += '.'
                }
                str += ' '
            }
            str += '\n'
        }
        console.log(str)
    }
    printMatrix()
        
}
main()
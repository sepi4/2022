import { readInput } from '../lib/js/index.mjs'

async function main() {
    let input = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

    input = await readInput('12-input.txt')

    //     input = `
    // EEEEE
    // EXXXX
    // EEEEE
    // EXXXX
    // EEEEE
    // `

    //     input = `
    // AAAAAA
    // AAABBA
    // AAABBA
    // ABBAAA
    // ABBAAA
    // AAAAAA`

    let dirs = [
        { dy: -1, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 1, dx: 0 },
        { dy: 0, dx: -1 },
    ]

    let matrix = input
        .split('\n')
        .map(r => r.trim())
        .filter(row => row.length)
        .map(row => row.split(''))


    function getDifferentNeigbors(y, x) {
        let value = matrix[y][x]
        let arr = []
        for (let dir of dirs) {
            let { dy, dx } = dir
            let v = matrix[y + dy]?.[x + dx]
            if (
                v === undefined // matrix side
                || v !== value // different neighbor
            ) {
                arr.push({ dy, dx, })
            }
        }
        return arr
    }

    function getSameValueNeighbors(y, x) {
        let value = matrix[y][x]
        let nn = []
        for (let dir of dirs) {
            let { dy, dx } = dir
            let v = matrix[y + dy]?.[x + dx]
            if (v === undefined) continue
            if (v === value) {
                nn.push({
                    y: y + dy,
                    x: x + dx,
                })
            }
        }
        return nn
    }

    let cells = []

    // GET FENCES

    for (let y = 0; y < matrix.length; y++) {
        let arr = []
        for (let x = 0; x < matrix[0].length; x++) {
            let differentNeigbors = getDifferentNeigbors(y, x)
            arr.push({ y, x, differentNeigbors, })
        }
        cells.push(arr)
    }

    // GET AREAS
    let unvisited = new Map()
    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[0].length; x++) {
            let c = cells[y][x]
            unvisited.set(`y:${y},x:${x}`, c)
        }
    }

    let areaId = 0
    let v = unvisited.values().next().value
    while (v) {
        let sameValueNeighbors = [{ y: v.y, x: v.x, }]

        while (sameValueNeighbors.length) {
            let tmp = sameValueNeighbors.pop()
            cells[tmp.y][tmp.x].areaId = areaId
            unvisited.delete(`y:${tmp.y},x:${tmp.x}`)

            let sames = getSameValueNeighbors(tmp.y, tmp.x)
                .filter(item => unvisited.has(`y:${item.y},x:${item.x}`))
            if (sames.length) {
                sameValueNeighbors = sameValueNeighbors.concat(sames)
            }
        }

        v = unvisited.values().next().value
        areaId++
    }

    // group by area id
    let grouped = cells.flat().reduce((acc, cur) => {
        if (acc.has(cur.areaId)) {
            acc.get(cur.areaId).push(cur)
        } else {
            acc.set(cur.areaId, [cur])
        }
        return acc
    }, new Map())

    let price = 0
    for (let values of grouped.values()) {
        let marked = []
        let fences = 0
        for (let item of values) {
            let neighbors = getNeigbors(marked, item)
            for (let d of item.differentNeigbors) {
                let { dy, dx } = d
                if (neighbors.length) {
                    let foundSameFence = neighbors
                        .find(n => n.differentNeigbors
                            .find(nd => nd.dy === dy && nd.dx === dx))
                    if (foundSameFence) {
                        continue
                    }
                }
                fences++
            }
            marked.push(item)
        }
        price += values.length * fences
    }


    // console.log(grouped)
    console.log(price)

}


function getNeigbors(arr, obj) {
    return arr.filter(item => (
        ((item.y - obj.y === 1 || item.y - obj.y === -1) && item.x === obj.x)
        || ((item.x - obj.x === 1 || item.x - obj.x === -1) && item.y === obj.y)
    ))
}

main()


/*

PIPI CODE
---------

    xxx 
    xxx  
  x  x  x
   xxxxx
     x  
     xxxxx  . .
     xx         .
    x x          .     
   x   x         .
xxxxxxxxxxx     _____

*/
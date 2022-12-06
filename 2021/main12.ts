let input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`

input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

input = `RT-start
bp-sq
em-bp
end-em
to-MW
to-VK
RT-bp
start-MW
to-hr
sq-AR
RT-hr
bp-to
hr-VK
st-VK
sq-end
MW-sq
to-RT
em-er
bp-hr
MW-em
st-bp
to-start
em-st
st-end
VK-sq
hr-st`

let arr = input.split('\n').map((x) => x.split('-'))

let points: {
    [key: string]: string[]
} = {}

for (let [a, b] of arr) {
    if (points[a]) {
        points[a].push(b)
    } else {
        points[a] = [b]
    }
    if (points[b]) {
        points[b].push(a)
    } else {
        points[b] = [a]
    }
}

function isLowerCase(str) {
    return str === str.toLowerCase()
}

// function getSum(array, c) {
//     let sum = 0
//     for (let x of array) {
//         if (c === x) {
//             sum++
//         }
//     }
//     return 0
// }

let paths = []

function hasDouble(arr) {
    arr = arr.filter(isLowerCase)
    return new Set(arr).size !== arr.length
}

function go(current: string, road: string[], allowed) {
    if (current === 'end') {
        paths.push([...road, 'end'])
        return
    }

    for (let next of points[current]) {
        if (next === 'start') {
            continue
        }
        if (isLowerCase(current) && road.includes(current) && hasDouble(road)) {
            continue
        }
        go(next, [...road, current], allowed)
    }
}

go('start', [], true)

let ss = paths.map((x) => x.join(','))
console.log(ss.length)
// console.log(new Set(ss).size)
// console.log(ss)

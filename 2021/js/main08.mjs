import { readInput } from "../lib/js/index.mjs"
let input = await readInput('./2021/main08-input.txt')
console.log(input)

// input = `
// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

// input = `
// acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
// `

let arr = input
    .split('\n')
    .filter((x) => x !== '')
    .map((row) => row.split(' | ').map((x) => x.split(' ')))

let count = 0
for (let row of arr) {
    for (let x of row[1]) {
        if (
            x.length === 2 || // 1
            x.length === 4 || // 4
            x.length === 3 || // 7
            x.length === 7 // 8
        ) {
            count++
        }
    }
}

let numsArr = [
    [2, 5],
    [0, 2, 5],
    [1, 2, 3, 5],
    [0, 1, 2, 3, 4, 5, 6],
]

let nums5 = [
    [0, 2, 3, 4, 6],
    [0, 2, 3, 5, 6],
    [0, 1, 3, 5, 6],
]
let nums6 = [
    [0, 1, 2, 4, 5, 6],
    [0, 1, 3, 4, 5, 6],
    [0, 1, 2, 3, 5, 6],
]

function xxx(row) {
    let poss = new Array(7).fill([])
    let words = row[0].sort((a, b) => (a.length > b.length ? 1 : -1))

    let added = []
    let indexes = []

    let words5 = []
    let words6 = []

    for (let w of words) {
        if (w.length === 5) {
            words5.push(w)
            continue
        }
        if (w.length === 6) {
            words6.push(w)
            continue
        }

        let word = w.split('')
        for (let nums of numsArr) {
            if (word.length === nums.length) {
                for (let i of nums) {
                    if (!indexes.includes(i)) {
                        a += i
                        poss[i] = word.filter((x) => !added.includes(x))
                        indexes.push(i)
                    }
                }
                for (let l of word) {
                    if (!added.includes(l)) {
                        added.push(l)
                    }
                }
            }
        }
    }

    // mika kirjain on kaikissa vaakasuuntaisissa
    for (let l of words5[0]) {
        if (
            words5[0].includes(l) &&
            words5[1].includes(l) &&
            words5[2].includes(l)
        ) {
            if (poss[3].includes(l)) {
                poss[3] = [l]
                poss[1] = poss[1].filter((x) => x !== l)
            } else if (poss[6].includes(l)) {
                poss[6] = [l]
                poss[4] = poss[4].filter((x) => x !== l)
            }
        }
    }

    // mika kirjain on kaikissa vaakasuuntaisissa
    for (let l of words6[0]) {
        if (
            words6[0].includes(l) &&
            words6[1].includes(l) &&
            words6[2].includes(l)
        ) {
            if (poss[5].includes(l)) {
                poss[5] = [l]
                poss[2] = poss[2].filter((x) => x !== l)
            }
        }
    }

    let nums = []
    for (let w of row[1]) {
        let nn = []
        for (let l of w) {
            for (let i = 0; i < poss.length; i++) {
                if (l === poss[i][0]) {
                    nn.push(i)
                }
            }
        }
        nn = nn.sort().join('')
        nums.push(nn)
    }
    for (let i = 0; i < nums.length; i++) {
        nums[i] = getNum(nums[i])
    }

    return Number(nums.join(''))
}

function getNum(x) {
    switch (x) {
        case '012456':
            return 0
        case '25':
            return 1
        case '02346':
            return 2
        case '02356':
            return 3
        case '1235':
            return 4
        case '01356':
            return 5
        case '013456':
            return 6
        case '025':
            return 7
        case '0123456':
            return 8
        case '012356':
            return 9
        default:
            throw Error('wrong number')
    }
}

let sum = 0
for (let a of arr) {
    sum += xxx(a)
}

console.log(sum)

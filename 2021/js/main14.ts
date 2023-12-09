import { readInput } from "../lib"
// tsc main13.ts -w --target es2016 --sourceMap --outfile bundle.js

async function main() {
    let input = await readInput('./2021/main14-input.txt')
    // input = `NNCB

    // CH -> B
    // HH -> N
    // CB -> H
    // NH -> C
    // HB -> C
    // HC -> B
    // HN -> C
    // NN -> C
    // BH -> H
    // NC -> B
    // NB -> B
    // BN -> B
    // BB -> N
    // BC -> B
    // CC -> N
    // CN -> C`

    function getZeros() {
        let zeros = new Map()
        for (let [k, _] of rules.entries()) {
            zeros.set(k, 0)
        }
        return zeros
    }

    let rows: string[] = input.split('\n').filter((row) => row !== '')

    let template: string[] = rows[0].split('')

    let xxx = rows.slice(1).map((r) => r.split(' -> '))

    let rules = new Map()
    for (let [k, v] of xxx) {
        rules.set(k, v)
    }

    // // inital loop
    let amounts = getZeros()
    for (let i = 1; i < template.length; i++) {
        let [a, b] = [template[i - 1], template[i]]
        amounts.set(a + b, amounts.get(a + b) + 1)
    }

    let STEPS = 40
    for (let i = 0; i < STEPS; i++) {
        let newAmounts = getZeros()

        for (let [k, v] of amounts.entries()) {
            if (v !== 0) {
                let aKey = k[0] + rules.get(k)
                newAmounts.set(aKey, v + newAmounts.get(aKey))

                let bKey = rules.get(k) + k[1]
                newAmounts.set(bKey, v + newAmounts.get(bKey))
            }
        }
        amounts = newAmounts
    }
    console.log(amounts)

    let letters = new Map()
    for (let [k, v] of amounts.entries()) {
        if (letters.has(k[0])) {
            letters.set(k[0], letters.get(k[0]) + amounts.get(k))
        } else {
            letters.set(k[0], amounts.get(k))
        }
    }

    let last = template[template.length - 1]
    letters.set(last, letters.get(last) + 1)

    let min = Infinity
    let max = -Infinity
    for (let v of letters.values()) {
        if (v < min) {
            min = v
        }
        if (v > max) {
            max = v
        }
    }
    console.log(letters)
    console.log(max - min)
}
main()
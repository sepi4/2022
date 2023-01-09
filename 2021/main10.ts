import { readInput } from "../lib"
async function main() {
    let input = await readInput('./2021/main10-input.txt')
    console.log(input)

    // input = `[({(<(())[]>[[{[]{<()<>>
    // [(()[<>])]({[<{<<[]>>(
    // {([(<{}[<>[]}>{[]{[(<()>
    // (((({<>}<{<{<>}{[]{[]{}
    // [[<[([]))<([[{}[[()]]]
    // [{[{({}]{}}([{[{{{}}([]
    // {<[[]]>}<{[{[{[]{()[[[]
    // [<(<(<(<{}))><([]([]()
    // <{([([[(<>()){}]>(<<{{
    // <{([{{}}[<[[[<>{}]]]>[]]`
    
    let arr = input.split('\n')
    
    function getWrongChar(line:string) {
        let expectedStack: string[] = []
        for (let c of line) {
            switch (c) {
                case '(':
                    expectedStack.push(')')
                    break
                case '[':
                    expectedStack.push(']')
                    break
                case '{':
                    expectedStack.push('}')
                    break
                case '<':
                    expectedStack.push('>')
                    break
    
                case ')':
                case ']':
                case '}':
                case '>':
                    let poped = expectedStack.pop()
                    if (poped !== c) {
                        return [c, expectedStack]
                    }
                    break
            }
        }
        return [null, expectedStack]
    }
    
    let sum = 0
    let linesValues = []
    for (let line of arr) {
        let [c, expectedStack] = getWrongChar(line)
        if (c) {
            switch (c) {
                case ')':
                    sum += 3
                    break
                case ']':
                    sum += 57
                    break
                case '}':
                    sum += 1197
                    break
                case '>':
                    sum += 25137
                    break
            }
        } else {
            let value = 0
            for (let x of expectedStack.reverse()) {
                value *= 5
                switch (x) {
                    case ')':
                        value += 1
                        break
                    case ']':
                        value += 2
                        break
                    case '}':
                        value += 3
                        break
                    case '>':
                        value += 4
                        break
                }
            }
            linesValues.push(value)
        }
    }
    linesValues.sort((a, b) => (a > b ? 1 : -1))
    
    console.log(linesValues)
    console.log(linesValues[Math.floor(linesValues.length / 2)])
    
    // console.log(sum)
    
}
main()

const nums = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
}


function toBits(hex) {
  return hex.split('').map(x => nums[x]).join('')
}

let x = toBits(getInput())


let vSum = 0
function getPackets(input) {
  if (input.length < 11) {
    return
  }
  let v = input.substring(0, 3)
  console.log('v:', v, ': ', parseInt(v, 2))
  vSum += parseInt(v, 2)
  let t = input.substring(3, 6)
  input = input.substring(6)

  if (t !== '100') {
    let c = input.substring(0, 1)
    input = input.substring(1)

    if (c === '0') {
      let lenBits = input.substring(0, 15)
      input = input.substring(15)
      let len = parseInt(lenBits, 2)
      let patka = input.substring(0, len)
      getPackets(patka)
      input = input.substring(len)
    }
    if (c === '1') {

      let lenBits = input.substring(0, 11)
      input = input.substring(11)
      let len = parseInt(lenBits, 2)
      // for (let i = 0; i < len; i++) {
      //   getPackets(input)
      // }
    }

  } else {
    debugger
    let sub = input.substring(0, 5)
    input = input.substring(5)
    let num = ''
    while (sub[0] === '1') { // while (sub[0] === 1) {
      num += input.substring(1, 5)
      sub = input.substring(0, 5)
      input = input.substring(5)
    }
  }
  getPackets(input)
}
let input = getInput()
console.log(input)
let bits = toBits(input)
console.log(bits)
console.log()
getPackets(bits)
console.log(vSum)



// let vSum = 0
// function getPackets(input, index) {
//   if (input.length - index < 11) {
//     return
//   }
//   let v = input.substring(index, index += 3)
//   console.log('v:', v, ': ', parseInt(v, 2))
//   vSum += parseInt(v, 2)

//   let t = input.substring(index, index += 3)

//   if (t === '100') {
//     let num = ''
//     do {
//       num += input.substring(index + 1, index + 5)
//       index += 5
//     } while (input[index] === 1) {
//     }
//   } else {
//     let c = input.substring(index, index += 1)

//     if (c === '0') {
//       let lenBits = input.substring(index, index += 15)
//       let len = parseInt(lenBits, 2)
//       let patka = input.substring(index, index += len)
//       getPackets(patka, 0)
//     }
//     if (c === '1') {
//       let lenBits = input.substring(index, index += 11)
//       let len = parseInt(lenBits, 2)
//       // for (let i = 0; i < len; i++) {
//       //   getPackets(input)
//       // }
//     }

//   }
//   getPackets(input, index)
// }
// let input = getInput()
// console.log(input)
// let bits = toBits(input)
// console.log(bits)
// console.log()
// getPackets(bits, 0)
// console.log(vSum)





function getInput() {
  // main
  return 'C20D718021600ACDC372CD8DE7A057252A49C940239D68978F7970194EA7CCB310088760088803304A0AC1B100721EC298D3307440041CD8B8005D12DFD27CBEEF27D94A4E9B033006A45FE71D665ACC0259C689B1F99679F717003225900465800804E39CE38CE161007E52F1AEF5EE6EC33600BCC29CFFA3D8291006A92CA7E00B4A8F497E16A675EFB6B0058F2D0BD7AE1371DA34E730F66009443C00A566BFDBE643135FEDF321D000C6269EA66545899739ADEAF0EB6C3A200B6F40179DE31CB7B277392FA1C0A95F6E3983A100993801B800021B0722243D00042E0DC7383D332443004E463295176801F29EDDAA853DBB5508802859F2E9D2A9308924F9F31700AA4F39F720C733A669EC7356AC7D8E85C95E123799D4C44C0109C0AF00427E3CC678873F1E633C4020085E60D340109E3196023006040188C910A3A80021B1763FC620004321B4138E52D75A20096E4718D3E50016B19E0BA802325E858762D1802B28AD401A9880310E61041400043E2AC7E8A4800434DB24A384A4019401C92C154B43595B830002BC497ED9CC27CE686A6A43925B8A9CFFE3A9616E5793447004A4BBB749841500B26C5E6E306899C5B4C70924B77EF254B48688041CD004A726ED3FAECBDB2295AEBD984E08E0065C101812E006380126005A80124048CB010D4C03DC900E16A007200B98E00580091EE004B006902004B00410000AF00015933223100688010985116A311803D05E3CC4B300660BC7283C00081CF26491049F3D690E9802739661E00D400010A8B91F2118803310A2F43396699D533005E37E8023311A4BB9961524A4E2C027EC8C6F5952C2528B333FA4AD386C0A56F39C7DB77200C92801019E799E7B96EC6F8B7558C014977BD00480010D89D106240803518E31C4230052C01786F272FF354C8D4D437DF52BC2C300567066550A2A900427E0084C254739FB8E080111E0'


  // return "D2FE28" // 6
  // return "38006F45291200" // 9
  // return "EE00D40C823060" // 14

  // return '8A004A801A8002F478' // 16
  // return '620080001611562C8802118E34' // 12
  // return 'C0015000016115A2E0802F182340' // 23
  // return 'A0016C880162017C3686B18A3D4780' // 31
}


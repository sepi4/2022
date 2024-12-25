range([1, 4, 5, 2, 3, 9, 8, 11, 0])
range([1, 4, 2, 3])

function range(arr) {
  const sortedArr = arr.toSorted((a, b) => a - b)
  // 0, 1, 2, 3, 4, 5, 8, 9, 11

  /*
  [
    [0, 1, 2, 3, 4, 5], -> 0-5
    [8, 9], -> 8-9
    [11], -> 11
  ]

  */
  let aa = []
  let prev = undefined
  for (let i = 0; i < sortedArr.length; i++) {
    const cur = sortedArr[i]
    if (prev === undefined) {
      aa.push([cur])

    } else if (cur - prev === 1) {
      aa[aa.length - 1].push(cur)

    } else {
      aa.push([cur])
    }
    prev = cur
  }

  let result = aa.map(a => {
    if (a.length > 1) {
      return `${a[0]}-${a[a.length - 1]}`
    } else {
      return `${a}`
    }
  }).join(',')
  console.log(result)
}
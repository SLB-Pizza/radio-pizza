import testData from '../../__test__/tests/mappableDataFilter.test.json'

const testCaseMaker = goodEntry => {
  let testCases = []

  for (let i = 1; i <= 10; i++) {
    let validEntriesTotal = Math.ceil(Math.random() * 500) + i + 99
    let invalidEntriesTotal = i
    let testArrayLength = validEntriesTotal + invalidEntriesTotal
    let validEntry = goodEntry

    // Array of all the bad entry test cases used so far
    let badEntries = testData.bad_entries

    const arrayMaker = () => {
      let validCount = 0
      let invalidCount = 0
      let mixedArray = []

      while (mixedArray.length !== testArrayLength) {
        let badIndex = i % badEntries.length

        if (validCount === validEntriesTotal) {
          // Randomly select and add an invalid entry
          mixedArray.push(badEntries[badIndex])
          invalidCount++
        } else if (invalidCount === invalidEntriesTotal) {
          // Add a valid entry
          mixedArray.push(validEntry)
          validCount++
        } else {
          // Flip a numeric coin
          let validOrInvalid = Math.ceil(Math.random() * 2)

          // if 1, add invalid; if 2, add valid
          if (validOrInvalid === 1) {
            mixedArray.push(badEntries[badIndex])
            invalidCount++
          } else {
            mixedArray.push(validEntry)
            validCount++
          }
        }
      }
      return mixedArray
    }

    let testArray = arrayMaker()
    // Create an array with validEntries # of empty slots and fill each slot with valid entry
    let arrayMatch = Array(validEntriesTotal).fill(validEntry)
    // Create 100 test cases to examine
    testCases.push({
      array: testArray,
      allValid: arrayMatch,
      invalid: invalidEntriesTotal,
    })
  }

  return testCases
}

export default testCaseMaker

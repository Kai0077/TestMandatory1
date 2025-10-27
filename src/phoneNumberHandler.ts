/**
 * @description generatePhoneNumber() generates a valid Danish phone number. This means an digit number with valid start values.
 * @returns A valid Danish phone number as string
 */

function generatePhoneNumber(): string {
  const maxLength = 8;
  let finalPhoneNumber = getValidStart();

  while (finalPhoneNumber.length < maxLength) {
    finalPhoneNumber += Math.floor(Math.random() * 10);
  }

  return finalPhoneNumber;
}

/**
 * @description getValidStart() gets the full list of all valid starting numbers for a Danish phone number.
 * @returns A number array
 */

function getValidStart(): string {
  const startNumbers = [
    2, 30, 31, 40, 41, 42, 50, 51, 52, 53, 60, 61, 71, 81, 91, 92, 93, 342, 359,
    362, 389, 398, 431, 441, 462, 466, 468, 472, 474, 476, 478, 545, 556, 577,
    579, 584, 589, 627, 629, 641, 649, 658, 667, 697, 829,
  ];

  // Range intervals. For ex. 344-349 are VALID. 350-355 are NOT VALID.
  const validRanges = [
    [344, 349],
    [356, 357],
    [365, 366],
    [485, 486],
    [488, 489],
    [493, 496],
    [498, 499],
    [542, 543],
    [551, 552],
    [571, 574],
    [586, 587],
    [597, 598],
    [662, 665],
    [692, 694],
    [771, 772],
    [782, 783],
    [785, 786],
    [788, 789],
    [826, 827],
  ];

  /**
   * @description Grabs the intervals from the range arrays and returns the full list of all numbers included in the intervals
   * @returns A number array
   */

  const getAllNumbersFromRanges = (): number[] => {
    return validRanges
      .map(([start, end]) => {
        const allNumbers: number[] = [];
        for (let i = 0; i <= end - start; i++) {
          allNumbers.push(start + i);
        }
        return allNumbers;
      })
      .flat();
  };

  const finalArray = startNumbers.concat(getAllNumbersFromRanges());
  const validStart = Math.floor(Math.random() * finalArray.length); // Grab random start number from list

  return validStart.toString();
}

export { generatePhoneNumber };

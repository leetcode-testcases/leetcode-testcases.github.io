
import { type TestcaseParameter } from '../model/model';

export function generateTestcase(testcaseParameters: TestcaseParameter[]): string[] {
    let testcaseLines: string[] = [];

    for (let testcaseParameter of testcaseParameters) {
        switch (testcaseParameter.parameterType) {
            case 'number':
                testcaseLines.push(JSON.stringify(generateTestcaseNumber(testcaseParameter)))
                break
            case 'string':
                testcaseLines.push(JSON.stringify(generateTestcaseString(testcaseParameter)))
                break
            case 'boolean':
                testcaseLines.push(JSON.stringify(generateTestcaseBoolean()))
                break
            case 'array':
                testcaseLines.push(JSON.stringify(generateTestcaseArray(testcaseParameter)))
                break
            case '2darray':
                testcaseLines.push(JSON.stringify(generateTestcase2DArray(testcaseParameter)))
                break
        }
    }

    return testcaseLines
}


function generateTestcaseNumber(testcaseParameter: TestcaseParameter): number {
    let randomNumber: number = 0;
    switch (testcaseParameter.numberType) {
        case 'rangeWithExclude':
            randomNumber = generateNumberInRange(
                testcaseParameter.numberMinValue,
                testcaseParameter.numberMaxValue,
                testcaseParameter.numberExcludeValues,
                testcaseParameter.numberOptionIncludeDecimal
            )
            break
        case 'valuesToInclude':
            if (testcaseParameter.numberIncludeValues.length) {
                let randomIndex = Math.floor(Math.random() * testcaseParameter.numberIncludeValues.length)
                randomNumber = testcaseParameter.numberIncludeValues[randomIndex]
            } else {
                throw new Error('Please add at least 1 number to included values to select number from')
            }
            break
    }

    if (testcaseParameter.numberOptionIncludeDecimal) {
        return randomNumber
    } else {
        return Math.floor(randomNumber)
    }
}


function generateNumberInRange(minValue: number, maxValue: number, excludeValues: number[], includeDecimal: boolean): number {
    if (!includeDecimal) {
        minValue = Math.floor(minValue)
        maxValue = Math.floor(maxValue)
    }

    if (minValue > maxValue) {
        throw new Error('Number minimum value must be below or equal to maximum value')
    }

    if (excludeValues.length === 0 || includeDecimal) {
        return minValue + Math.random() * (maxValue + (includeDecimal ? 0 : 1) - minValue)
    } else {
        let excludeValuesSet = new Set(excludeValues)
        let excludeValuesSorted = Array.from(excludeValuesSet).filter((currNum) => currNum >= minValue && currNum <= maxValue).sort()

        let numValues = maxValue - minValue + 1 - excludeValuesSorted.length;
        if (numValues <= 0) {
            throw new Error('No possible numbers can be generated from number range and excluded values')
        }

        let generateMaxValue = maxValue - excludeValuesSorted.length
        let generatedNumber = Math.floor(minValue + Math.random() * (generateMaxValue + 1 - minValue))

        for (let i = 0; i < excludeValuesSorted.length; i++) {
            if (generatedNumber < excludeValuesSorted[i]) {
                break
            }
            generatedNumber++
        }

        return generatedNumber
    }
}


function generateTestcaseString(testcaseParameter: TestcaseParameter): string {
    let stringLength: number

    switch (testcaseParameter.stringOptionLength) {
        case 'fixed':
            stringLength = testcaseParameter.stringLength
            break
        case 'random':
            if (testcaseParameter.stringRandomMinLength > testcaseParameter.stringRandomMaxLength) {
                throw new Error('String random length, minimum length must be below or equal to maximum length')
            }
            stringLength = Math.floor(testcaseParameter.stringRandomMinLength + Math.random() * (testcaseParameter.stringRandomMaxLength + 1 - testcaseParameter.stringRandomMinLength))
            break
    }

    let characterSet = new Set<string>()

    if (testcaseParameter.stringIncludeLowercase) {
        for (let currChar of 'abcdefghijklmnopqrstuvwxyz') {
            characterSet.add(currChar)
        }
    }

    if (testcaseParameter.stringIncludeUppercase) {
        for (let currChar of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
            characterSet.add(currChar)
        }
    }

    if (testcaseParameter.stringIncludeDigits) {
        for (let currChar of '1234567890') {
            characterSet.add(currChar)
        }
    }

    if (testcaseParameter.stringIncludeCustomCharacters) {
        for (let currChar of testcaseParameter.stringCustomCharacters) {
            characterSet.add(currChar)
        }
    }

    let characters = Array.from(characterSet)
    let randomStringChars: string[] = []

    if (characters.length === 0) {
        throw new Error('Random string character set is empty, please select at least 1 type of character to add to string')
    }

    let generateLength = stringLength;
    if (testcaseParameter.stringGeneratePalindrome) {
        generateLength = Math.floor(stringLength / 2) + (stringLength % 2 == 1 ? 1 : 0);
    }

    for (let i = 0; i < generateLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length)
        randomStringChars.push(characters[randomIndex])
    }

    if (testcaseParameter.stringGeneratePalindrome) {
        let randomStringCharsLength = randomStringChars.length;
        for (let i = randomStringCharsLength - (stringLength % 2 == 1 ? 2 : 1); i >= 0; i--) {
            randomStringChars.push(randomStringChars[i]);
        }
    }

    return randomStringChars.join('')
}


function generateTestcaseBoolean(): boolean {
    return Math.random() < 0.5 ? false : true
}


function generateTestcaseArray(testcaseParameter: TestcaseParameter): (number | string | boolean)[] {
    let randomArray: (number | string | boolean)[] = []
    let arrayLength: number

    switch (testcaseParameter.arrayDimension1OptionLength) {
        case 'fixed':
            arrayLength = testcaseParameter.arrayDimension1Length
            break
        case 'random':
            if (testcaseParameter.arrayDimension1RandomMinLength > testcaseParameter.arrayDimension1RandomMaxLength) {
                throw new Error('Array random length, minimum length must be below or equal to maximum length')
            }
            arrayLength = Math.floor(testcaseParameter.arrayDimension1RandomMinLength + Math.random() * (testcaseParameter.arrayDimension1RandomMaxLength + 1 - testcaseParameter.arrayDimension1RandomMinLength))
            break
    }

    for (let i = 0; i < arrayLength; i++) {
        switch (testcaseParameter.parameterArrayType) {
            case 'number':
                randomArray.push(generateTestcaseNumber(testcaseParameter))
                break
            case 'string':
                randomArray.push(generateTestcaseString(testcaseParameter))
                break
            case 'boolean':
                randomArray.push(generateTestcaseBoolean())
                break
        }
    }

    return randomArray
}


function generateTestcase2DArray(testcaseParameter: TestcaseParameter): (number | string | boolean)[][] {
    let randomArray2D: (number | string | boolean)[][] = []
    let arrayLength1: number
    let arrayLength2: number

    switch (testcaseParameter.arrayDimension1OptionLength) {
        case 'fixed':
            arrayLength1 = testcaseParameter.arrayDimension1Length
            break
        case 'random':
            if (testcaseParameter.arrayDimension1RandomMinLength > testcaseParameter.arrayDimension1RandomMaxLength) {
                throw new Error('Array random length, minimum length must be below or equal to maximum length')
            }
            arrayLength1 = Math.floor(testcaseParameter.arrayDimension1RandomMinLength + Math.random() * (testcaseParameter.arrayDimension1RandomMaxLength + 1 - testcaseParameter.arrayDimension1RandomMinLength))
            break
    }

    switch (testcaseParameter.arrayDimension2OptionLength) {
            case 'matchDimension1':
                arrayLength2 = arrayLength1
                break
            case 'fixed':
                arrayLength2 = testcaseParameter.arrayDimension2Length
                break
            case 'random':
                if (testcaseParameter.arrayDimension1RandomMinLength > testcaseParameter.arrayDimension1RandomMaxLength) {
                    throw new Error('Array random length, minimum length must be below or equal to maximum length')
                }
                arrayLength2 = Math.floor(testcaseParameter.arrayDimension2RandomMinLength + Math.random() * (testcaseParameter.arrayDimension2RandomMaxLength + 1 - testcaseParameter.arrayDimension2RandomMinLength))
                break
        }

    for (let i = 0; i < arrayLength1; i++) {
        let randomArray: (number | string | boolean)[] = []
        for (let j = 0; j < arrayLength2; j++) {
            switch (testcaseParameter.parameterArrayType) {
                case 'number':
                    randomArray.push(generateTestcaseNumber(testcaseParameter))
                    break
                case 'string':
                    randomArray.push(generateTestcaseString(testcaseParameter))
                    break
                case 'boolean':
                    randomArray.push(generateTestcaseBoolean())
                    break
            }
        }
        randomArray2D.push(randomArray)
    }
    return randomArray2D
}


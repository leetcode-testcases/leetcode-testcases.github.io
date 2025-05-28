
import { useState } from 'react'
import { type TestcaseInputParameterProps, type ParameterType, type ParameterArrayType, type NumberType, type OptionLength } from '../model/model'
import CheckboxField from './ui/CheckboxField'
import InputNumberField from './ui/InputNumberField'
import InputTextField from './ui/InputTextField'
import RadioButtonTypeOption from './ui/RadioButtonTypeOption'
import RadioButtonFieldOption from './ui/RadioButtonFieldOption'

import styles from './TestcaseInputParameter.module.css'

function TestcaseInputParameter({ testcaseParameter, setParameter, parameterNumber, removeParameter }: TestcaseInputParameterProps) {
    // Currently uses states to store string values of inputs that could contain negative numbers
    const [numberMinValueInput, setNumberMinValueInput] = useState('0')
    const [numberMaxValueInput, setNumberMaxValueInput] = useState('10000')

    const removeParameterButtonHandler = () => {
        removeParameter(parameterNumber)
    }

    const handleParameterOutputTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            parameterType: event.target.value as ParameterType
        })
    }

    const handleParameterOutputArrayTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            parameterArrayType: event.target.value as ParameterArrayType
        })
    }

    const handleArrayDimension1OptionLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension1OptionLength: event.target.value as OptionLength
        })
    }

    const handleArrayDimension1LengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let parsedNumber = parseInt(event.target.value)
        if (isNaN(parsedNumber)) {
            parsedNumber = 1
        }

        parsedNumber = Math.max(parsedNumber, parseInt(event.target.min))
        parsedNumber = Math.min(parsedNumber, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension1Length: parsedNumber
        })
    }

    const handleArrayDimension1MinLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let randomMinLength = parseInt(event.target.value)
        if (isNaN(randomMinLength)) {
            randomMinLength = 1
        }

        randomMinLength = Math.max(randomMinLength, parseInt(event.target.min))
        randomMinLength = Math.min(randomMinLength, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension1RandomMinLength: randomMinLength
        })
    }

    const handleArrayDimension1MaxLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let randomMaxLength = parseInt(event.target.value)
        if (isNaN(randomMaxLength)) {
            randomMaxLength = 1
        }

        randomMaxLength = Math.max(randomMaxLength, parseInt(event.target.min))
        randomMaxLength = Math.min(randomMaxLength, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension1RandomMaxLength: randomMaxLength
        })
    }

    const handleArrayDimension2OptionLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension2OptionLength: event.target.value as OptionLength
        })
    }

    const handleArrayDimension2LengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let parsedNumber = parseInt(event.target.value)
        if (isNaN(parsedNumber)) {
            parsedNumber = 1
        }

        parsedNumber = Math.max(parsedNumber, parseInt(event.target.min))
        parsedNumber = Math.min(parsedNumber, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension2Length: parsedNumber
        })
    }

    const handleArrayDimension2MinLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let randomMinLength = parseInt(event.target.value)
        let randomMaxLength = testcaseParameter.arrayDimension2RandomMaxLength
        if (isNaN(randomMinLength)) {
            randomMinLength = 1
        }

        randomMinLength = Math.max(randomMinLength, parseInt(event.target.min))
        randomMinLength = Math.min(randomMinLength, parseInt(event.target.max))
        randomMaxLength = Math.max(randomMaxLength, parseInt(event.target.min))
        randomMaxLength = Math.min(randomMaxLength, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension2RandomMinLength: randomMinLength,
            arrayDimension2RandomMaxLength: randomMaxLength
        })
    }

    const handleArrayDimension2MaxLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let randomMinLength = testcaseParameter.arrayDimension2RandomMinLength
        let randomMaxLength = parseInt(event.target.value)
        if (isNaN(randomMaxLength)) {
            randomMaxLength = 1
        }

        randomMinLength = Math.max(randomMinLength, parseInt(event.target.min))
        randomMinLength = Math.min(randomMinLength, parseInt(event.target.max))
        randomMaxLength = Math.max(randomMaxLength, parseInt(event.target.min))
        randomMaxLength = Math.min(randomMaxLength, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            arrayDimension2RandomMinLength: randomMinLength,
            arrayDimension2RandomMaxLength: randomMaxLength
        })
    }

    const handleNumberOptionIncludeDecimalChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            numberOptionIncludeDecimal: event.target.checked === true
        })
    }

    const handleNumberTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            numberType: event.target.value as NumberType,
            numberExcludeValues: [],
            numberIncludeValues: []
        })
    }

    const handleNumberMinValueInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let numberMinValue = testcaseParameter.numberOptionIncludeDecimal ? parseFloat(event.target.value) : parseInt(event.target.value)

        if (!isNaN(numberMinValue)) {
            numberMinValue = Math.max(numberMinValue, parseInt(event.target.min))
            numberMinValue = Math.min(numberMinValue, parseInt(event.target.max))

            setParameter(parameterNumber, {
                ...testcaseParameter,
                numberMinValue: numberMinValue
            })

            setNumberMinValueInput(`${numberMinValue}`)
        } else {
            setNumberMinValueInput(event.target.value)
        }
    }

    const handleNumberMaxValueInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let numberMaxValue = testcaseParameter.numberOptionIncludeDecimal ? parseFloat(event.target.value) : parseInt(event.target.value)

        if (!isNaN(numberMaxValue)) {
            numberMaxValue = Math.max(numberMaxValue, parseInt(event.target.min))
            numberMaxValue = Math.min(numberMaxValue, parseInt(event.target.max))

            setParameter(parameterNumber, {
                ...testcaseParameter,
                numberMaxValue: numberMaxValue
            })

            setNumberMaxValueInput(`${numberMaxValue}`)
        } else {
            setNumberMaxValueInput(event.target.value)
        }
    }

    const handleStringOptionLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringOptionLength: event.target.value as OptionLength
        })
    }

    const handleStringLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let parsedNumber = parseInt(event.target.value)
        if (isNaN(parsedNumber)) {
            parsedNumber = 1
        }

        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringLength: parsedNumber
        })
    }

    const handleStringRandomMinLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let randomMinLength = parseInt(event.target.value)
        if (isNaN(randomMinLength)) {
            randomMinLength = 1
        }

        randomMinLength = Math.max(randomMinLength, parseInt(event.target.min))
        randomMinLength = Math.min(randomMinLength, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringRandomMinLength: randomMinLength
        })
    }

    const handleStringRandomMaxLengthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let randomMaxLength = parseInt(event.target.value)
        if (isNaN(randomMaxLength)) {
            randomMaxLength = 1
        }

        randomMaxLength = Math.max(randomMaxLength, parseInt(event.target.min))
        randomMaxLength = Math.min(randomMaxLength, parseInt(event.target.max))

        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringRandomMaxLength: randomMaxLength
        })
    }


    const handleNumberExcludeValuesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let numberValues: number[] = []

        for (let input of event.target.value.split(',')) {
            let inputNumber = parseFloat(input)
            if (!isNaN(inputNumber)) {
                numberValues.push(inputNumber)
            }
        }

        setParameter(parameterNumber, {
            ...testcaseParameter,
            numberExcludeValues: numberValues
        })
    }

    const handleNumberIncludeValuesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let numberValues: number[] = []

        for (let input of event.target.value.split(',')) {
            let inputNumber = parseFloat(input)
            if (!isNaN(inputNumber)) {
                numberValues.push(inputNumber)
            }
        }

        setParameter(parameterNumber, {
            ...testcaseParameter,
            numberIncludeValues: numberValues
        })
    }

    const handleStringIncludeLowercaseChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringIncludeLowercase: event.target.checked
        })
    }

    const handleStringIncludeUppercaseChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringIncludeUppercase: event.target.checked
        })
    }

    const handleStringIncludeNumbersChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringIncludeDigits: event.target.checked
        })
    }

    const handleStringIncludeCustomCharactersChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringIncludeCustomCharacters: event.target.checked
        })
    }

    const handleStringCustomCharactersChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringCustomCharacters: event.target.value.split('')
        })
    }

    const handleStringGeneratePalindromeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setParameter(parameterNumber, {
            ...testcaseParameter,
            stringGeneratePalindrome: event.target.checked
        })
    }

    return (
        <div className="border border-solid bg-gray-200 rounded p-4 my-2 shadow-lg h-full">
            <div className="flex justify-between">
                <h6 className="text-xl font-semibold">Parameter #{parameterNumber + 1}</h6>
                <button className={styles.removeParameterButton} onClick={removeParameterButtonHandler}>
                    <svg className="w-6 h-6" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            <br />

            <ul className={styles.radioInputGroup}>
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "number"}
                    label="Number"
                    value="number"
                />
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "string"}
                    label="String"
                    value="string"
                />
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "boolean"}
                    label="Boolean"
                    value="boolean"
                />
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "array"}
                    label="Array"
                    value="array"
                />
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "2darray"}
                    label="2D Array"
                    value="2darray"
                />
                {/* <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "graph"}
                    label="Graph"
                    value="graph"
                />
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "tree"}
                    label="Tree"
                    value="tree"
                />
                <RadioButtonTypeOption
                    onChangeHandler={handleParameterOutputTypeChange}
                    checked={testcaseParameter.parameterType === "classUsage"}
                    label="Class Usage"
                    value="classUsage"
                /> */}
            </ul>

            {['array', '2darray'].includes(testcaseParameter.parameterType) &&
                <>
                    <br />
                    <p className="text-sm font-semibold mb-2">Array data type</p>
                    <ul className={styles.radioInputGroup}>
                        <RadioButtonTypeOption
                            onChangeHandler={handleParameterOutputArrayTypeChange}
                            checked={testcaseParameter.parameterArrayType === "number"}
                            label="Number"
                            value="number"
                        />
                        <RadioButtonTypeOption
                            onChangeHandler={handleParameterOutputArrayTypeChange}
                            checked={testcaseParameter.parameterArrayType === "string"}
                            label="String"
                            value="string"
                        />
                        <RadioButtonTypeOption
                            onChangeHandler={handleParameterOutputArrayTypeChange}
                            checked={testcaseParameter.parameterArrayType === "boolean"}
                            label="Boolean"
                            value="boolean"
                        />
                    </ul>
                </>
            }
            <br />
            {testcaseParameter.parameterType === 'array' &&
                <>
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension1OptionLengthChange}
                        checked={testcaseParameter.arrayDimension1OptionLength === 'fixed'}
                        label="Array Fixed Length"
                        value="fixed"
                    />
                    {testcaseParameter.arrayDimension1OptionLength === 'fixed' &&
                        <InputNumberField
                            onChange={handleArrayDimension1LengthChange}
                            label="Length"
                            min={1}
                            max={100000}
                            step={"1"}
                            value={`${testcaseParameter.arrayDimension1Length}`}
                        />
                    }
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension1OptionLengthChange}
                        checked={testcaseParameter.arrayDimension1OptionLength === 'random'}
                        label="Array Random Length"
                        value="random"
                    />
                    {testcaseParameter.arrayDimension1OptionLength === 'random' &&
                        <>
                            <InputNumberField
                                onChange={handleArrayDimension1MinLengthChange}
                                label="Minimum Length"
                                min={1}
                                max={100000}
                                step={"1"}
                                value={`${testcaseParameter.arrayDimension1RandomMinLength}`}
                            />
                            <InputNumberField
                                onChange={handleArrayDimension1MaxLengthChange}
                                label="Maximum Length"
                                min={1}
                                max={100000}
                                step={"1"}
                                value={`${testcaseParameter.arrayDimension1RandomMaxLength}`}
                            />
                        </>
                    }
                </>
            }

            {testcaseParameter.parameterType === '2darray' &&
                <>
                    <label className="mr-2 text-sm font-medium underline text-gray-900">Dimension 1</label>
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension1OptionLengthChange}
                        checked={testcaseParameter.arrayDimension1OptionLength === 'fixed'}
                        label="Array Dimension 1 Fixed Length"
                        value="fixed"
                    />
                    {testcaseParameter.arrayDimension1OptionLength === 'fixed' &&
                        <InputNumberField
                            onChange={handleArrayDimension1LengthChange}
                            label="Length"
                            min={1}
                            max={10000}
                            step={"1"}
                            value={`${testcaseParameter.arrayDimension1Length}`}
                        />
                    }
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension1OptionLengthChange}
                        checked={testcaseParameter.arrayDimension1OptionLength === 'random'}
                        label="Array Dimension 1 Random Length"
                        value="random"
                    />
                    {testcaseParameter.arrayDimension1OptionLength === 'random' &&
                        <>
                            <InputNumberField
                                onChange={handleArrayDimension1MinLengthChange}
                                label="Minimum Length"
                                min={1}
                                max={10000}
                                step={"1"}
                                value={`${testcaseParameter.arrayDimension1RandomMinLength}`}
                            />
                            <InputNumberField
                                onChange={handleArrayDimension1MaxLengthChange}
                                label="Maximum Length"
                                min={1}
                                max={10000}
                                step={"1"}
                                value={`${testcaseParameter.arrayDimension1RandomMaxLength}`}
                            />
                        </>
                    }
                    <label className="mr-2 text-sm font-medium underline text-gray-900">Dimension 2</label>
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension2OptionLengthChange}
                        checked={testcaseParameter.arrayDimension2OptionLength === 'matchDimension1'}
                        label="Array Dimension 2 match Dimension 1 Length"
                        value="matchDimension1"
                    />
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension2OptionLengthChange}
                        checked={testcaseParameter.arrayDimension2OptionLength === 'fixed'}
                        label="Array Dimension 2 Fixed Length"
                        value="fixed"
                    />
                    {testcaseParameter.arrayDimension2OptionLength === 'fixed' &&
                        <InputNumberField
                            onChange={handleArrayDimension2LengthChange}
                            label="Length"
                            min={1}
                            max={10000}
                            step={"1"}
                            value={`${testcaseParameter.arrayDimension2Length}`}
                        />
                    }
                    <RadioButtonFieldOption
                        onChangeHandler={handleArrayDimension2OptionLengthChange}
                        checked={testcaseParameter.arrayDimension2OptionLength === 'random'}
                        label="Array Dimension 2 Random Length"
                        value="random"
                    />
                    {testcaseParameter.arrayDimension2OptionLength === 'random' &&
                        <>
                            <InputNumberField
                                onChange={handleArrayDimension2MinLengthChange}
                                label="Minimum Length"
                                min={1}
                                max={10000}
                                step={"1"}
                                value={`${testcaseParameter.arrayDimension2RandomMinLength}`}
                            />
                            <InputNumberField
                                onChange={handleArrayDimension2MaxLengthChange}
                                label="Maximum Length"
                                min={1}
                                max={10000}
                                step={"1"}
                                value={`${testcaseParameter.arrayDimension2RandomMaxLength}`}
                            />
                        </>
                    }
                </>
            }

            {(testcaseParameter.parameterType === 'number' ||
             (['array', '2darray'].includes(testcaseParameter.parameterType) && testcaseParameter.parameterArrayType === 'number')) &&
                <>
                    <CheckboxField
                        onChangeHandler={handleNumberOptionIncludeDecimalChange}
                        checked={testcaseParameter.numberOptionIncludeDecimal}
                        label="Include decimal numbers"
                    />
                    <RadioButtonFieldOption
                        onChangeHandler={handleNumberTypeChange}
                        checked={testcaseParameter.numberType === 'rangeWithExclude'}
                        label="Number Range"
                        value="rangeWithExclude"
                    />
                    {testcaseParameter.numberType === 'rangeWithExclude' &&
                        <>
                            <InputNumberField
                                onChange={handleNumberMinValueInputChange}
                                label="Minimum Value"
                                min={-1_000_000_000_000_000}
                                max={1_000_000_000_000_000}
                                step={testcaseParameter.numberOptionIncludeDecimal ? "any" : "1"}
                                value={numberMinValueInput}
                            />
                            <InputNumberField
                                onChange={handleNumberMaxValueInputChange}
                                label="Maximum Value"
                                min={-1_000_000_000_000_000}
                                max={1_000_000_000_000_000}
                                step={testcaseParameter.numberOptionIncludeDecimal ? "any" : "1"}
                                value={numberMaxValueInput}
                            />
                            <InputTextField
                                onChangeHandler={handleNumberExcludeValuesChange}
                                disabled={testcaseParameter.numberOptionIncludeDecimal}
                                label="Exclude Values (comma separated)"
                            />
                        </>
                    }
                    <RadioButtonFieldOption
                        onChangeHandler={handleNumberTypeChange}
                        checked={testcaseParameter.numberType === 'valuesToInclude'}
                        label="Number Values"
                        value="valuesToInclude"
                    />
                    {testcaseParameter.numberType === 'valuesToInclude' &&
                        <>
                            <InputTextField
                                onChangeHandler={handleNumberIncludeValuesChange}
                                label="Include Values (comma separated)"
                            />
                        </>
                    }
                </>
            }

            {(testcaseParameter.parameterType === 'string' ||
             (['array', '2darray'].includes(testcaseParameter.parameterType) && testcaseParameter.parameterArrayType === 'string')) &&
                <>
                    <RadioButtonFieldOption
                        onChangeHandler={handleStringOptionLengthChange}
                        checked={testcaseParameter.stringOptionLength === 'fixed'}
                        label="String Fixed Length"
                        value="fixed"
                    />
                    {testcaseParameter.stringOptionLength === 'fixed' &&
                        <InputNumberField
                            onChange={handleStringLengthChange}
                            label="Length"
                            min={1}
                            max={100000}
                            step={"1"}
                            value={`${testcaseParameter.stringLength}`}
                        />
                    }
                    <RadioButtonFieldOption
                        onChangeHandler={handleStringOptionLengthChange}
                        checked={testcaseParameter.stringOptionLength === 'random'}
                        label="String Random Length"
                        value="random"
                    />
                    {testcaseParameter.stringOptionLength === 'random' &&
                        <>
                            <InputNumberField
                                onChange={handleStringRandomMinLengthChange}
                                label="Minimum Length"
                                min={1}
                                max={100000}
                                step={"1"}
                                value={`${testcaseParameter.stringRandomMinLength}`}
                            />
                            <InputNumberField
                                onChange={handleStringRandomMaxLengthChange}
                                label="Maximum Length"
                                min={1}
                                max={100000}
                                step={"1"}
                                value={`${testcaseParameter.stringRandomMaxLength}`}
                            />
                        </>
                    }
                    <label className="mr-2 text-sm font-medium underline text-gray-900">Character Options</label>
                    <CheckboxField
                        onChangeHandler={handleStringIncludeLowercaseChange}
                        checked={testcaseParameter.stringIncludeLowercase}
                        label="Include lowercase characters (a-z)"
                    />
                    <CheckboxField
                        onChangeHandler={handleStringIncludeUppercaseChange}
                        checked={testcaseParameter.stringIncludeUppercase}
                        label="Include uppercase characters (A-Z)"
                    />
                    <CheckboxField
                        onChangeHandler={handleStringIncludeNumbersChange}
                        checked={testcaseParameter.stringIncludeDigits}
                        label="Include digits (0-9)"
                    />
                    <CheckboxField
                        onChangeHandler={handleStringIncludeCustomCharactersChange}
                        checked={testcaseParameter.stringIncludeCustomCharacters}
                        label="Include custom characters"
                    />
                    {testcaseParameter.stringIncludeCustomCharacters &&
                        <InputTextField
                            onChangeHandler={handleStringCustomCharactersChange}
                            label="Custom characters"
                        />
                    }
                    <label className="mr-2 text-sm font-medium underline text-gray-900">String Options</label>
                    <CheckboxField
                        onChangeHandler={handleStringGeneratePalindromeChange}
                        checked={testcaseParameter.stringGeneratePalindrome}
                        label="Generate palindrome"
                    />
                </>
            }
        </div>
    )
}


export default TestcaseInputParameter
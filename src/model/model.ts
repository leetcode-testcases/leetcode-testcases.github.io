import type React from 'react'

export type ParameterType = 'string' | 'number' | 'boolean' | 'array' | '2darray' | 'graph' | 'tree' | 'classUsage'
export type ParameterArrayType = 'string' | 'number' | 'boolean'
export type ArrayNumberSorting = 'none' | 'ascending' | 'descending'
export type NumberType = 'rangeWithExclude' | 'valuesToInclude'
export type OptionLength = 'fixed' | 'random'
export type ArrayDimension2Length = 'matchDimension1' | OptionLength

export type CheckboxFieldProps = {
    checked: boolean
    disabled?: boolean
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
    label: string
    title?: string
}

export type InputNumberFieldProps = {
    disabled?: boolean
    label: string
    min?: number
    max?: number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    step: string
    value?: string
}

export type InputTextFieldProps = {
    disabled?: boolean
    label: string
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
}

export type RadioButtonOptionProps = {
    disabled?: boolean
    checked: boolean
    label: string
    value: string
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
}

export type SelectFieldProps = {
    disabled?: boolean
    label: string
    value: string
    onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>
    children: React.ReactNode
}

export type TestcaseParameter = {
    parameterType: ParameterType
    parameterArrayType: ParameterArrayType
    numberType: NumberType
    numberOptionIncludeDecimal: boolean
    numberMinValue: number
    numberMaxValue: number
    numberExcludeValues: number[]
    numberIncludeValues: number[]
    stringOptionLength: OptionLength
    stringLength: number
    stringRandomMinLength: number
    stringRandomMaxLength: number
    stringIncludeUppercase: boolean
    stringIncludeLowercase: boolean
    stringIncludeDigits: boolean
    stringIncludeCustomCharacters: boolean
    stringCustomCharacters: string[]
    stringGeneratePalindrome: boolean
    arrayDimension1OptionLength: OptionLength
    arrayDimension1Length: number
    arrayDimension1RandomMinLength: number
    arrayDimension1RandomMaxLength: number
    arrayDimension2OptionLength: ArrayDimension2Length
    arrayDimension2Length: number
    arrayDimension2RandomMinLength: number
    arrayDimension2RandomMaxLength: number
    arrayNumberSorting: ArrayNumberSorting
    arrayNumberUnique: boolean
}


export type TestcaseInputParameterProps = {
    testcaseParameter: TestcaseParameter
    parameterNumber: number
    setParameter: (index: number, testcaseParameter: TestcaseParameter) => void
    removeParameter: (index: number) => void
}


export type TestcaseInputParametersProps = {
    parameters: TestcaseParameter[]
    addParameter: () => void
    removeAllParameters: () => void
    removeParameter: (index: number) => void
    setParameter: (index: number, newParameter: TestcaseParameter) => void
}


export type TestcaseOutputProps = {
    parameters: TestcaseParameter[]
}

import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TestcaseInputParameters from './components/TestcaseInputParameters'
import TestcaseOutput from './components/TestcaseOutput'
import type { TestcaseParameter } from './model/model'


function App() {
    const [parameters, setParameters] = useState<TestcaseParameter[]>([]);

    const addParameter = () => {
        if (parameters.length < 10) {
            setParameters((currParameters) => {
                return [...currParameters, {
                    parameterType: 'number',
                    parameterArrayType: 'number',
                    arrayDimension1OptionLength: 'fixed',
                    arrayDimension1Length: 10,
                    arrayDimension1RandomMinLength: 10,
                    arrayDimension1RandomMaxLength: 20,
                    arrayDimension2OptionLength: 'fixed',
                    arrayDimension2Length: 10,
                    arrayDimension2RandomMinLength: 10,
                    arrayDimension2RandomMaxLength: 20,
                    numberType: 'rangeWithExclude',
                    numberOptionIncludeDecimal: false,
                    numberMinValue: 0,
                    numberMaxValue: 10000,
                    numberExcludeValues: [],
                    numberIncludeValues: [],
                    arrayNumberSorting: 'none',
                    arrayNumberUnique: false,
                    stringOptionLength: 'fixed',
                    stringLength: 10,
                    stringRandomMinLength: 10,
                    stringRandomMaxLength: 20,
                    stringIncludeUppercase: false,
                    stringIncludeLowercase: true,
                    stringIncludeDigits: false,
                    stringIncludeCustomCharacters: false,
                    stringCustomCharacters: [],
                    stringGeneratePalindrome: false
                }];
            })
        }
    };

    const setParameter = (index: number, newParameter: TestcaseParameter) => {
        setParameters((currParameters) => {
            return currParameters.map((testcaseParameter, i) => {
                if (i == index) {
                    return newParameter
                } else {
                    return testcaseParameter
                }
            });
        })
    };

    const removeParameter = (index: number) => {
        setParameters((currParameters) => {
            return currParameters.filter((_, i) => i !== index)
        })
    };

    const removeAllParameters = () => {
        setParameters(() => {
            return []
        })
    }

    return (
        <>
            <div className="relative min-h-full">
                <Navbar />
                <div className="px-8 pt-4 pb-68">
                    <TestcaseInputParameters
                        addParameter={addParameter}
                        removeAllParameters={removeAllParameters}
                        removeParameter={removeParameter}
                        setParameter={setParameter}
                        parameters={parameters}
                    />
                </div>
                <footer className="fixed bottom-0 w-full h-64 border-t border-t-gray-500 bg-white">
                    <div className="px-8 py-4">
                        <TestcaseOutput
                            parameters={parameters}
                        />
                    </div>
                </footer>
            </div>
        </>
    )
}

export default App

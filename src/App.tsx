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
                    stringOptionLength: 'fixed',
                    stringLength: 10,
                    stringRandomMinLength: 10,
                    stringRandomMaxLength: 20,
                    stringIncludeUppercase: false,
                    stringIncludeLowercase: true,
                    stringIncludeDigits: false,
                    stringIncludeCustomCharacters: false,
                    stringCustomCharacters: []
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

    //fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600

    return (
        <>
            <div className="relative min-h-full">
                <Navbar />
                <div className="px-8 py-4">
                    <TestcaseInputParameters
                        addParameter={addParameter}
                        removeAllParameters={removeAllParameters}
                        removeParameter={removeParameter}
                        setParameter={setParameter}
                        parameters={parameters}
                    />
                </div>
                <footer className="sticky bottom-0 w-full bg-white">
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


import { useId, useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';

import type { TestcaseOutputProps } from '../model/model';
import { generateTestcase } from '../util/testcase';

import styles from './TestcaseOutput.module.css'


function TestcaseOutput({ parameters }: TestcaseOutputProps) {
    const [testcaseOutputString, setTestcaseOutputString] = useState('')
    const [numTestcases, setNumTestcases] = useState(1)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isCopied, setIsCopied] = useState(false)

    const selectId = useId();

    const generateParametersHandler = () => {
        let testcaseLines: string[] = []
        setErrorMessage(null)
        setTestcaseOutputString('')

        try {
            for (let i = 0; i < numTestcases; i++) {
                testcaseLines.push(...generateTestcase(parameters))
            }

            setTestcaseOutputString(testcaseLines.join('\n'));
        } catch(error) {
            if (error instanceof Error) {
                setErrorMessage(error.toString())
            }
        }
    }

    const copyToClipboardHandler = () => {
        try {
            navigator.clipboard.writeText(testcaseOutputString)
            setIsCopied(true)

            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        } catch(error) {
            if (error instanceof Error) {
                console.error(`Failed to copy to clipboard, ${error.toString()}`)
            }
        }
    }

    const numTestcasesChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setNumTestcases(parseInt(event.target.value))
    }

    const disableGenerate = parameters.length === 0;

    return (
        <div className="border border-solid rounded shadow-lg p-2">
            <div className="flex items-center">
                <button disabled={disableGenerate} className={styles.generateParametersButton} onClick={generateParametersHandler} title={disableGenerate ? "Add at least 1 parameter" : "Generate testcases"}>Generate</button>
                <label htmlFor={selectId} className="mx-2 text-sm font-medium text-gray-900">Number of testcases</label>
                <select id={selectId} value={numTestcases} onChange={numTestcasesChangeHandler} className={styles.numParametersSelect}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                </select>
                <button disabled={testcaseOutputString.length === 0} className={styles.copyToClipboardButton} onClick={copyToClipboardHandler} title="Copy to clipboard">
                    {!isCopied &&
                        <span className="inline-flex items-center">
                            <svg className="w-3 h-3 me-1.5" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                            </svg>
                            <span className="text-xs font-semibold">Copy</span>
                        </span>
                    }
                    {isCopied &&
                        <span className="inline-flex items-center">
                            <svg className="w-3 h-3 text-green-700 me-1.5" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            <span className="text-xs text-green-700 font-semibold">Copied</span>
                        </span>
                    }

                </button>
            </div>
            {errorMessage &&
                <>
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p>{errorMessage}</p>
                    </div>
                    <br/>
                </>
            }

            <ReactCodeMirror value={testcaseOutputString} height="fit" maxHeight="10rem" theme="light" editable={false}></ReactCodeMirror>
        </div>
    )
}


export default TestcaseOutput

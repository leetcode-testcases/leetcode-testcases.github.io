
import type { TestcaseInputParametersProps } from '../model/model'
import TestcaseInputParameter from './TestcaseInputParameter'
import styles from './TestcaseInputParameters.module.css'

function TestcaseInputParameters({ parameters, addParameter, removeAllParameters, removeParameter, setParameter }: TestcaseInputParametersProps) {
    const addParameterHandler = () => {
        addParameter()
    }

    const removeAllParametersHandler = () => {
        removeAllParameters()
    }

    return (
        <>
            <div className="border border-solid rounded shadow-lg p-4">
                <h6 className="text-3xl font-semibold">Parameters</h6>
                <br />
                <button className={`${styles.addParameterButton} mr-1`} onClick={addParameterHandler} title={parameters.length < 10 ? 'Add parameter' : 'Max parameters reached (10)'} disabled={parameters.length < 10 ? false : true}>
                    <svg className="w-6 h-6" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>
                </button>
                <button className={`${styles.removeAllParametersButton} ml-1`} onClick={removeAllParametersHandler} title={'Remove all parameters'}>
                    <svg className="w-6 h-6" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                <br />
                <br />

                {parameters.length ? parameters.map((testcaseParameter, i) => <TestcaseInputParameter key={i} testcaseParameter={testcaseParameter} setParameter={setParameter} parameterNumber={i} removeParameter={removeParameter} />) : <p className="text-base text-gray-900 italic">No parameters added, please add at least 1 parameter before generating test cases.</p>}
            </div>
        </>
    )
}


export default TestcaseInputParameters

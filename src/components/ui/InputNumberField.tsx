
import { type InputNumberFieldProps } from '../../model/model'


function InputNumberField({ onChange, label, min, max, step, value }: InputNumberFieldProps) {
    return (
        <div className="my-2 ml-10 flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-900 w-64">{label}</label>
            <input
                type="number"
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                className="bg-gray-100 border w-64 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                value={value}
            />
        </div>
    )
}


export default InputNumberField

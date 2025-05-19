
import { useId } from 'react'
import { type InputTextFieldProps } from '../../model/model'


function InputTextField({ disabled, label, onChangeHandler }: InputTextFieldProps) {
    const id = useId()
    return (
        <div className="my-2 ml-10 flex items-center">
            <label htmlFor={id} className="mr-2 text-sm font-medium text-gray-900 w-64">{label}</label>
            <input
                id={id}
                type="text"
                disabled={disabled}
                onChange={onChangeHandler}
                className="bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:border-gray-500 border w-64 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
            />
        </div>
    )
}


export default InputTextField

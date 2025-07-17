
import { useId } from 'react'
import { type CheckboxFieldProps } from '../../model/model'
// import './CheckboxField.css'


function CheckboxField({ onChangeHandler, disabled, label, checked, title }: CheckboxFieldProps) {
    const id = useId()
    return (
        <div className="my-2 flex items-center">
            <input disabled={disabled} id={id} type="checkbox" onChange={onChangeHandler} checked={checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
            <label title={title} htmlFor={id} className="ms-2 text-sm font-medium text-gray-900">{label}</label>
        </div>
    )
}


export default CheckboxField

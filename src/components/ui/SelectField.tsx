



import { useId } from 'react'
import { type SelectFieldProps } from '../../model/model'
import styles from './SelectField.module.css'


function SelectField({ onChangeHandler, label, value, children }: SelectFieldProps) {
    const id = useId()
    return (
        <div className="my-2 ml-10 flex items-center">
            <label htmlFor={id} className="mr-2 text-sm font-medium text-gray-900 w-64">{label}</label>
            <select id={id} value={value} onChange={onChangeHandler} className={styles.select}>
                {children}
            </select>
        </div>
    )
}


export default SelectField

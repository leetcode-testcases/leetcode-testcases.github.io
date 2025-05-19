
import { useId } from 'react'
import { type RadioButtonOptionProps } from '../../model/model'
import styles from './RadioButtonFieldOption.module.css'


function RadioButtonFieldOption({ checked, onChangeHandler, label, value }: RadioButtonOptionProps) {
    const id = useId();
    return (
        <div className="w-full flex items-center">
            <input
                id={id}
                type="radio"
                value={value}
                className={styles.radioButtonInput}
                checked={checked}
                onChange={onChangeHandler}
            />
            <label htmlFor={id} className={styles.radioButtonLabel}>{label}</label>
        </div>
    )
}


export default RadioButtonFieldOption

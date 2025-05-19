
import { useId } from 'react'
import { type RadioButtonOptionProps } from '../../model/model'
import styles from './RadioButtonTypeOption.module.css'


function RadioButtonTypeOption({ checked, onChangeHandler, label, value }: RadioButtonOptionProps) {
    const id = useId()
    return (
        <li className={styles.radioButtonListItem}>
            <input
                id={id}
                type="radio"
                value={value}
                className={styles.radioButtonInput}
                checked={checked}
                onChange={onChangeHandler}
            />
            <label htmlFor={id} className={styles.radioButtonLabel}>{label}</label>
        </li>
    )
}


export default RadioButtonTypeOption

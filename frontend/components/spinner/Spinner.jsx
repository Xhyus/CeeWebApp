import React from 'react'
import { TailSpin } from  'react-loader-spinner'
import styles from './Spinner.module.css'

export default function Spinner() {
    return (
        <div className={styles.fondo}>
            <div className={styles.contenedorSpinner}>
                <TailSpin
                    height="150"
                    width="150"
                    color='#1B6AAA'
                    background='red'
                    ariaLabel='loading'
                />
            </div>
        </div>
    )
}

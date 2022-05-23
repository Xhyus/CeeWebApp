import React from 'react'
import styles from './Textarea.module.css'

const Textarea = ({ punto }) => {
  return (
    <>
      <p className={styles.tituloPunto}>{punto} </p>
      {/* <input className={styles.bloqueTexto} type="text" placeholder='Ingrese título del acta' /> */}
      <textarea className={styles.bloqueTexto} type="text" placeholder='Ingrese descripción del punto'></textarea>
    </>
  )
}
export default Textarea
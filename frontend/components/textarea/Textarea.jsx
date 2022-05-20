import React from 'react'
import styles from './Textarea.module.css'

const Textarea = ({punto, descripcion}) => {
  return (
    <>
      <div className={styles.Contenedor_input}>
        <p>{punto} </p>
        <textarea type="text" placeholder='Ingrese título del acta'>{descripcion}</textarea>
      </div>
    </>
  )
}
export default Textarea
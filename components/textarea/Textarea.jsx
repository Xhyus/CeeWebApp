import React, {useState} from 'react'
import styles from './Textarea.module.css'

const Textarea = ({ punto, index, onchange }) => {

  const [descripcion, setDescripcion] = useState('');

  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value)
  }

  const imprimirMensaje = () => {
    console.log("Bandera");
  }

  return (
    <>
      <p className={styles.tituloPunto}>{punto} </p>
      {/* <input className={styles.bloqueTexto} type="text" placeholder='Ingrese título del acta' /> */}
      <textarea className={styles.bloqueTexto} 
        name={index}
        onChange={handleChangeDescripcion}
        type="text" 
        placeholder='Ingrese descripción del punto'></textarea>
    </>
  )
}
export default Textarea
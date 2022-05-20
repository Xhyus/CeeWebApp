import React from 'react'
import styles from './actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea.jsx'
export default function actas_asambleas() {
    let testeo = [{
      punto: 'reunion paro',
      descripcion: 'Se reunieron para x motivo.'
    },
    {
      punto: 'reunion semana receso',
      descripcion: 'Se reunieron para discutir por el receso.'
    },
    {
      punto: 'reunion semana vacaciones',
      descripcion: 'Se reunieron para discutir por el cee que no hace nada.'
    },
  ]
  return (
    <>
      <div className={styles.Contenedor_principal}>
        <div className={styles.Contenedor_secundario}>
          <nav className={styles.Contenedor_titulo}>
            <h1 className={styles.Propiedades_texto}>Titulo</h1>
          </nav>
          <nav className={styles.Contenedor_contenido}>
            <div className={styles.Contenedor_input}>
              <p>Titulo del acta</p>
              <input type="text" placeholder='Ingrese título del acta'/>
            </div>
            {
              testeo.map((punto) => (
                <Textarea
                  punto = {punto.punto}
                  descripcion = {punto.descripcion}
                />
              ))
            }
            {/* Espacio para componente choto del nachoto */}
            <button className={styles.Boton}>Enviar</button>
          </nav>
        </div>
      </div>
    </>
  )
}

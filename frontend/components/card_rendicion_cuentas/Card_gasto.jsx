import React from 'react'
import styles from './card_gasto.module.css'
import Swal from 'sweetalert2'

const Card_Gasto = ({tipo_gasto, asunto_gasto, fecha_gasto, total_gasto}) => {

    const verDetalleGasto = () => {
        console.log("Abriendo detalle del gasto ...");

        Swal.fire({
            title: 'Asunto',
            text: 'Texto_prueba',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })

    }

    return (
        <div className = {styles.Card}>
            
            {/* .: ICONO GASTO / INGRESO :. */}
            <div className = {styles.Contenedor_icono}>
                <h2>{tipo_gasto}</h2>
            </div>

            {/* .: INFORMACIÓN DEL GASTO :. */}
            <div className = {styles.Contenedor_info_gasto}>
                <div className = {`${styles.Propiedades_asunto} ${styles.Propiedades_texto}`}>
                    <h2>{asunto_gasto}</h2>
                </div>

                <div className = {`${styles.Propiedades_fecha} ${styles.Propiedades_texto}`}>
                    <p>{fecha_gasto}</p>
                </div>
            </div>

            {/* .: TOTAL DEL GASTO y BOTON DETALLE :. */}
            <div className = {styles.Contenedor_total_detalle_gasto}>
            
                {/* .: TOTAL :. */}
                <h2 className = {`${styles.Propiedades_total_gasto} ${styles.Propiedades_texto}`}>CLP$ {total_gasto}</h2>

                {/* .: BOTON VER DETALLE */}
                <div className = {styles.Contenedor_boton_detalle}>
                    <button onClick={()=>{verDetalleGasto()}} className = {`${styles.Propiedades_boton_detalle} ${styles.Propiedades_texto}`}>Ver más</button>
                </div>

            </div>

        </div>
    )

}

export default Card_Gasto
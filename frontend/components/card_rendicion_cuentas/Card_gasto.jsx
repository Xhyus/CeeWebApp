import React from 'react'
import styles from './card_gasto.module.css'
import Swal from 'sweetalert2'

const Card_Gasto = ({datos_gasto}) => {

    const verDetalleGasto = () => {

        console.log("Abriendo detalle del gasto ...");
        Swal.fire({
            icon: 'info',
            title: datos_gasto.asunto,
            html: '<table width = "80%">' +
                    '<tr>' + 
                        '<th align = "left">Fecha:</th>' + 
                        '<td align = "right">' + datos_gasto.fecha + '</td>' + 
                    '</tr>' +
                    '<tr>' + 
                        '<th align = "left">Tipo:</th>' + 
                        '<td align = "right">' + datos_gasto.tipoGasto + '</td>' + 
                    '</tr>' +
                    '<tr>' + 
                        '<th align = "left">Detalle:</th>' + 
                        '<td align = "right">' + datos_gasto.detalle + '</td>' + 
                    '</tr>' +
                    '<tr>' + 
                        '<th align = "left">Total:</th>' + 
                        '<td align = "right">$' + datos_gasto.totalGastado + '</td>' + 
                    '</tr>' +
                '</table>' +
                //'<image src = "' + datos_gasto.imagen + '" width = "100%" height = "100%"></image>',
                '<image src = "http://webface.ubiobio.cl/wp-content/uploads/2019/01/face-ubb-02.png" width = "90%" height = "80%"></image>',
            confirmButtonText: 'Aceptar'
        })
    }
    return (
        <div className = {styles.contenedorCard}>
            {/* .: ICONO GASTO / INGRESO :. */}
            <div className = {styles.contenedorTipo}>
                <h2>{datos_gasto.tipoGasto}</h2>
            </div>
            {/* .: INFORMACIÓN DEL GASTO :. */}
            <div className = {styles.contenedorInfoGasto}>
                <div className = {`${styles.Propiedades_asunto} ${styles.Propiedades_texto}`}>
                    <h2>{datos_gasto.asunto}</h2>
                </div>
                <div className = {`${styles.Propiedades_fecha} ${styles.Propiedades_texto}`}>
                    <p>{datos_gasto.fecha}</p>
                </div>
            </div>
            {/* .: TOTAL DEL GASTO y BOTON DETALLE :. */}
            <div className = {styles.contenedorDetalleGasto}>
                {/* .: TOTAL :. */}
                <h2 className = {`${styles.Propiedades_total_gasto} ${styles.Propiedades_texto}`}>${datos_gasto.totalGastado}</h2>
                <button onClick={()=>{verDetalleGasto()}} className = {`${styles.propiedadesBoton} ${styles.Propiedades_texto}`}>Ver más</button>
            </div>
        </div>
    )
}

export default Card_Gasto
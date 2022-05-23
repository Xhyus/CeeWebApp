import React, { useState } from "react";
import styles from "./rendicion_cuentas.module.css";

export default function crear_gasto() {

    //* .: DATOS DEL GASTO :. *//
    const [datosGasto, setDatosGasto] = useState({
        asunto: '',
        total: '',
        tipo: '',
        fecha: '',
        detalle: '',
    })

    //! Instrucción temporal
    const [boletaGasto, setBoletaGasto] = useState("/carpeta/foto/boleta")

    //? Función para capturar cambios en los inputs.
    const handleInputChange = (event) => {

        setDatosGasto({

            ...datosGasto,
            [event.target.name] : event.target.value

        })

    }

    //? Función prueba para evaluar datos ingresados.
    const enviarDatos = () => {

        //? Bandera de información guardada.
        console.log("Asunto        : " + datosGasto.asunto);
        console.log("Total Gastado : " + datosGasto.total);
        console.log("Tipo Gasto    : " + datosGasto.tipo);
        console.log("Fecha Gasto   : " + datosGasto.fecha);
        console.log("Detalle       : " + datosGasto.detalle);
        console.log("Boleta        : " + boletaGasto + "\n");

        //* Enviar datos a la API.
        
    }

    return (

        //* .: CONTENEDOR PRINCIPAL :. *//
		<div className = {styles.Contenedor_principal}>

            {/* .: CONTENEDOR DEL FORMULARIO :. */}
            <div className = {styles.Contenedor_secundario}>
                
                {/* .: TITULO :. */}
				<div className = {styles.Contenedor_titulo}>
					<h1 className = {styles.Propiedades_texto}>Agregar gasto</h1>
				</div>

                <div className = {styles.Contenedor_contenido}>

                    {/* .: ASUNTO y TOTAL :. */}
                    <div className = {styles.Contenedor_asunto_total}>
                        
                        {/* Ingresar asunto del gasto */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Asunto</p>
                            <input type="text" name="asunto" onChange={handleInputChange} />
                        </div>

                        {/* Ingresar total del gasto */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Total</p>
                            <input type="number" name="total" onChange={handleInputChange} />
                        </div>
                        
                    </div>

                    {/* .: TIPO y FECHA :. */}
                    <div className = {styles.Contenedor_tipo_fecha}>
                        
                        {/* Ingresar tipo de gasto (Ingreso o gasto) */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Tipo</p>
                            <input type="text" name="tipo" onChange={handleInputChange} />
                        </div>

                        {/* Ingresar fecha en que se realizó el gasto */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Fecha</p>
                            <input type="text" name="fecha" onChange={handleInputChange} />
                        </div>

                    </div>

                    {/* .: DETALLE :. */}
                    <div className = {styles.Contenedor_detalle}>
                        <h3 className = {styles.Propiedades_texto}>Detalle</h3>
                        <input type="text" name="detalle" onChange={handleInputChange} />
                    </div>

                    {/* .: BOLETA :. */}
                    <div className = {styles.Contenedor_boleta}>
                        <h3 className = {styles.Propiedades_texto}>Boleta</h3>
                        <input type="file" name="boleta" onChange={handleInputChange} />
                    </div>

                    {/* .: ENVIAR :. */}
                    <div className = {styles.Contenedor_boton}>
                        <button className = {styles.Propiedades_texto} onClick = {() => enviarDatos()}>Enviar</button>
                    </div>

                </div>
                
            </div>

        </div>

    );

}
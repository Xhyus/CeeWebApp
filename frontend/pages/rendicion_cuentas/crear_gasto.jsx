import React from "react";
import styles from "./rendicion_cuentas.module.css";

export default function crear_gasto() {

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
                            <p>Asunto</p>
                        </div>

                        {/* Ingresar total del gasto */}
                        <div>
                            <p>Total</p>
                        </div>
                        
                    </div>

                    {/* .: TIPO y FECHA :. */}
                    <div className = {styles.Contenedor_tipo_fecha}>
                        
                        {/* Ingresar tipo de gasto (Ingreso o gasto) */}
                        <div>
                            <p>Tipo</p>
                        </div>

                        {/* Ingresar fecha en que se realizó el gasto */}
                        <div>
                            <p>Fecha</p>
                        </div>

                    </div>

                    {/* .: DETALLE :. */}
                    <div className = {styles.Contenedor_detalle}>
                        <h3>Detalle</h3>
                    </div>

                    {/* .: BOLETA :. */}
                    <div className = {styles.Contenedor_boleta}>
                        <h3>Boleta</h3>
                    </div>

                    {/* .: ENVIAR :. */}
                    <div className = {styles.Contenedor_boton}>
                        <h3>Enviar</h3>
                    </div>

                </div>
                
            </div>

        </div>

    );

}
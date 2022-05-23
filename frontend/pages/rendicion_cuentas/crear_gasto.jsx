import React, { useState } from "react";
import styles from "./rendicion_cuentas.module.css";

export default function crear_gasto() {

    //* .: DATOS DEL GASTO :. *//
    const [asunto, setAsunto] = useState('');
    const [totalGastado, setTotalGastado] = useState(0);
    const [tipoGasto, setTipoGasto] = useState('');
    const [fechaGasto, setFechaGasto] = useState('');
    const [detalle, setDetalle] = useState('');
    const [boleta, setBoleta] = useState('');

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
                            <input type="text" />
                        </div>

                        {/* Ingresar total del gasto */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Total</p>
                            <input type="number" />
                        </div>
                        
                    </div>

                    {/* .: TIPO y FECHA :. */}
                    <div className = {styles.Contenedor_tipo_fecha}>
                        
                        {/* Ingresar tipo de gasto (Ingreso o gasto) */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Tipo</p>
                            <input type="text" />
                        </div>

                        {/* Ingresar fecha en que se realizó el gasto */}
                        <div>
                            <p className = {styles.Propiedades_texto}>Fecha</p>
                            <input type="text" />
                        </div>

                    </div>

                    {/* .: DETALLE :. */}
                    <div className = {styles.Contenedor_detalle}>
                        <h3 className = {styles.Propiedades_texto}>Detalle</h3>
                        <input type="text" />
                    </div>

                    {/* .: BOLETA :. */}
                    <div className = {styles.Contenedor_boleta}>
                        <h3 className = {styles.Propiedades_texto}>Boleta</h3>
                        <input type="file" />
                    </div>

                    {/* .: ENVIAR :. */}
                    <div className = {styles.Contenedor_boton}>
                        <button className = {styles.Propiedades_texto}>Enviar</button>
                    </div>

                </div>
                
            </div>

        </div>

    );

}
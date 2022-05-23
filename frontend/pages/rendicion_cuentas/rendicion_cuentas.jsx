import React from "react";
import styles from "./rendicion_cuentas.module.css";
import Card_gasto from "../../components/card_rendicion_cuentas/Card_gasto";
import Filtro from "../../components/filtro/Filtro";
import { useEffect, useState } from "react";
import axios from "axios";

export default function rendicion_cuentas() {

	const [listaRendiciones, setListaRendiciones] = useState([]);

	useEffect( () => {

		console.log(".: Pantalla rendicion_cuentas :.");

		// Tipo de getRendicion por defecto 'rendiciones'
		(async () => getRendiciones("rendiciones"))();

	}, []);

	//* .: LISTAR GASTOS :. *//

	const getRendiciones = async (tipoGetRendiciones) => {
		try {			
			const response = await axios.get('http://localhost:3001/api/' + tipoGetRendiciones);

			// Estado: Ok
			if(response.status === 200) {
				setListaRendiciones(response.data);
				//console.log("Respuesta:\n" + response.data[0].asunto);
			}

		} catch (error) {
			console.log("Peticion: " + tipoGetRendiciones + "\nError: " + error);
		}
	}

	return (

		//* .: CONTENEDOR PRINCIPAL :. *//
		<div className = {styles.Contenedor_principal}>

			{/* .: CONTENEDOR DE GASTOS :. */}
			<div className = {styles.Contenedor_secundario}>

				{/* .: TITULO :. */}
				<div className = {styles.Contenedor_titulo}>
					<h1 className = {styles.Propiedades_texto}>Informe de gastos</h1>
				</div>

				<div className = {styles.Contenedor_contenido}>

					{/* .: FILTRO DE BÚSQUEDA :. */}
					<div className = {styles.Contenedor_crearGasto_filtro}>
						<button onClick={()=> {console.log("Dirigiendo a página 'crear_gasto'")}} className = {styles.Propiedades_boton}><a href="/rendicion_cuentas/crear_gasto">Agregar nuevo gasto</a></button>

						<div className = {styles.Contenedor_filtro}>
							<h2 className = {styles.Propiedades_texto}>Filtros</h2>

							{/* Opciones de filtro */}
							<div className = {styles.Propiedades_filtro}>

								<Filtro onClick={()=>{console.log("Presionaste el filtro")}} tipo='normal' />
								<Filtro tipo='normal' />
								<Filtro tipo='normal' />
								<Filtro tipo='fecha' />
								<Filtro tipo='fecha' />

							</div>

						</div>

					</div>

					{/* .: LISTA DE GASTOS :. */}
					<div className = {styles.Contenedor_card}>
						
						{
							listaRendiciones.map((gasto, index) => (
								<Card_gasto

									key = {index}
								
									tipo_gasto = {gasto.tipoGasto}
									asunto_gasto = {gasto.asunto}
									fecha_gasto = {gasto.fecha}
									total_gasto = {gasto.totalGastado}

								/>
							))
						}

					</div>

				</div>

			</div>

		</div>
	);
}

import React from "react";
import styles from "./rendicion_cuentas.module.css";
import Card_gasto from "../../components/card_rendicion_cuentas/Card_gasto";
import { useEffect, useState } from "react";
import axios from "axios";

export default function rendicion_cuentas() {

	const [listaRendiciones, setListaRendiciones] = useState([]);

	useEffect( () => {

		console.log(".: Pantalla rendicion_cuentas :.");

		(async () => getRendiciones())();

	}, []);

	//* .: OBTENER GASTOS :. *//
	const getRendiciones = async () => {

		try {
			
			const response = await axios.get('http://localhost:4000/api/rendiciones');

			// Estado: Ok
			if(response.status === 200) {

				setListaRendiciones(response.data);
				//console.log("Respuesta:\n" + response.data[0].asunto);

			}

		} catch (error) {
			
			console.log("Error: " + error);

		}

	}

	//* .: ABRIR PANTALLA "crear_gasto" :. *//
	const crearGasto = () => {
		console.log("Abriendo 'crear gasto' ...");

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
						<button onClick={()=> crearGasto()} className = {styles.Propiedades_boton}>Agregar nuevo gasto</button>

						<div className = {styles.Contenedor_filtro}>
							<h2 className = {styles.Propiedades_texto}>Filtros</h2>
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

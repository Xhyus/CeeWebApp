import React from "react";
import styles from "./rendicion_cuentas.module.css";
import Card_gasto from "../../components/card_rendicion_cuentas/Card_gasto";
import Filtro from "../../components/filtro/Filtro";
import { useEffect, useState } from "react";
import axios from "axios";

export default function rendicion_cuentas() {

	const [listaRendiciones, setListaRendiciones] = useState([]);
	const limiteFiltro = 2000;

	useEffect( () => {

		console.log(".: Pantalla rendicion_cuentas :.");

		(async () => getRendiciones())();

	}, []);

	//* .: OBTENER GASTOS :. *//
	const getRendiciones = async () => {

		try {
			
			const response = await axios.get('http://localhost:3001/api/rendiciones');

			// Estado: Ok
			if(response.status === 200) {

				setListaRendiciones(response.data);
				//console.log("Respuesta:\n" + response.data[0].asunto);

			}

		} catch (error) {
			
			console.log("Error: " + error);

		}

	}

	//* .: FILTRO DE GASTOS :. *//
	/* Esta función se encarga de filtrar los gastos que se
		mostraran por pantalla. Si cumple la condición retorna la
		información del gasto */
		
	const gastoRealizado = (index) => {

		if(parseInt(listaRendiciones[index].totalGastado, 10) <= limiteFiltro)  {
			
			return(

				<Card_gasto

					key = {index}
				
					tipo_gasto = {listaRendiciones[index].tipoGasto}
					asunto_gasto = {listaRendiciones[index].asunto}
					fecha_gasto = {listaRendiciones[index].fecha}
					total_gasto = {listaRendiciones[index].totalGastado}

				/>

			)
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

							{/* Opciones de filtro */}
							<div className = {styles.Propiedades_filtro}>

								<Filtro tipo='normal' />
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
								gastoRealizado(index)
							))
						}

					</div>

				</div>

			</div>

		</div>
	);
}

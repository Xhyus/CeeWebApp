import React from "react";
import styles from "../styles/rendicion_cuentas.module.css";
import Card_gasto from "../components/card_rendicion_cuentas/Card_gasto";
import Filtro from "../components/filtro/Filtro";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";

export default function rendicion_cuentas() {

	const [listaRendiciones, setListaRendiciones] = useState([]);

	useEffect(() => {

		console.log(".: Pantalla rendicion_cuentas :.");

		// Tipo de getRendicion por defecto 'rendiciones'
		(async () => getRendiciones("rendiciones"))();

	}, []);

	//* .: LISTAR GASTOS :. *//

	const getRendiciones = async (tipoGetRendiciones) => {
		try {
			const response = await axios.get(process.env.SERVIDOR + "/" + tipoGetRendiciones);

			// Estado: Ok
			if (response.status === 200) {
				setListaRendiciones(response.data);
				//console.log("Respuesta:\n" + response.data[0].asunto);
			}

		} catch (error) {
			console.log("Peticion: " + tipoGetRendiciones + "\nError: " + error);
		}
	}

	return (
		<>
			<Navbar />
			<div className={styles.fondo}>
				<div className={styles.contenedor}>
					<div className={styles.contenedorTitulo}>
						<h1>Informe de gastos</h1>
					</div>
					<div className={styles.contenedorInferior}>
						<div className={styles.contenedorSectorIzquierdo}>
							<button className={styles.Propiedades_boton} >Crear asamblea</button>
							<div className={styles.filtros}>
								<p className={styles.titulo_filtro}><strong>Filtro</strong></p>
								<div className={styles.ContainerFiltro}>

									<Filtro tipo='normal' />
									<Filtro tipo='normal' />
									<Filtro tipo='normal' />
									<Filtro tipo='fecha' />
									<Filtro tipo='fecha' />
								</div>
							</div>
						</div>
						<div className={styles.contenedorSectorDerecho}>
							{
								listaRendiciones.map((gasto, index) => (
									<Card_gasto
										key={index}
										tipo_gasto={gasto.tipoGasto}
										asunto_gasto={gasto.asunto}
										fecha_gasto={gasto.fecha}
										total_gasto={gasto.totalGastado}
									/>
								))
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)



	// <meter todo lo de dentro en tu jsx>
	// 	<div className = {styles.contenedorSectorIzquierdo}>
	// 								<button onClick={()=> {console.log("Dirigiendo a página 'crear_gasto'")}} className = {styles.Propiedades_boton }><a href="/rendicion_cuentas/crear_gasto">Agregar nuevo gasto</a></button>
	// 								<div className={styles.filtros}>
	// 									<p className={styles.titulo_filtro}><strong>Filtro</strong></p>
	// 									<div className={styles.ContainerFiltro}>
	// 										<Filtro tipo='normal' />
	// 										<Filtro tipo='normal' />
	// 										<Filtro tipo='normal' />
	// 										<Filtro tipo='fecha' />
	// 										<Filtro tipo='fecha' />
	// 									</div>
	// 								</div>
	// 						</div>

	// 						<div className = {styles.contenedorSectorDerecho}>
	// 								{
	// 									listaRendiciones.map((gasto, index) => (
	// 										<Card_gasto
	// 											key = {index}
	// 											tipo_gasto = {gasto.tipoGasto}
	// 											asunto_gasto = {gasto.asunto}
	// 											fecha_gasto = {gasto.fecha}
	// 											total_gasto = {gasto.totalGastado}
	// 										/>
	// 									))
	// 								}
	// 						</div>
	// </meter>


}

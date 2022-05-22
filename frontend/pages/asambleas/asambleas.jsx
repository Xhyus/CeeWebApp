import { useState, useEffect } from 'react'
import styles from './asambleas.module.css'
import Card from '../../components/card_asambleas/Card'
import axios from 'axios'
import Filtro from '../../components/filtro/Filtro'
import { FaPlus } from 'react-icons/fa'

export default function asambleas() {
	const [asambleasTerminadas, setAsambleasTerminadas] = useState([])
	const [asambleasPorRealizar, setAsambleasPorRealizar] = useState([])

	useEffect(() => {
		(async () => {
			getAsambleasTerminadas()
			getAsambleasPorRealizar()
		})();
	}, []);

	const getAsambleasTerminadas = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/asambleas/terminadas');
			if (response.status === 200) {
				setAsambleasTerminadas(response.data);
			}
		} catch (error) {
			console.log("Error: " + error);
		}
	}

	const getAsambleasPorRealizar = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/asambleas/porRealizar');
			if (response.status === 200) {
				setAsambleasPorRealizar(response.data);
			}
		} catch (error) {
			console.log("Error: " + error);
		}
	}

	return (
		<div className={styles.fondo}>
			<div className={styles.contenedor}>
				<div className={styles.contenedorSectorIzquierdo}>
					<button className={styles.Propiedades_boton} ><FaPlus />Crear asamblea</button>
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
					{asambleasTerminadas ? (
						<div className={styles.listaCards}>
							{asambleasPorRealizar.map((asamblea) => {
								return <Card asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} />
							})}
						</div>
					) : (<h1>No hay asambleas por realizar</h1>)}
					<div className={styles.listaCards}>
						{asambleasTerminadas.map((asamblea) => {
							return <Card asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} />
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

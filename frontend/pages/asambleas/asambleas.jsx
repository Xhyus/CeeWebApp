import { useState, useEffect } from 'react'
import styles from './asambleas.module.css'
import Card from '../../components/card_asambleas/Card'
import axios from 'axios'
import Filtro from '../../components/filtro/Filtro'
import { FaPlus } from 'react-icons/fa'

export default function asambleas() {
	const [asambleas, setAsambleas] = useState([])
	useEffect(() => {
		(async () => getAsambleas())();
	}, []);
	const getAsambleas = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/asambleas');
			if (response.status === 200) {
				setAsambleas(response.data);
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
					<div className={styles.listaCards}>
						{asambleas.map((asamblea) => {
							return <Card asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} hora={asamblea.hora} id={asamblea.id} number="2" />
						})}
					</div>
					<div className={styles.listaCards}>
						{asambleas.map((asamblea) => {
							return <Card asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} hora={asamblea.hora} id={asamblea.id} number="1" />
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

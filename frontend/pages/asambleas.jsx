import { useState, useEffect } from 'react'
import styles from '../styles/asambleas.module.css'
import Card from './../components/card_asambleas/Card'
import axios from 'axios'
import Filtro from './../components/filtro/Filtro'
import Navbar from '../components/navbar/Navbar'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode";


export default function asambleas() {
	const [asambleasTerminadas, setAsambleasTerminadas] = useState([])
	const [asambleasPorRealizar, setAsambleasPorRealizar] = useState([])
	const router = useRouter()

	useEffect(() => {
		(async () => {
			let carrera = isLogged()
			getAsambleasTerminadas(carrera)
			getAsambleasPorRealizar(carrera)
		})();

	}, []);

	const isLogged = () => {
		localStorage.removeItem('id_asamblea')
		localStorage.removeItem('pidAsamblea')
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
		let token = localStorage.getItem('token')
		let tokenDecoded = jwt_decode(token)
		return tokenDecoded.carrera
	}

	const getAsambleasTerminadas = async (carrera) => {
		try {
			const response = await axios.get(process.env.SERVIDOR + '/asambleas/terminadas/' + carrera);
			if (response.status === 200) {
				setAsambleasTerminadas(response.data);
			}
		} catch (error) {
			console.log("Error: " + error);
		}
	}

	const getAsambleasPorRealizar = async (carrera) => {
		try {
			const response = await axios.get(process.env.SERVIDOR + '/asambleas/noTerminadas/' + carrera);
			if (response.status === 200) {
				setAsambleasPorRealizar(response.data);
			}
		} catch (error) {
			console.log("Error: " + error);
		}
	}

	return (
		<>
			<Navbar />
			<div className={styles.fondo}>
				<div className={styles.contenedor}>
					<div className={styles.contenedorSectorIzquierdo}>
						<button className={styles.Propiedades_boton} ><FaPlus className={styles.Propiedades_icono} />Crear asamblea</button>
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
									return <Card asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="PorRealizar" />
								})}
							</div>
						) : (<h1>No hay asambleas por realizar</h1>)}
						<div className={styles.listaCards}>
							{asambleasTerminadas.map((asamblea) => {
								return <Card asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="Terminadas" />
							})}
						</div>
					</div>
				</div>
			</div>
		</>

	)
}
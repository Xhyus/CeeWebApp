import { useState, useEffect } from 'react'
import styles from '../styles/asambleas.module.css'
import Card from './../components/card_asambleas/Card'
import axios from 'axios'
import Navbar from '../components/navbar/Navbar'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Filtro from '../components/filtro_asambleas/Filtro'

export default function asambleas() {
	const [asambleasTerminadas, setAsambleasTerminadas] = useState([])
	const [asambleasPorRealizar, setAsambleasPorRealizar] = useState([])
	const router = useRouter()

	useEffect(() => {
		(async () => {
			isLogged()
			getAsambleas()
		})();
	}, []);

	const isLogged = () => {
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
	}

	const getAsambleas = async () => {
		// const token = localStorage.getItem('token')
		const carrera = localStorage.getItem('carrera')
		try {
			const response = await axios.get(`${process.env.SERVIDOR}/asambleas/${carrera}`)
			if (response.status === 200) {
				console.log(response.data.asambleasTerminadas)
				console.log(response.data.asambleasNoTerminadas)
				setAsambleasTerminadas(response.data.asambleasTerminadas)
				setAsambleasPorRealizar(response.data.asambleasNoTerminadas)
			}
		}
		catch (error) {
			console.log("Error: " + error)
		}
	}

	const Terminadas = () => {
		if (asambleasTerminadas.length > 0) {
			return (
				<div className={styles.listaCards}>
					{asambleasTerminadas.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="Terminadas" />
					})}
				</div>
			)
		} else {
			return (
				<h3>No hay asambleas terminadas</h3>
			)
		}
	}

	const PorRealizar = () => {
		if (asambleasPorRealizar.length > 0) {
			return (
				<div className={styles.listaCards}>
					{asambleasPorRealizar.map((asamblea, key) => {
						return <Card key={key} asunto={asamblea.asunto} fecha={asamblea.fecha} tipoAsamblea={asamblea.tipoAsamblea} id={asamblea._id} estado="PorRealizar" />
					})}
				</div>
			)
		} else {
			return (
				<h3>No hay asambleas por realizar</h3>
			)
		}
	}

	const crearAsamblea = () => {
		router.push('asambleas/crear')
	}

	return (
		<>
			<Navbar />
			<div className={styles.fondo}>
				<div className={styles.contenedor}>
					<div className={styles.contenedorSectorIzquierdo}>
						<button className={`${styles.Propiedades_boton} ${styles.crear}`} onClick={() => crearAsamblea()} ><FaPlus className={styles.Propiedades_icono} />Crear asamblea</button>
						<div className={styles.filtros}>
							<p className={styles.titulo_filtro}><strong>Filtro</strong></p>
							<div className={styles.ContainerFiltro}>
								<Filtro tipo='normal' />
							</div>
						</div>
					</div>
					<div className={styles.contenedorSectorDerecho}>
						<h1 className={styles.titulo}>Asambleas por realizar</h1>
						{PorRealizar()}
						{/* separation line */}
						<h1 className={styles.titulo}>Asambleas terminadas</h1>
						{Terminadas()}

					</div>
				</div>
			</div>
		</>

	)
}
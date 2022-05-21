import React, { useEffect, useState } from 'react'
import styles from './Card.module.css'
import { FaClock, FaTag, FaCalendarCheck } from 'react-icons/fa'

const Card = ({ asunto, fecha, id, tipoAsamblea, number }) => {
	const [estado, setEstado] = useState('')
	const [fechaFormateada, setFechaFormateada] = useState('')
	const [horaFormateada, setHoraFormateada] = useState('')
	const ahora = new Date()


	useEffect(() => {
		formateoFechaBD(fecha)
		setEstado(compararFechas(fecha, ahora))
	}, [])

	const formateoFechaBD = (fecha) => {
		let fechaBD = fecha.split('T')
		let fechaBD2 = fechaBD[0].split('-')
		let fechaBD3 = fechaBD2[2] + '/' + fechaBD2[1] + '/' + fechaBD2[0]
		let horaBD = fechaBD[1].split(':')
		let horaBD2 = horaBD[0] + ':' + horaBD[1]
		setFechaFormateada(fechaBD3)
		setHoraFormateada(horaBD2)
	}

	const compararFechas = (fecha, ahora) => {
		let fechaBD = fecha.split('T')
		let fechaBD2 = fechaBD[0].split('-')
		let fechaBD3 = fechaBD2[2] + '/' + fechaBD2[1] + '/' + fechaBD2[0]
		let horaBD = fechaBD[1].split(':')
		let horaBD2 = horaBD[0] + ':' + horaBD[1]
		let fechaBD4 = new Date(fechaBD3 + ' ' + horaBD2)
		let fechaBD5 = fechaBD4.getTime()
		let ahora2 = ahora.getTime()
		if (fechaBD5 < ahora2) {
			return true
		} else {
			return false
		}

	}

	const getEstadoAsamblea = () => {
		if (estado === true) {
			return (
				<nav className={styles.estadoTerminado}>
					<p className={styles.textoEstado}>Terminada</p>
					<FaTag style={{ color: "white" }} />
				</nav>
			)
		} else {
			return (
				<nav className={styles.estadoNoTerminado}>
					<p className={styles.textoEstado}>Por realizarse</p>
					<FaTag style={{ color: "white" }} />
				</nav>
			)
		}
	}

	return (
		<div className={styles.fondo}>
			<div className={styles.contenedorIzquierdo}>
				{getEstadoAsamblea(number)}
				<p className={`${styles.texto} ${styles.titulo}`}>{asunto}</p>
				{/* <p className={`${styles.texto} ${styles.titulo}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took</p> */}
				<p className={`${styles.texto} ${styles.tipoAsamblea}`}><strong>Tipo Asamblea: </strong>{tipoAsamblea}</p>
			</div>
			<div className={styles.contenedorDerecho}>
				<section className={styles.realizacion}>
					<div className={styles.fecha}>
						<FaCalendarCheck />
						<p className={`${styles.texto} ${styles.fecha}`}>{fechaFormateada}</p>
					</div>
					<div className={styles.ContenedorHora}>
						<FaClock />
						<p className={`${styles.texto} ${styles.fecha}`}>{horaFormateada}</p>
					</div>
				</section>
				<a className={styles.vermas} href=''>Ver más</a>
			</div>
		</div>
	)
}

export default Card
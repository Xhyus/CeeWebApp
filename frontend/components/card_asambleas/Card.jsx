import React, { useEffect, useState } from 'react'
import styles from './Card.module.css'
import { FaClock, FaTag, FaCalendarCheck } from 'react-icons/fa'
import { compararFechas, formateoFechaBD } from '../../utils/handleDates'
import { useRouter } from 'next/router'
import axios from 'axios'

const Card = ({ id, asunto, fecha, tipoAsamblea }) => {
	const [estado, setEstado] = useState('')
	const [format, setFormat] = useState('')
	const ahora = new Date()
	const tipoAsambleaUp = tipoAsamblea.charAt(0).toUpperCase() + tipoAsamblea.slice(1)
	const tituloAsambleaUp = asunto.charAt(0).toUpperCase() + asunto.slice(1)
	const router = useRouter()

	useEffect(() => {
		setFormat(formateoFechaBD(fecha))
		setEstado(compararFechas(fecha, ahora))
	}, [])

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

	const verAsamblea = (id) => {
		axios.get(`http://localhost:3001/api/asamblea/${id}`)
			.then(res => {
				router.push(`/asambleas/${id}`)
			})
			.catch(err => {
				router.push('404')
			})
	}

	return (
		<div className={styles.fondo}>
			<div className={styles.contenedorIzquierdo}>
				{getEstadoAsamblea()}
				<p className={`${styles.texto} ${styles.titulo}`}>{tituloAsambleaUp}</p>
				<p className={`${styles.texto} ${styles.tipoAsamblea}`}><strong>Tipo Asamblea: </strong>{tipoAsambleaUp}</p>
			</div>
			<div className={styles.contenedorDerecho}>
				<section className={styles.realizacion}>
					<div className={styles.contenedorFecha}>
						<FaCalendarCheck />
						<p className={`${styles.texto} ${styles.fecha}`}>{format.fecha}</p>
					</div>
					<div className={styles.ContenedorHora}>
						<FaClock />
						<p className={`${styles.texto} ${styles.fecha}`}>{format.hora}</p>
					</div>
				</section>
				<a className={styles.vermas} onClick={() => verAsamblea(id)}>Ver más</a>
			</div>
		</div>
	)
}

export default Card
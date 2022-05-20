import React from 'react'
import styles from './Card.module.css'
import { FaClock, FaTag } from 'react-icons/fa'

const Card = ({ asunto, fecha, hora, id, tipoAsamblea, number }) => {

	const getEstadoAsamblea = (number) => {
		if (number === "1") {
			return (
				<nav className={styles.estadoTerminado}>
					<p className={styles.textoEstado}>Terminada</p>
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
				{/* <p className={`${styles.texto} ${styles.titulo}`}>{asunto}</p> */}
				<p className={`${styles.texto} ${styles.titulo}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took</p>
				<p className={`${styles.texto} ${styles.tipoAsamblea}`}><strong>Tipo Asamblea: </strong>{tipoAsamblea}</p>
			</div>
			<div className={styles.contenedorDerecho}>
				<div className={styles.realizacion}>
					<p className={`${styles.texto} ${styles.fecha}`}>{fecha}</p>
					<div className={styles.ContenedorHora}>
						<FaClock />
						<p className={`${styles.texto} ${styles.fecha}`}>{hora}</p>
					</div>

				</div>
				<button className={styles.vermas}><a href=''>Ver más</a></button>
			</div>
		</div>
	)
}

export default Card
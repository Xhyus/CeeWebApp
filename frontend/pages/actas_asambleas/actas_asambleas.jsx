import React, { useEffect, useState } from 'react'
import styles from './actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea'
import { FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'

export default function actas_asambleas() {

	const [punto, setPunto] = useState([])
	const [asistencia, setAsistencia] = useState([])
	const [acta, setActa] = useState()
	const [asunto, setAsunto] = useState()
	const [descripcion, setDescripcion] = useState('')

	useEffect(() => {
		(async () => {
			obtenerPuntos('62887cbb6f9cba4180f42c19')
			crearActa()
		})();
	}, []);

	const obtenerPuntos = async (id) => {
		const response = await axios.get('http://localhost:3001/api/asamblea/' + id)
		setPunto(response.data)
		for (const [key, value] of Object.entries(response.data.puntos)) {
			setPunto(prevState => ({
				...prevState,
				[key]: value
			}))
		}
	}

	const crearActa = async () => {
		const data = {
			puntos: punto.puntos,
			asistencia: ['AAAAAAAAAAAAAAAAAAAAAAAA'],
		}
		await axios.post('http://localhost:3001/api/acta', data)
			.then(res => {
				console.log("acta: " + res.data.acta._id)
				setActa(res.data.acta._id)
			})
			.catch(err => {
				console.log(err)
			})
	}


	const enviarActa = (event) => {
		event.preventDefault();
		console.log(asamblea.asunto + ' ' + asamblea.puntos[1].asunto);
		// aca se hace el envio al backend
	}

	return (
		<>
			<div className={styles.fondo}>
				<div className={styles.contenedor}>
					<div className={styles.contenedorSuperior}>
						<div className={styles.contenedorTitulo}>
							<h1>Titulo de la asamblea</h1>
						</div>
						<div className={styles.contenedorIcono}>
							<FaPaperclip className={styles.iconoClip} />
						</div>
					</div>
					<div className={styles.contenedorFormulario}>
						<form className={styles.Form} onSubmit={enviarActa}>
							<div className={styles.contenedorInput}>
								<p>Título del acta:</p>
								<input type="text"
									placeholder='Ingrese título del acta'
									name="titulo"
								/>
							</div>

							<div className={styles.contenedorTextArea}>

							</div>

							<button type="submit" className={styles.boton}>Enviar <FiSend className={styles.iconoSend} /> </button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

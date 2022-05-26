import React, { useEffect, useState } from 'react'
import styles from '../../styles/actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea'
import Navbar from '../../components/navbar/Navbar'
import { FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'

export default function actas_asambleas() {

	const [punto, setPunto] = useState([])
	const [asistencia, setAsistencia] = useState([])
	const [acta, setActa] = useState()
	const [asunto, setAsunto] = useState()
	const [descripcion, setDescripcion] = useState('')


	const handleChangeDescripcion = (e) => {
		setDescripcion(e.target.value)
	}

	useEffect(() => {
		const obtenerPuntos = async (id) => {
			const response = await axios.get(process.env.SERVIDOR + '/asamblea/' + id)
			setPunto(response.data)
			const puntos = [...response.data.puntos]
			puntos.map(punto => {
				obtenerPunto(punto)
			})
		}
		obtenerPuntos('62887cbb6f9cba4180f42c19')
	}, []);

	const obtenerPunto = (id) => {
		axios.get(process.env.SERVIDOR + '/punto/' + id)
			.then(res => {
				console.log(res.data.asunto)
				setAsunto(res.data.asunto)
			})
	}


	const crearAsistencia = (id) => {
		const data = {
			nombre: asistencia.nombre,
			apellido: asistencia.apellido,
			rut: asistencia.rut,
			generacion: asistencia.generacion,
		}
		axios.post(process.env.SERVIDOR + '/asistencia/' + id, data)
			.then(res => {
				console.log(res)
			}
			)
			.catch(err => {
				console.log(err)
			}
			)
	}

	const asistenciaPrueba = [{
		_id: 'AAAAAAAAAAAAAAAAAAAAAAAA',
		nombre: 'Juan',
		apellido: 'Perez',
		rut: '12345678-9',
		generacion: 2020,
	},
	{
		_id: 'BBBBBBBBBBBBBBBBBBBBBB',
		nombre: 'Carlos',
		apellido: 'Pavez',
		rut: '12345678-9',
		generacion: 2019,
	},
	]

	const modificarPuntos = (id) => {
		const data = {
			descripcion: descripcion
		}
		axios.put(process.env.SERVIDOR + '/acta/update' / +id, data)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const crearActa = async () => {
		const data = {
			puntos: punto.puntos,
			asistencia: asistencia.asistencia,
		}
		await axios.post(process.env.SERVIDOR + '/acta', data)
			.then(res => {
				console.log("acta: " + res.data.acta._id)
				setActa(res.data.acta._id)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const modificarAsamblea = () => {
		const data = {
			acta: acta,
		}
		axios.put(process.env.SERVIDOR + '/asamblea/update/' + id, data)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const enviarActa = (event) => {
		event.preventDefault();
		modificarPuntos()
		// aca se hace el envio al backend
	}

	return (
		<>
			<Navbar />
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
								<p className={styles.textTitulo}>Título del acta:</p>
								<input type="text"
									className={styles.Input}
									placeholder='Ingrese título del acta'
									name="titulo"
								/>
							</div>
							<div className={styles.contenedorTextArea}>
								{/* {
										punto.puntos.map(punto => (
											<Textarea punto={asunto} onchange={handleChangeDescripcion} />
										))} */}
							</div>
							<button type="submit" className={styles.boton}>Enviar <FiSend className={styles.iconoSend} /> </button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

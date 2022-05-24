import React, { useEffect, useState } from 'react'
import styles from '../../styles/actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea'
import { FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function actas_asambleas({ idAsamblea }) {
	idAsamblea = '62887cbb6f9cba4180f42c19';
	const [punto, setPunto] = useState([])
	const [asistencia, setAsistencia] = useState([])
	const [acta, setActa] = useState()
	const [asunto, setAsunto] = useState()
	const [descripcion, setDescripcion] = useState('')
	const [idActa, setIdActa] = useState('')
	const router = useRouter()

	const handleChangeDescripcion = (e) => {
		setDescripcion(e.target.value)
	}

	const isLogged = () => {
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
	}

	useEffect(() => {
		isLogged()
		const obtenerPuntos = async (id) => {
			const response = await axios.get('http://localhost:3001/api/asamblea/' + id)
			setPunto(response.data)
			const puntos = [...response.data.puntos]
			puntos.map(punto => {
				obtenerPunto(punto)
			})
		}
		obtenerPuntos('62887cbb6f9cba4180f42c19')
	}, []);

	const obtenerPunto = (id) => {
		axios.get('http://localhost:3001/api/punto/' + id)
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
		axios.post('http://localhost:3001/api/asistencia/' + id, data)
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
		_id: '6289bcfdc5eaee5de4600531',
		nombre: 'Juan',
		apellido: 'Perez',
		rut: '12345678-9',
		generacion: 2020,
	},
	{
		_id: '62873ba908f53f066cfdc23c',
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
		axios.put('http://localhost:3001/api/punto/update/' + id, data)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
	"{"

	const crearActa = async (puntos, asistencia) => {
		let asistencia2 = asistencia.map(asistencia => {
			return asistencia._id
		})
		console.log("puntos dentro de crearActa: " + puntos)
		console.log("asistencia dentro de crearActa: " + asistencia2)
		const data = {
			puntos: puntos,
			asistencia: asistencia2
		}
		await axios.post('http://localhost:3001/api/acta', data)
			.then(res => {
				console.log("acta: " + res.data.acta._id)
				modificarAsamblea(res.data.acta._id)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const modificarAsamblea = (id) => {
		const data = {
			acta: id,
		}
		axios.put('http://localhost:3001/api/asamblea/update/' + idAsamblea, data)
			.then(res => {
				console.log(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const enviarActa = (event) => {
		event.preventDefault()
		const puntos = [...punto.puntos];
		puntos.map(punto => {
			modificarPuntos(punto)
		})
		crearActa(puntos, asistenciaPrueba)
		// console.log("envio de esta acta: " + acta.data._id)
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

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
	const [asamblea, setAsamblea] = useState()


	const handleChangeDescripcion = (e) => {
		setDescripcion(e.target.value)
	}

	useEffect(() => {
		const idAsamblea = localStorage.getItem('id_asamblea')
		const obtenerPuntos = async (id) => {
			const response = await axios.get('http://localhost:3001/api/asamblea/' + id)
			setPunto(response.data)
			const puntos = [...response.data.puntos]
			puntos.map(punto => {
				obtenerPunto(punto)
			})
		}
		setAsamblea(idAsamblea)
		obtenerPuntos(idAsamblea)
	}, []);


	const obtenerPunto = (id) => {
		axios.get('http://localhost:3001/api/punto/' + id)
			.then(res => {
				setAsunto(res.data.asunto)
			})
			.catch(err => {
				throw err
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
		axios.put('http://localhost:3001/api/punto/update/' + id, data)
			.then(res => {
				console.log("se modificaron los puntos")
			})
			.catch(err => {
				console.log("error al modificar los puntos")
			})
	}

	const crearActa = async () => {
		const data = {
			puntos: punto.puntos,
			asistencia: asistencia.asistencia,
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

	const modificarAsamblea = (id) => {
		const data = {
			acta: acta,
		}
		axios.put('http://localhost:3001/api/asamblea/update/' + id, data)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const enviarActa = (event) => {
		event.preventDefault()
		const puntos = [...punto.puntos];
		console.log(punto)
		puntos.map(punto => {
			console.log("punto: " + punto)
			modificarPuntos(punto)
		})
		crearActa(puntos, asistenciaPrueba)
		modificarAsamblea(asamblea)
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

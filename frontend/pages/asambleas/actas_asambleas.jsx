import React, { useEffect, useState } from 'react'
import styles from '../../styles/actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea'
import Navbar from '../../components/navbar/Navbar'
import { FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'

export default function actas_asambleas() {

	const [punto, setPunto] = useState([])
	// const [asistencia, setAsistencia] = useState([])
	const [asunto, setAsunto] = useState()
	const [descripcion, setDescripcion] = useState('')
	const [asamblea, setAsamblea] = useState()


	const handleChangeDescripcion = (e) => {
		setDescripcion(e.target.value)
	}

	useEffect(() => {
		const idAsamblea = localStorage.getItem('id_asamblea')
		const obtenerPuntos = async (id) => {
			const response = await axios.get(process.env.SERVIDOR + '/asamblea/' + id)
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
		axios.get(process.env.SERVIDOR + '/punto/' + id)
			.then(res => {
				setAsunto(res.data.asunto)
			})
			.catch(err => {
				console.log("error al obtener un solo punto")
			})
	}

	// const crearAsistencia = (id) => {
	// 	const data = {
	// 		nombre: asistencia.nombre,
	// 		apellido: asistencia.apellido,
	// 		rut: asistencia.rut,
	// 		generacion: asistencia.generacion,
	// 	}
	// axios.post(process.env.SERVIDOR + '/asistencia/' + id, data)
	// 		.then(res => {
	// 			console.log(res)
	// 		}
	// 		)
	// 		.catch(err => {
	// 			console.log(err)
	// 		}
	// 		)
	// }

	const asistenciaPrueba = [
		{
			_id: "6287375e1d98212c343c288c",
			nombre: "Ignacio",
			apellido: "Gonzalez",
			rut: "15.200.947-k",
			generacion: 2019,
		},
		{
			_id: "62873ba908f53f066cfdc23c",
			nombre: "Francisco",
			apellido: "Ojeda",
			rut: "19.533.298-3",
			generacion: 2017,
		},
		{
			_id: "6289bcfdc5eaee5de4600531",
			nombre: "Pablo",
			apellido: "Montoya",
			rut: "20.259.152-3",
			generacion: 2018,
		}
	]
	const modificarPuntos = (id) => {
		const data = {
			descripcion: descripcion
		}
		axios.put(process.env.SERVIDOR + '/acta/update' / +id, data)
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
			asistencia: asistenciaPrueba
		}
		await axios.post(process.env.SERVIDOR + '/acta', data)
			.then(res => {
				modificarAsamblea(asamblea, res.data.acta._id)
			})
			.catch(err => {
				console.log("error al crear acta")
			})
	}

	const modificarAsamblea = (id, acta) => {
		const data = {
			acta: acta,
		}
		axios.put(process.env.SERVIDOR + '/asamblea/update/' + id, data)
			.then(res => {
				console.log("Se modifico la asamblea")
			})
			.catch(err => {
				console.log("error al modificar la asamblea")
			})
	}

	const enviarActa = (event) => {
		event.preventDefault()
		const puntos = [...punto.puntos];
		puntos.map(punto => {
			modificarPuntos(punto)
		})
		crearActa(puntos, asistenciaPrueba)
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

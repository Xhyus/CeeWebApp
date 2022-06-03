import React, { useEffect, useState } from 'react'
import styles from '../../styles/actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea'
import Navbar from '../../components/navbar/Navbar'
import Spinner from '../../components/spinner/Spinner'
import { FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function actas_asambleas({ idAsamblea }) {
	
	//? Hooks para Spinner.
	const [cargandoInfo, setCargandoInfo] = useState(false);
	const [cargandoPuntos, setCargandoPuntos] = useState(false);

	const idAsambleaPRUEBA = '62887cab6f9cba4180f42c17';
	// const idAsambleaPRUEBA = '62887cbb6f9cba4180f42c19';
	// const idAsambleaPRUEBA = '6289c3fcc5eaee5de4600601';

	//? Hooks para el formulario.
	const [punto, setPunto] = useState([])
	// const [asistencia, setAsistencia] = useState([])
	const [asunto, setAsunto] = useState([])
	const listaAsuntos = [];
	const [descripcion, setDescripcion] = useState('')
	const [idActa, setIdActa] = useState('')
	const router = useRouter()
	const [asamblea, setAsamblea] = useState()

	const handleChangeDescripcion = (e) => {
		setDescripcion(e.target.value)
	}

	const isLogged = () => {
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
	}

	useEffect(() => {
		setCargandoInfo(true);

		isLogged()
		// const idAsamblea = localStorage.getItem('id_asamblea')
		
		const obtenerPuntos = async (id) => {
			setCargandoPuntos(true);

			const response = await axios.get(process.env.SERVIDOR + '/asamblea/' + id)
			const puntos = [...response.data.puntos]

			puntos.map(punto => {
				obtenerPunto(punto)
			})

			//console.log("Hook Punto: ", punto);
			console.log("Array Asunto: ", listaAsuntos)
			console.log("Hook Asunto: ", asunto)

			setCargandoPuntos(false);
		}

		setAsamblea(idAsamblea)
		obtenerPuntos(idAsambleaPRUEBA)

		setCargandoInfo(false);
	}, []);

	const obtenerPunto = async (id) => {

		try {
			const response = await axios.get(process.env.SERVIDOR + '/punto/' + id)
			
			listaAsuntos.push(response.data.asunto)
			setAsunto(listaAsuntos);
				
			setPunto(response.data);
			console.log("Hook Punto: ", punto);

		} catch(error) {
			console.log("error al obtener un solo punto")
		}

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

	const crearActa = async (puntos, asistencia) => {
		let asistencia2 = asistencia.map(asistencia => {
			return asistencia._id
		})
		console.log("puntos dentro de crearActa: " + puntos)
		console.log("asistencia dentro de crearActa: " + asistencia2)
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
			acta: id,
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

	if(cargandoInfo === true || cargandoPuntos === true) {
		<Spinner/>
	}
	else {

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
									{
										// asunto.map((punto, index) => (
										// 	<Textarea key={index} punto={punto} onchange={handleChangeDescripcion} />
										// ))

										asunto.map((punto, index) => (
											<Textarea key={index} punto={punto} onchange={handleChangeDescripcion} />
										))
									}
								</div>
								<button type="submit" className={styles.boton}>Enviar <FiSend className={styles.iconoSend} /> </button>
							</form>
						</div>
					</div>
				</div>
			</>
		)

	}
}

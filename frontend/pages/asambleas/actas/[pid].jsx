import React, { useEffect, useState } from 'react'
import styles from '../../../styles/actas_asambleas.module.css'
import Textarea from '../../../components/textarea/Textarea'
import Navbar from '../../../components/navbar/Navbar'
import Spinner from '../../../components/spinner/Spinner'
import { FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'
import { useRouter } from 'next/router'
import handleUpperCase from '../../../utils/handleUpperCase'

export default function actas_asambleas() {

	const router = useRouter()
	const { pid } = router.query
	const [count, setCount] = useState(0)

	//? Hooks para Spinner.
	const [cargandoInfo, setCargandoInfo] = useState(false);
	const [cargandoPuntos, setCargandoPuntos] = useState(false);

	//? Hooks para el formulario.
	const [puntoActa, setPuntoActa] = useState([{
		id: '',
		asunto: '',
		descripcion: '',
	}]);

	const [punto, setPunto] = useState([])
	const [asunto, setAsunto] = useState([])
	const listaAsuntos = [];
	const [descripcion, setDescripcion] = useState([])
	const [asamblea, setAsamblea] = useState()

	const handleChangeDescripcion = index => event => {
		setDescripcion(event.target.value)
		let actualizarDescripcion = [...puntoActa];
		actualizarDescripcion[index].descripcion = event.target.value;
		setPuntoActa(actualizarDescripcion);
	}

	const isLogged = () => {
		if (localStorage.getItem('token') === null) {
			router.push('/')
		}
	}

	useEffect(() => {
		isLogged()
		setCargandoInfo(true);
		const obtenerPuntos = async (id) => {
			setCargandoPuntos(true);
			try {
				const response = await axios.get(process.env.SERVIDOR + '/asamblea/' + id)
				const puntos = [...response.data.puntos]
				puntoActa.splice(0, 1);
				puntos.map(punto => {
					obtenerPunto(punto)
				})
				setCargandoPuntos(false);
			}
			catch (error) {
				console.log("Error al obtener los puntos")
			}
		}
		if (count === 1) {
			setAsamblea(pid)
			obtenerPuntos(pid)
			setCargandoInfo(false);
		} else {
			if (pid !== undefined) {
				setAsamblea(pid)
				obtenerPuntos(pid)
				setCargandoInfo(false);
			}
		}
	}, [pid]);

	console.log(asamblea)

	const obtenerPunto = async (id) => {

		try {
			const response = await axios.get(process.env.SERVIDOR + '/punto/search/' + id)
			//! PRUEBA PARA LLENAR HOOK PUNTO.
			setPuntoActa((prevState) => [...prevState, {
				id: id,
				asunto: response.data.asunto,
				descripcion: response.data.descripcion,
			}]);
			listaAsuntos.push(response.data.asunto)
			// setAsunto(listaAsuntos);
			setAsunto(handleUpperCase(localStorage.getItem('asunto')))
			setPunto(response.data);
			console.log("Hook Punto: ", punto);
		} catch (error) {
			console.log("error al obtener un solo punto")
		}

	}

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

	const enviarActa = () => {
		//? Actualizamos puntos mediante PUT.
		puntoActa.map(punto => {
			const data = {
				descripcion: punto.descripcion
			}
			axios.put(process.env.SERVIDOR + '/punto/update/' + punto.id, data)
				.then(res => {
					console.log("se modificaron los puntos")
				})
				.catch(err => {
					console.log("error al modificar los puntos")
				})
		})

		//? Bandera de información guardada.
		console.log("--------------------------------------");

		puntoActa.map(punto => {

			console.log("\nID: ", punto.id);
			console.log("ASUNTO: ", punto.asunto);
			console.log("DESCRIPCION: ", punto.descripcion);

		})
		console.log("--------------------------------------");
	}

	// if(cargandoInfo === true || cargandoPuntos === true) {
	// 	<Spinner/>
	// }
	// else {

	return (
		<>
			<Navbar />
			<div className={styles.fondo}>
				<div className={styles.contenedor}>
					<div className={styles.contenedorSuperior}>
						<div className={styles.contenedorTitulo}>
							<h1>{asunto}</h1>
						</div>
						{/* <div className={styles.contenedorIcono}>
							<FaPaperclip className={styles.iconoClip} />
						</div> */}
					</div>
					<div className={styles.contenedorFormulario}>
						<form className={styles.Form} onSubmit={enviarActa}>
							<div className={styles.contenedorTextArea}>
								{
									puntoActa.map((punto, index) => (
										<>
											<p>{punto.asunto} </p>
											<Textarea
												key={index}
												name={index}
												onChange={handleChangeDescripcion(index)}
												type="text"
												placeholder='Ingrese descripción del punto'>
												/</Textarea>
										</>
									))
								}
							</div>
							<button type="submit" className={styles.boton} onClick={() => enviarActa()}>Enviar <FiSend className={styles.iconoSend} /> </button>
						</form>
					</div>
				</div>
			</div>
		</>
	)

	// }
}

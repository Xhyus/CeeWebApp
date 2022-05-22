import React, {useState} from 'react'
import styles from './actas_asambleas.module.css'
import Textarea from '../../components/textarea/Textarea'
import {FaPaperclip} from 'react-icons/fa'
import {FiSend} from 'react-icons/fi'

export default function actas_asambleas() {

	const puntosAsambleas = ['Punto1','Punto2'];

	const [acta, setActa] = useState({
		titulo: '',
		punto: [],
	})

	const handleActa = (event) => {
		setActa({
			...acta,
			[event.target.name] : event.target.value
		})
	}

	const enviarActa = (event) => {
		event.preventDefault();
		console.log(acta.titulo + ' ' + acta.punto);
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
							<FaPaperclip className={styles.iconoClip}/>
						</div>
					</div>
					<div className={styles.contenedorFormulario}>
						<form className={styles.Form} onSubmit={enviarActa}>
							<div className={styles.contenedorInput}>
								<p>Título del acta:</p>
								<input  type="text"
										placeholder='Ingrese título del acta'
										name="titulo"
										onChange={handleActa}
								/>
							</div>

							<div className={styles.contenedorTextArea}>
								{
									puntosAsambleas.map((tema, index) =>(
										<Textarea punto={tema} key={index}/>
									))
								}
							</div>

							<button type="submit" className={styles.boton}>Enviar <FiSend className={styles.iconoSend}/> </button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

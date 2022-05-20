import React, { useState } from 'react'
import styles from './login/login.module.css'
import Button from '../components/button/button'
import { FaLock, FaUser } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleInputChangeCorreo = (event) => {
		setEmail(event.target.value)
		console.log(email)
	}

	const handleInputChangePassword = (event) => {
		setPassword(event.target.value)
		console.log(password)
	}

	const enviarDatos = () => {
		console.log(`Enviando datos Correo:${email} y Password:${password}`)
		validarLogin();
	}

	const validarLogin = async () => {
		axios.post('http://localhost:3001/api/usuario/verificacion', {
			email: email
		}).then(res => {
			console.log(res.status)
			if (res.status === 200) {
				console.log(res.data)
				alert('Usuario encontrado')
				validarPassword()
			} else {
				alert('Usuario no encontrado')
			}
		})

		const validarPassword = () => {

			axios.post('http://localhost:3001/api/usuario/validarPass', {
				email: email,
				password: password
			}).then(res => {
				console.log("valor validad password : " + res.status)
				if (res.status === 200) {
					alert('Contraseña correcta')
				} else {
					alert('Contraseña Incorrecta')
				}
			})
		}

	}

	return (
		<div id={styles.fondo}>
			<div className={styles.container}>
				<div className={styles.logo_u}>
					<img src="/logo-ubb-blanco.png" alt="ubb-logo" />
				</div>
				<div className={styles.login}>
					<div className={styles.form_login}>
						<nav className={styles.titulo}>
							<h1>Bienvenido a</h1>
							<h1>CEE WEB</h1>
							<h1>FACE</h1>
						</nav>
						<Button icon_button="Google" text="Continuar con Google" />
						<img src="/separador.svg" alt="ubb-logo" className={styles.separador} />

						<nav className={styles.icons}>
							<FaUser className={styles.iconInput} />
							<input type="email" placeholder="Ingrese su email" onChange={handleInputChangeCorreo} className={styles.propiedades_Input} />
						</nav>
						<nav className={styles.icons}>
							<FaLock className={styles.iconInput} />
							<input type="password" placeholder="Ingrese su contraseña" onChange={handleInputChangePassword} className={styles.propiedades_Input} />
						</nav>
						<Button icon_button="Lock" text="Ingresar" enviar={enviarDatos} />
						{/*
						<Button text="Loguear con google" />
						*/}
					</div>
				</div>
			</div>
		</div>
	)
}

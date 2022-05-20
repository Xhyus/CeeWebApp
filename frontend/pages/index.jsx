import React, { useState } from 'react'
import styles from './login/login.module.css'
import Input from '../components/input/Input'
import Button from '../components/button/button'
import { FaLock, FaUser } from "react-icons/fa"
import axios from 'axios'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [accion, SetAccion] = useState("Enviar")

	const handleInputChangeCorreo = (event) => {
		setCorreo(event.target.value)
	}

	const handleInputChangePassword = (event) => {
		setPassword(event.target.value)
	}

	const enviarDatos = () => {
		console.log(`Enviando datos Correo:${email} y Password:${password}`)
		validarLogin();
	}

	const validarLogin = async () => {
		const response = axios.post('http://localhost:3001/api/usuario/verificacion', {
			email,
			password
		})
		if (response.status === '200') {
			console.log('Login exitoso')
			alert("Login exitoso")
		} else {
			alert("Contraseña equivocada")
		}
		console.log(response)
	}


	return (
		<div id={styles.fondo}>
			<div className={styles.container}>
				<div className={styles.logo_u}>
					<img src="/logo-ubb-blanco.png" alt="ubb-logo" />
				</div>
				<div className={styles.login}>
					<form className={styles.form_login}>
						<nav className={styles.titulo}>
							<h1>Bienvenido a</h1>
							<h1>CEE WEB</h1>
							<h1>FACE</h1>
						</nav>
						<Button icon_button="Google" text="Continuar con Google" />
						<img src="/separador.svg" alt="ubb-logo" className={styles.separador} />

						<nav className={styles.icons}>
							<FaUser className={styles.iconInput} />
							<Input tipo_input="email" HandleChangeInput={handleInputChangeCorreo} placeholder_input="Ingrese su email" />
						</nav>
						<nav className={styles.icons}>
							<FaLock className={styles.iconInput} />
							<Input tipo_input="password" HandleChangeInput={handleInputChangePassword} enviar={enviarDatos} placeholder_input="Ingrese su contraseña" />
						</nav>
						<Button icon_button="Lock" text="Ingresar" />
						{/*
						<Button text="Loguear con google" />
						*/}
					</form>
				</div>
			</div>
		</div>
	)
}

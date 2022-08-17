import React, { useEffect, useState } from 'react'
import styles from '../styles/login.module.css'
import Button from '../components/button/Button'
import { FaLock, FaUser } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	useEffect(() => {
		localStorage.removeItem('token')
	}, []);

	const handleInputChangeCorreo = (event) => {
		setEmail(event.target.value)
	}

	const handleInputChangePassword = (event) => {
		setPassword(event.target.value)
	}

	const keyDownHandler = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			validarLogin();
		}
	};

	const validarLogin = async () => {
		const data = {
			email: email,
			password: password
		}
		try {
			const response = await axios.post(process.env.SERVIDOR + '/usuario/login', data);
			if (response.status === 200) {
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('carrera', response.data.carrera)
				router.push('/asambleas')
			}
		}
		catch (error) {
			console.log("Error: " + error);
			Swal.fire({
				title: 'Error',
				text: 'Usuario o contraseña incorrectos',
				icon: 'error',
				confirmButtonText: 'Aceptar',
				position: 'center'
			})
		}
	}

	return (
		<div className={styles.fondo}>
			<div className={styles.contenedor}>
				<div className={styles.contenedorLogo_u}>
					<img className={styles.logo_u} src="/logo-ubb-blanco.png" alt="ubb-logo" />
				</div>
				<div className={styles.contenedorLogin}>
					<div className={styles.formLogin}>
						<nav className={styles.contenedorTitulo}>
							<h1 className={styles.titulo}>Bienvenido a</h1>
							<h1 className={styles.titulo}>CEE WEB</h1>
							<h1 className={styles.titulo}>FACE</h1>
						</nav>
						<img src="/separador.svg" alt="ubb-logo" className={styles.separador} />
						<nav className={styles.contenedorInput}>
							<FaUser className={styles.iconInput} />
							<input type="email" autoComplete="new-password" placeholder="Ingrese su email" onKeyDown={keyDownHandler} onChange={handleInputChangeCorreo} className={styles.propiedadesInput} />
						</nav>
						<nav className={styles.contenedorInput}>
							<FaLock className={styles.iconInput} />
							<input type="password" autoComplete="new-password" placeholder="Ingrese su contraseña" onKeyDown={keyDownHandler} onChange={handleInputChangePassword} className={styles.propiedadesInput} />
						</nav>
						<Button icon_button="Lock" text="Ingresar" enviar={validarLogin} keyButton={keyDownHandler} />
					</div>
				</div>
			</div>
		</div>
	)
}
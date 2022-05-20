import React, { Fragment } from 'react'
import styles from './login.module.css'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { FaLock, FaUser} from "react-icons/fa"

export default function Login() {
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
							<FaUser className={styles.iconInput}/>
							<Input tipo_input="email" placeholder_input="Ingrese su email" />
						</nav>
						<nav className={styles.icons}>
							<FaLock className={styles.iconInput}/>
							<Input tipo_input="password" placeholder_input="Ingrese su contraseña" />
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

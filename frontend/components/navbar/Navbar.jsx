import React, { lazy, Suspense } from 'react';
import styles from './Navbar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Navbar = () => {
	const router = useRouter()
	const path = router.pathname.split('/')
	const currentPage = (boton) => {
		if (path[1] === 'asambleas' && boton === 'asambleas') {
			return (`${styles.contenedorLista} ${styles.active}`)
		}
		if (path[1] === 'rendicion_cuentas' && boton === 'rendicion_cuentas') {
			return (`${styles.contenedorLista} ${styles.active}`)
		}
	}
	return (
		<div className={styles.navbar}>
			<div className={styles.imagenNavbar}>
				<Image src='/logo-ubb-blanco.png' alt="logo" className={styles.logoubb} width={100} height={64} />
			</div>
			<div className={styles.contenedorLista}>
				<li className={styles.lista}>
					<ul className={currentPage('asambleas')}><a href='/asambleas'>Asambleas</a></ul>
					<ul className={currentPage('rendicion_cuentas')}><a href='/rendicion_cuentas'>Rendicion de Cuentas</a></ul>
					<ul className={styles.contenedorLista}><a href='/'>Cerrar Sesión</a></ul>
				</li>
			</div>
		</div>
	)
}
export default Navbar
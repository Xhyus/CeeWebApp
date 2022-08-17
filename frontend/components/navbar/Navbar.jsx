import React, {lazy, Suspense} from 'react';
import styles from './Navbar.module.css'
import Image from 'next/image'

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.imagenNavbar}>
				<Image src='/logo-ubb-blanco.png' alt="logo" className={styles.logoubb} width={100} height={64} />
			</div>
			<div className={styles.contenedorLista}>
				<li className={styles.lista}>
					<ul className={`${styles.contenedorLista} ${styles.active}`}><a href='/asambleas'>Asambleas</a></ul>
					<ul className={styles.contenedorLista}><a href='/rendicion_cuentas'>Rendición de Cuentas</a></ul>
					<ul className={styles.contenedorLista}><a href='/'>Cerrar Sesión</a></ul>
				</li>
			</div>
		</div>
	)
}
export default Navbar
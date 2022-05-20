import React from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
import bootstrap from 'react-bootstrap'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
    <div className={styles.imagen_navbar}>
      <Image src='/logo-ubb-blanco.png' alt="logo" className={styles.logoubb} width={100} height={64} />
    </div>
    <div className={styles.contenedor_lista}>
      <li className={styles.lista}>
        <ul className={styles.texto_lista}><a href='/'>Difusión</a></ul>
        <ul className={styles.texto_lista}><a href='/asambleas/asambleas'>Asambleas</a></ul>
        <ul className={styles.texto_lista}><a href='/'>Votaciones</a></ul>
        <ul className={styles.texto_lista}><a href='/rendicion_cuentas/rendicion_cuentas'>Rendicion de Cuentas</a></ul>
        <ul className={styles.texto_lista}><a href='/'>Documentos</a></ul>
        <ul className={styles.texto_lista2}><a href='/'>Cerrar Sesión</a></ul>
      </li>
    </div>
  </div>
  )
}
export default Navbar
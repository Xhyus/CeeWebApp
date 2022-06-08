import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/asambleas.module.css'
import Navbar from '../../components/navbar/Navbar'

const verAsamblea = () => {
    const router = useRouter()
    const { pid } = router.query

    return (
        <>
            <Navbar />
            <div className={styles.fondo}>
                <h1>{pid}</h1>
            </div>
        </>
    )
}

export default verAsamblea
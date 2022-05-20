import '../styles/globals.css'
import Navbar from '../components/navbar/Navbar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	return <>
		<Head>
			<title>CEE</title>
			<style>{`
				#__next {
					width: 100% !important;
					height: 100% !important;
				}
			`}</style>
		</Head>

		{/* <Navbar /> */}
		<Component {...pageProps} />
	</>
}

export default MyApp

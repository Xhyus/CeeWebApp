import '../styles/globals.css'
import Navbar from '../components/navbar/Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

	const router = useRouter()
	const useNavbar = () => {
		if (router.pathname == '/' || router.pathname == '' || router.pathname == '/404' || router.pathname == '/500') {
			return <>
				<Component {...pageProps} />
			</>
		} else {
			return <>
				<Navbar />
				<Component {...pageProps} />
			</>
		}
	}
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
		{useNavbar()}
	</>
}

export default MyApp

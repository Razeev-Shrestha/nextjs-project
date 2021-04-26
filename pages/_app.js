import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
	return (
		<Layout>
			<Head>
				<title>NextJs Events</title>
				<meta name='description' content='NextJs events' />
				<meta
					name='viewport'
					content='initial-scale=1.0,width=device-width'
				/>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp

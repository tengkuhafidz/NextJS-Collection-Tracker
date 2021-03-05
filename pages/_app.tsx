import {AppProps} from 'next/app'
import {redirectBasedOnAuthStatus} from '../utils/redirect'
import '../styles/globals.css'
import mixpanel from 'mixpanel-browser'
import getConfig from 'next/config'
import Head from 'next/head'

const {publicRuntimeConfig} = getConfig()

function MyApp({Component, pageProps}: AppProps) {
	return (
		<>
			<Head>
				<meta name="description" content="NAFAS Collection Tracker" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

MyApp.getInitialProps = async ({Component, ctx}) => {
	mixpanel.init(publicRuntimeConfig.MixpanelToken)
	let pageProps = {}

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx)
	}

	redirectBasedOnAuthStatus(ctx)

	return {
		pageProps,
	}
}

export default MyApp

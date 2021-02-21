import {AppProps} from 'next/app'
import {parseCookies} from 'nookies'
import '../styles/globals.css'
import {redirectBasedOnAuthStatus} from '../utils/redirect'

function MyApp({Component, pageProps}: AppProps) {
	return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({Component, ctx}) => {
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

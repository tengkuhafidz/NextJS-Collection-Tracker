import Head from 'next/head'

export default function Home() {
	return (
		<div>
			<Head>
				<title>NextJS Boilerplate</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Collection Tracker</h1>
				<input type="text" placeholder="Email / Username" />
				<input type="password" placeholder="Password" />
				<button>Login</button>
			</main>
		</div>
	)
}

import Head from 'next/head'

export default function Home() {
	return (
		<div>
			<Head>
				<title>NextJS Boilerplate</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="p-5">
				<h1 className="text-3xl font-bold text-center mt-32 mb-16">
					Collection Tracker
				</h1>
				<input
					type="text"
					placeholder="Email / Username"
					className="standard-input"
				/>
				<input
					type="password"
					placeholder="Password"
					className="standard-input"
				/>
				<button className="text-xl bg-black rounded-md text-white w-full p-3 mt-8">
					Login
				</button>
			</main>
		</div>
	)
}

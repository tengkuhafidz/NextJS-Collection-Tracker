import Link from 'next/link'

export default function Success() {
	return (
		<div>
			<div className="mt-32 p-8 text-center ">
				<h1 className="text-6xl font-semibold">Success!</h1>
				<p>Successfully recorded collection</p>
				<Link href="/">
					<button className="mt-16 text-xl bg-black rounded-md text-white w-full p-3">
						Back To Home
					</button>
				</Link>
			</div>
		</div>
	)
}

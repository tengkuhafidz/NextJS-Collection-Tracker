import QrReader from 'react-qr-reader'
import React from 'react'

const QrScanner = ({setCustomerId}) => (
	<div>
		<QrReader
			delay={300}
			onScan={data => setCustomerId(data)}
			onError={e => console.log(e)}
			className="mb-4 h-12"
		/>
	</div>
)

export default QrScanner

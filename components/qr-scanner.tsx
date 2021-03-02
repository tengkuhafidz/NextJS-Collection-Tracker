import QrReader from 'react-qr-reader'
import React from 'react'

const QrScanner = ({handleScan}) => (
	<div>
		<QrReader
			delay={300}
			onScan={data => handleScan(data)}
			onError={e => console.log(e)}
			style={{marginBottom: '12px'}}
		/>
	</div>
)

export default QrScanner

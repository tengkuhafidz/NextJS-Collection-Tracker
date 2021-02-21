import React from 'react'

export const ErrorBox = ({message}) => (
	<div className="bg-red-100 p-3 mt-4 text-center rounded-md">
		<p className="font-semibold text-red-800">{message}</p>
	</div>
)

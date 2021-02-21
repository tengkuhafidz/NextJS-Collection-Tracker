import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import * as StrapiService from '../services/strapi-services'

export default function Form() {
	const router = useRouter()
	const nric = router.query.nric as string
	const [beneficiary, setBeneficiary] = useState(null)
	const [collectionCountToday, setCollectionCountToday] = useState(0)
	const [maxCollectionCountToday, setMaxCollectionCountToday] = useState(0)

	useEffect(() => {
		async function fetchAndSetData() {
			const beneficiary = await StrapiService.getBeneficiary(nric)
			const collectionCount = await StrapiService.getBeneficiaryCollectionCountToday(
				nric,
			)
			const maxCollectionCount = await StrapiService.getMaxCollectionCount()

			setBeneficiary(beneficiary)
			setCollectionCountToday(collectionCount)
			setMaxCollectionCountToday(maxCollectionCount)
		}
		fetchAndSetData()
	}, [])

	if (!maxCollectionCountToday) {
		return null
	}

	return (
		<div>
			<main>
				<p>{beneficiary.nama}</p>
				<p>{collectionCountToday}</p>
				<p>{maxCollectionCountToday}</p>
			</main>
		</div>
	)
}

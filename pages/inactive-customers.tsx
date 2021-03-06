import moment from 'moment'
import Router from 'next/router'
import React, {useEffect, useState} from 'react'
import {InactiveCustomerCard} from '../components/inactive-customer-card'
import Layout from '../components/layout'
import * as StrapiServices from '../services/strapi-services'
import {CustomerActivenessMapping} from '../typings'

export default function InactiveCustomer() {
	const [inactiveCustomers, setInactiveCustomers] = useState([])

	useEffect(() => {
		async function fetchAndSetDate() {
			const customers = await StrapiServices.getAllCustomers()
			const customerActiveness = customers.map(customer =>
				customerActivenessMapping(customer),
			)
			const inactiveCustomersData: CustomerActivenessMapping[] = customerActiveness.filter(
				customer => customer.totalCollectionsInTwoWeeks < 10,
			)
			setInactiveCustomers(inactiveCustomersData)
		}
		fetchAndSetDate()
	}, [inactiveCustomers])

	const customerActivenessMapping = (customer): CustomerActivenessMapping => {
		const {id, name, collections} = customer

		if (collections.length < 1) {
			return {
				id,
				name,
				lastCollectedAt: null,
				totalCollections: 0,
				totalCollectionsInTwoWeeks: 0,
			}
		}

		const twoWeeksAgoDate = moment().subtract(14, 'days').format('YYYY-MM-DD')
		const totalCollections = collections.length
		const lastCollectedAt = collections[totalCollections - 1].created_at
		const totalCollectionsInTwoWeeks = collections.filter(
			collection => collection.created_at >= twoWeeksAgoDate,
		).length
		return {
			id,
			name,
			lastCollectedAt,
			totalCollections,
			totalCollectionsInTwoWeeks,
		}
	}

	const renderInactiveCustomerCard = () => {
		return inactiveCustomers.map(inactiveCustomer => (
			<InactiveCustomerCard inactiveCustomer={inactiveCustomer} />
		))
	}

	return (
		<Layout>
			<div>
				<p className="p-2 text-gray-500" onClick={() => Router.back()}>
					back
				</p>
			</div>
			<div className="my-8 p-4">
				<h1 className="text-center text-2xl font-semibold">
					Inactive Customers
				</h1>
				{renderInactiveCustomerCard()}
			</div>
		</Layout>
	)
}

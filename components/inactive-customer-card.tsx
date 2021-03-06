import moment from 'moment'
import {CustomerActivenessMapping} from '../typings'

interface Props {
	inactiveCustomer: CustomerActivenessMapping
}

export const InactiveCustomerCard = ({inactiveCustomer}: Props) => {
	const {
		id,
		name,
		totalCollectionsInTwoWeeks,
		lastCollectedAt,
	} = inactiveCustomer
	return (
		<div className="bg-gray-100 shadow-md p-3 mt-4 rounded-md">
			<p className="font-semibold text-gray-800">
				<span className="bg-black text-white px-2">#{id}</span> {name}
			</p>
			<div className="grids grid-col-2">
				<div>
					<p className="inline-block flex text-sm font-light">
						<span className="mr-1">2 weeks count: </span>
						{''}
						{totalCollectionsInTwoWeeks}
					</p>
				</div>
				<div>
					<p className="inline-block flex text-sm font-light">
						<span className="mr-1">last collected: </span>
						{moment(lastCollectedAt).format('D MMM YY')}
					</p>
				</div>
			</div>
		</div>
	)
}

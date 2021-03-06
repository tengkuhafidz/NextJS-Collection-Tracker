export interface LoginRequest {
	identifier: string
	password: string
}

export interface RecordCollectionRequest {
	units: number
	customer: string
	users_permissions_user: string
	lokasi: string
}

export interface CustomerActivenessMapping {
	id: number
	name: string
	lastCollectedAt: string
	totalCollections: number
	totalCollectionsInTwoWeeks: number
}

export interface Contacts {
	name?: string,
	surname?: string,
	phone?: string,
	email?: string
}
export interface Order {
	contacts?: Contacts
	products?: {
		pid: string,
		quantity: number
	}[]
	delivery?: 'delline' | 'post' | 'sdek',
	postOffice?: string,
	payment?: 'pickup' | 'card',
	comment?: string,
	extras?: string[],
	promocode?: string
}
export interface BulkOrder{
	contacts?: {
		name?: string,
		companyName?: string,
		phone?: string
	},
	product?: {
		sku?: string,
		quantity?: number
	},
	extras?: {
		logoApply?: boolean,
		installation?: boolean
	}
}
export type ValidatedBulkOrder = Required<BulkOrder>
export interface DescriptionItem{
	type: string,
	content: string
}

export interface PopularProduct{
	_id: string,
	poster: string,
	name: string,
	description: DescriptionItem[],
	price: number,
	discount: number,
	category: string
}

export interface Product{
	_id: string,
	sku: string,
	rating: number,
	rates: number,
	name: string,
	description: {type: string, content: string}[],
	discount: number,
	purchases: number,
	poster: string,
	imgs: string[],
	category: string,
	reviewsCount: number,
	properties: {[key: string]: string},
	price: number,
	colors: {colorName: string, hex: string}[],
	material: string[],
	size: {thickness: number, width: number, height: number},
	features: string[],
	mountOn: string[],
	equipment: string[],
	quantity: number,
	guaranty: number
}

export interface CatalogProduct{
	_id: string,
	rating: number,
	rates: number,
	name: string,
	discount: number,
	poster: string,
	reviewsCount: number,
	price: number
}

export interface CatalogProductResponse{
	products: CatalogProduct[],
	quantity: number
}

interface Range{
	min: number,
	max: number,
}

interface NameQuantity{
	[key: string]: number
}

export interface ProductFiltersList{
	sort?: string
	priceRange?: Range,
	features?: NameQuantity,
	colors?: NameQuantity
	materials?: NameQuantity
	sizes?: {
		height: Range,
		width: Range,
		thickness: Range
	}
}

export interface Association{
	[key: string]: number
}
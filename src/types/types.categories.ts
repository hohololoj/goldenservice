export interface CategoryFromList{
	_id: string,
	name: string,
	img: string
}

export interface FullCategoryInfo{
	_id: string,
	name: string,
	img: string,
	description: {type: string, content: string}[]
}

export type CategoryList = CategoryFromList[];
export interface Comment{
	_id: string,
	author: string,
	timestamp: number,
	text: string
}

export interface Review{
	_id: string,
	author: string,
	timestamp: number,
	rate: number,
	text: string,
	pid: string,
	comments: Comment[],
}
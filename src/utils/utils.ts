export async function FetchGet(url: string){
	return fetch(url, {
		method: "GET",
		cache: "force-cache",
		next: {revalidate: 3600}
	})
}
export function waitClient(){
	return typeof window !== undefined
}
export class ClientValidation{
	static isValidRating(val: unknown){
		if(typeof val !== 'number'){return false}
		return !(val <= 0 || val > 5)
	}
	static isValidPhone(val: unknown): boolean {
		if (typeof val !== 'string') { return false; }
		const cleanVal = val.replace(/\D/g, '');
		if (cleanVal.length < 10 || cleanVal.length > 11) return false;
		return /^\d+$/.test(cleanVal);
	}
	static isRussianText(val: unknown){
		if(typeof val !== 'string'){return false}
		return /^[а-яёА-ЯЁ\s]*$/.test(val);
	}
	static isValidEmail(val: unknown){
		if(typeof val !== 'string'){return false}
		if(!val.includes('@')){return false}
		const [nickname, domain] = val.split('@');
		if(nickname.length < 3){return false}
		if(!domain.includes('.')){return false}
		const topLevelDomain = domain.split('.').at(-1);
		if(!topLevelDomain || topLevelDomain.length < 2){return false}
		return true
	}
	static isInLengthRange(val: unknown, min: number, max: number){
		if(typeof val !== 'string'){return false}
		const length = val.length;
		return (length >= min && length <= max)
	}
	static minmax(val: unknown, min: number, max: number){
		const parsed: number = parseFloat(val as string);
		if(isNaN(parsed)){return false}
		return parsed >= min && parsed <= max;
	}
}
export function parseDate(timestamp: number){
	const date = new Date(timestamp);
	const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
	
	const dayNum: string | number = date.getUTCDate();
	const day = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
	
	const monthNum: string | number = date.getUTCMonth();
	const month = monthNames[monthNum];

	const year = date.getUTCFullYear();

	return `${day} ${month}, ${year}`
}
interface Props{
	direction: 'right' | 'left';
	className: string
}
export default function PopularProductsSliderArrow(props: Props){
	return(
		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer ${props.className} ${props.direction === 'left' ? '' : 'rotate-180'}`}>
			<path d="M26.665 33.3333L13.3317 19.9999L26.665 6.66659" stroke="#161C24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}
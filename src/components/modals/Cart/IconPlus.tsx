interface Props{
	active: boolean,
	onClick: Function
}
export default function IconPlus(props: Props){
	return(
		<svg onClick={() => {props.onClick()}} className={props.active ? 'cursor-pointer' : 'cursor-not-allowed'} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M7.99935 7.99999H2.66602M7.99935 13.3333V7.99999V13.3333ZM7.99935 7.99999V2.66666V7.99999ZM7.99935 7.99999H13.3327H7.99935Z" stroke={props.active ? '#181818' : 'C4CDD5'} strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}
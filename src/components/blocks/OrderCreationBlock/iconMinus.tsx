interface Props{
	active: boolean,
	onClick: () => void
}
export default function IconMinus(props: Props){
	return(
		<svg onClick={() => {props.onClick()}} className={props.active ? 'cursor-pointer' : 'cursor-not-allowed'} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M13.3327 8H2.66602" stroke={props.active ? '#181818' : 'C4CDD5'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}
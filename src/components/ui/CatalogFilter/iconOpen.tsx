interface Props{
	opened: boolean
}
export default function IconOpened(props: Props){
	return(
		<svg className={`transition-all duration-250 parabola${props.opened ? ' rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15 6L9 12L3 6" stroke={props.opened ? '#4295E4' : '#938A9F'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}
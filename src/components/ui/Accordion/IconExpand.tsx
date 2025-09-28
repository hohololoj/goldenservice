interface Props{
	active: boolean
}

export default function IconExpand(props: Props){
	return(
		<svg className="transition-all duration-[250ms] linear" style={{transform: `rotate(${props.active ? 180 : 0}deg)`}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 9L12 17L4 9" stroke={props.active ? '#4295E4' : '#454F5B'} strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}
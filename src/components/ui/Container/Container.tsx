import { ReactNode } from "react"

interface Props{
	className?: string,
	children?: ReactNode
}

export default function Container(props: Props){
	return(
		<div className={`w-full${props.className ? ' '+props.className : ''}`}>
			{props.children}
		</div>
	)
}
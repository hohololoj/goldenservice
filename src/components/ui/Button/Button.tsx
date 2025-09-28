import { MouseEventHandler, ReactNode } from "react"

interface Props{
	children: string | ReactNode,
	className?: string,
	onClick?: MouseEventHandler,
	style?: object
}
export default function Button(props: Props){
	return(
		<button style={props.style} onClick={props.onClick} className={`bg-main text-white text-base font-medium py-[7px] px-8 cursor-pointer w-fit${props.className ? ' '+props.className : ''}`}>
			{props.children}
		</button>
	)
}
'use client'

import { ReactNode, RefObject } from "react"

interface Props{
	children: ReactNode,
	className?: string,
	value: string,
	onClick?: Function,
	ref: RefObject<HTMLDivElement | null>
}
export default function Option(props: Props){
	return(
		<div ref={props.ref} onClick={() => {props.onClick ? props.onClick() : () => {}}} className={`w-full h-full${props.className ? ' '+props.className : ''}`} data-value={props.value}>
			{props.children}
		</div>
	)
}
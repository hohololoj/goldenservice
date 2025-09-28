'use client'
import { ReactNode } from "react"

interface Props{
	active: boolean,
	onActivate: Function,
	children: ReactNode
}
export default function InputRadio(props: Props){
	return(
		<div onClick={() => {props.onActivate()}} className="flex gap-2 items-center cursor-pointer w-fit">
			
			<div className="w-4 h-4 rounded-full border-1 border-gray p-[2px]">
				<div style={{display: props.active ? 'block' : 'none'}} className="w-full h-full rounded-full bg-main"></div>
			</div>

			{props.children}

		</div>
	)
}
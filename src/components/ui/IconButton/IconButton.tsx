import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { ReactNode } from "react"

interface Props{
	children?: ReactNode,
	onClick?: Function,
	className?: string,
	src: string | StaticImport,
	alt?: string,
	width: number,
	height: number
}

export default function IconButton(props: Props){

	function handleClick(){
		props.onClick!()
	}

	return(
		<button className={`cursor-pointer flex items-center select-none gap-2${props.className ? ' '+props.className : ''}`} onClick={props.onClick ? handleClick : undefined}>
			<Image width={props.width} height={props.height} src={props.src} alt={props.alt || ''}/>
			{props.children ? <p>{props.children}</p> : ''}
		</button>
	)
}
import { MouseEventHandler, ReactNode } from "react";
import Button from "../Button/Button";
import Link from "next/link";

interface Props{
	children?: string | ReactNode,
	href: string,
	linkClassName?: string,
	buttonClassName?: string,
	onClick?: MouseEventHandler
}

export default function ButtonLink(props: Props){
	return(
		<Link href={props.href} className={`w-fit h-fit${props.linkClassName ? ' '+props.linkClassName : ''}`}>
			<Button onClick={props.onClick} className={props.buttonClassName}>{props.children}</Button>
		</Link>
	)
}
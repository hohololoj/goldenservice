import Link from "next/link";
import { ReactNode } from "react";

interface Props{
	className?: string,
	children: string | ReactNode,
	href: string,
	onClick?: Function
}

export default function NavItem(props: Props){
	return(
		<Link onClick={() => {props.onClick && props.onClick()}} href={props.href} className={`text-base 930:text-xl hover:text-main${props.className ? ' '+props.className : ''}`}>{props.children}</Link>
	)
}
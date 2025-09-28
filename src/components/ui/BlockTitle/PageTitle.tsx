import { ReactNode } from "react";

interface Props{
	children: ReactNode,
	className?: string
}
export default function PageTitle(props: Props){
	return(
		<div className={`mt-10 px-25 flex gap-[54px] items-end${props.className ? (' '+props.className) : ''}`}>
			{props.children}
		</div>
	)
}
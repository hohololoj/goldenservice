'use client'

import { ReactNode, useEffect, useRef, useState } from "react"
import IconExpand from "./IconExpand";

interface Props{
	title: string,
	children: ReactNode
}
export default function Accordion(props: Props){
	const [isActive, setIsActive] = useState(false);
	
	const contentRef = useRef<HTMLDivElement>(null);
	const maxHeight = useRef(0);

	useEffect(() => {
		maxHeight.current = contentRef.current?.scrollHeight || 0;
	}, [contentRef])

	return(
		<div className="w-full h-auto px-4 flex flex-col overflow-hidden">
			<div onClick={() => {setIsActive(prev => !prev)}} className="w-full h-fit flex justify-between py-4 cursor-pointer">
				<p className="font-medium leading-[26px]">{props.title}</p>
				<IconExpand active={isActive}/>
			</div>
			<div ref={contentRef} style={{maxHeight: `${isActive ? maxHeight.current : 0}px`}} className="w-full h-fit transition-all duration-[250ms] linear">
				{props.children}
			</div>
		</div>
	)
}
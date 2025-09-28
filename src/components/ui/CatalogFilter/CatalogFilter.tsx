'use client'

import { ReactNode, useEffect, useRef, useState } from "react"
import IconOpened from "./iconOpen";

interface Props{
	children: ReactNode,
	name: string,
	maxHeight?: number
}
export default function CatalogFilter(props: Props){
	const [isOpened, setIsOpened] = useState(false);
	const heightRef = useRef<HTMLDivElement>(null);
	
	return(
		<div ref={heightRef} className="w-full h-auto flex flex-col gap-4 overflow-hidden">
			<div className="w-full flex justify-between items-center py-[3px] cursor-pointer" onClick={() => {setIsOpened(prev => !prev)}}>
				<p className="text-base font-medium leading-[26px]">{props.name}</p>
				<IconOpened opened={isOpened}/>
			</div>
			<div className="w-full h-fit transition-all duration-1000 linear flex flex-col gap-[6px]" style={{maxHeight: isOpened ? `${props.maxHeight || heightRef.current?.scrollHeight}px` : '0px'}}>
				{props.children}
			</div>
		</div>
	)
}
'use client'

import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import Option from "./Option";

import iconOpen from './icon-open.svg';
import Image from "next/image";

interface Props{
	children: React.ReactElement<{'data-value': string}>[],
	initial: number,
	className?: string,
	windowClassName?: string,
	onSelect?: Function
}

export default function Select(props: Props){
	const [active, setActive] = useState(props.initial);
	const [isOpened, setIsOpened] = useState(false);
	const optionHeight = useRef(0);
	const optionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		optionHeight.current = optionRef.current?.clientHeight || 0;
	}, [active])

	useEffect(() => {
		setActive(props.initial)
	}, [props.initial])

	function changeActive(i: number, value: string){
		if(isOpened){
			if(optionHeight.current === 0){
				optionHeight.current = optionRef.current?.clientHeight || 0;
			}
			setActive(() => i);
			setIsOpened((prev) => !prev)
		}
		else{
			setIsOpened((prev) => !prev)
		}
		props.onSelect && props.onSelect(value)
	}

	return(
		<div className={`w-full h-full bg-red-500 relative ${isOpened ? 'overflow-visible' : 'overflow-hidden'}${props.className ? ' '+props.className : ''}`}>
			<Image src={iconOpen} alt="icon-open" width={16} height={16} className="absolute z-10 top-3 right-4"/>
			<div className={`w-full h-fit absolute z-10 left-0${props.windowClassName ? ' '+props.windowClassName : ''}`} style={{top: `${isOpened ? 0 : active*optionHeight.current*-1}px`}}>
				{props.children.map((child, i) => {
					const value = child!.props['data-value'] || i.toString();
					return(
						<Option key={i} ref={optionRef} onClick={() => {changeActive(i, value)}} value={value}>{child}</Option>
					)
				})}
			</div>
		</div>
	)
}
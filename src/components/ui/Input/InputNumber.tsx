'use client'

import { RefObject, useRef } from "react"

interface Props{
	className?: string,
	onInput?: Function,
	inputSettings?: {min: number, max: number},
	delay?: number,
	ref: RefObject<HTMLInputElement | null>,
}
export default function InputNumber(props: Props){
	const staticClassName = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

	const minValue = props.inputSettings?.min;
	const maxValue = props.inputSettings?.max;

	let delay: NodeJS.Timeout;

	function handleInput(){
		props.onInput && props.onInput(props.ref.current?.value)
	}
	
	return(
		<input ref={props.ref} onInput={handleInput} className={props.className ? props.className+' '+staticClassName : staticClassName} type="number" inputMode="numeric" />
	)
}
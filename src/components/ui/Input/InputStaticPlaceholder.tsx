import { RefObject } from "react";
import InputNumber from "./InputNumber";

interface Props{
	className?: string,
	inputClassName?: string,
	placeholder: string,
	onInput: Function,
	inputSettings?: {min: number, max: number},
	delay?: number,
	ref: RefObject<HTMLInputElement | null>,
}
export default function InputStaticPlaceholder(props: Props){
	return(
		<div className={`w-full h-full flex items-center justify-center px-[10px] relative${props.className ? ' '+props.className : ''}`}>
			<div className="w-fit! h-fit min-w-4 flex items-center justify-center">
				<InputNumber ref={props.ref} delay={props.delay} onInput={(value: string)=>{props.onInput(value)}} inputSettings={props.inputSettings} className="w-[52px] border-0 outline-0 h-fit text-sm font-regular leading-6"/>
				<p>{props.placeholder}</p>
			</div>
		</div>
	)
}
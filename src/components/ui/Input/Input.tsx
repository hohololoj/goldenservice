import { Ref } from "react"

interface Props{
	type?: string,
	placeholder?: string,
	className?: string,
	ref?: Ref<HTMLInputElement>,
	maxLength?: number,
	onInput?: Function,
	onClick?: Function,
	readOnly?: boolean,
	options?: object
}
export default function Input(props: Props){
	return(
		<input {...props.options} readOnly={props.readOnly || false} onClick={(e) => {props.onClick && props.onClick(e)}} onInput={(e) => {props.onInput && props.onInput(e)}} maxLength={props.maxLength || undefined} ref={props.ref || undefined} type={props.type || 'text'} placeholder={props.placeholder || ''} className={`w-full h-full outline-0 py-3 px-4 border-1 border-light-gray placeholder:text-gray${props.className ? ' '+props.className : ''}`} />
	)
}
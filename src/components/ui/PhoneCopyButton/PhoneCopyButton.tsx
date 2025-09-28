'use client'
import IconButton from "../IconButton/IconButton"

import IconPhone from './icon-phone.svg';

async function copyPhone(phone: string){
	try{
		await navigator.clipboard.writeText(phone)
	}
	catch{
		window.location.href=`tel:${phone.replace(/\s/g, '')}`
	}
}

interface Props{
	children: string,
	className?: string
}

export default function PhoneCopyButton(props: Props){
	return(
		<IconButton className={`${props.className ? ' '+props.className : ''}text-sm 930:text-base`} width={20} height={20} src={IconPhone} onClick={() => {copyPhone(props.children)}}>{props.children}</IconButton>
	)
}
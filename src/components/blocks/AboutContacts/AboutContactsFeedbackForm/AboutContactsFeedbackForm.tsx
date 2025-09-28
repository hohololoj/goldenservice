'use client'

import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"

export default function AboutContactsFeedbackForm(){
	return(
		<div className="grid grid-cols-1 grid-rows-[50px] gap-6 h-fit">
			<Input className="h-full w-full border-0!" placeholder="Ваше имя"/>
			<Input className="h-full w-full border-0!" placeholder="Ваш Email"/>
			<Button className="h-[50px]! w-[220px]! ">Отправить</Button>
		</div>
	)
}
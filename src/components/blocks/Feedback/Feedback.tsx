'use client'
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useRef } from "react";
import { NotificationSystem } from "../Notifications/Notifications";
import { ClientValidation } from "@/utils/utils";

export default function Feedback(){

	const inputsRef = useRef<{[key: string]: HTMLInputElement}>({})

	async function handleFeedbackSubmit(){
		const name = inputsRef.current.name.value;
		if(name === ''){NotificationSystem.showError('Введите имя'); return}
		if(!ClientValidation.isRussianText(name)){NotificationSystem.showError('Имя должно быть написано русскими буквами'); return}

		const email = inputsRef.current.email.value;
		if(email === ''){NotificationSystem.showError('Введите email'); return}
		if(!ClientValidation.isValidEmail(email)){NotificationSystem.showError('Введите корректный email'); return}

		const subscription = {name, email}
		const res = await fetch('/api/proxy/subscriptions', {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(subscription)
		})
		if(!res.ok){NotificationSystem.showError('Что-то пошло не так: '+res.statusText)}
		const response = await res.json();
		if(!response.status){
			NotificationSystem.showError('Что то пошло не так: '+response.message)
		}
		else{
			NotificationSystem.showSuccess('Заявка успешно сохранена')
		}
	}

	return(
		<div className="mt-10 700:mt-25 py-16 w-full flex justify-center">
			<div className="w-full flex flex-col gap-6 items-center px-4 800:px-0">
				<h2 className="text-[22px] 800:text-[44px] font-semibold leading-[34px] 800:leading-[62px]">Мы Вам перезвоним</h2>
				<p className="max-w-max 800:max-w-[518px] leading-[24px] 800:leading-[26px] text-center text-sm 800:text-base">Если у вас возникли какие-то вопросы или проблемы, заполните форму и мы Вам перезвоним.</p>
				<div className="w-full grid grid-cols-1 800:grid-cols-[240px_240px_220px] grid-rows-3 800:grid-rows-[50px] gap-y-4 justify-center">
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.name = el}} className="border-0!" placeholder="Ваше имя"/>
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.email = el}} className="border-0!" type="email" placeholder="Ваш Email"/>
					<Button onClick={handleFeedbackSubmit} className="w-full h-full flex justify-center items-center mt-2 800:mt-0">Отправить</Button>
				</div>
			</div>
		</div>
	)
}
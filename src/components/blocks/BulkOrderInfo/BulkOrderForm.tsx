'use client'

import Input from "@/components/ui/Input/Input"
import Image from "next/image";
import { useRef, useState } from "react";
import { NotificationSystem } from "../Notifications/Notifications";
import InputRadio from "@/components/ui/Input/InputRadio";
import Button from "@/components/ui/Button/Button";
import { BulkOrder, ValidatedBulkOrder } from "@/types/types.order";
import { Product } from "@/types/types.products";

import iconSearch from './icon-search.svg';
import iconClose from './icon-close.svg';
import { ClientValidation } from "@/utils/utils";
import { useRouter } from "next/navigation";

interface SearchResult{
	active: boolean,
	content: Product[]
}

export default function BulkOrderForm(){

	const [order, setOrder] = useState<BulkOrder>({});
	const [searchResult, setSearchResult] = useState<SearchResult>({active: false, content: []});

	const router = useRouter();

	const timerRef = useRef<NodeJS.Timeout>(undefined);
	const inputsRef = useRef<{[key: string]: HTMLInputElement}>({});

	function handleQuantityInput(e: InputEvent){
		const input = e.target as HTMLInputElement;
		const value = parseFloat(input.value);

		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			if(value < 100){NotificationSystem.showError('Минимум 100'); input.value = '100'}
			if(value > 1000){NotificationSystem.showError('Максимум 1000'); input.value = '1000'}
		}, 500);
	}

	async function search(query: string){
		const res = await fetch(`/api/proxy/products/search?query=${query}`).then((res) => res.json());
		const result = res ? [...res] : [];
		setSearchResult({active: true, content: result});
		document.addEventListener('click', () => {
			setSearchResult(prev => {return {...prev, active: false}});
		}, {once: true})
	}

	function handleSearchInput(val: string){
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			search(val)
		}, 500);
	}

	function handleSearchBarClick(){
		setSearchResult({...searchResult, active: true});
		document.addEventListener('click', () => {
			setSearchResult(prev => {return {...prev, active: false}});
		}, {once: true})
	}

	function handleSearchItemSubmit(sku: string, name: string){
		setOrder({...order, product: {...order.product, sku: sku}});
		inputsRef.current.searchBar.value = name;
	}
	function handleSearchItemSubmitCancel(){
		setOrder({...order, product: {...order.product, sku: undefined}});
		inputsRef.current.searchBar.value = '';
	}

	function readContacts(){
		const name = inputsRef.current.name.value !== '' ? inputsRef.current.name.value : undefined;
		const companyName = inputsRef.current.companyName.value !== '' ? inputsRef.current.companyName.value : undefined;
		const phoneRaw = inputsRef.current.phone.value !== '' ? inputsRef.current.phone.value : undefined;
		const phone = phoneRaw?.replace(/^8/, '+7');
		return !name&&!companyName&&!phone ? undefined : {name, companyName, phone}
	}

	async function submitOrder(validatedOrder: ValidatedBulkOrder){
		const res = await fetch('/api/proxy/bulk-orders', {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(validatedOrder)
		})
		if(!res.ok){NotificationSystem.showError('Что-то пошло не так, проверьте корректность введенных данных')}
		const response = await res.json();
		if(!response.status){NotificationSystem.showError(`Что то пошло не так: ${response.message || ''}`)}
		else{
			NotificationSystem.showSuccess('Заказ успешно создан');
			router.push('/')
		}
	}
	
	function handleOrderSubmit(){

		const contacts = readContacts();
		if(!contacts){NotificationSystem.showError('Заполните контактные данные'); return}

		const {name, companyName, phone} = contacts;
		if(!ClientValidation.isRussianText(name)){NotificationSystem.showError('Имя должно содержать только русские буквы'); return}
		if(!ClientValidation.isInLengthRange(name, 2, 128)){NotificationSystem.showError('Имя должно быть от 2 до 128 символов'); return}
		if(!ClientValidation.isInLengthRange(companyName, 8, 128)){NotificationSystem.showError('Название компании должно быть от 8 до 128 символов'); return}
		if(!ClientValidation.isValidPhone(phone)){NotificationSystem.showError('Введите корректный номер телефона'); return}

		const quantity = inputsRef.current.quantity.value;
		if(!ClientValidation.minmax(quantity, 100, 1000)){NotificationSystem.showError('Количество товаров должно быть от 100 до 1000 штук'); return}

		const sku = order.product?.sku;
		if(sku === undefined){NotificationSystem.showError('Пожалуйста, выберите товар'); return}
		
		const validatedOrder: ValidatedBulkOrder = {
			contacts: {...contacts},
			product:{
				sku: sku,
				quantity: parseInt(quantity)
			},
			extras: order.extras!
		}
		submitOrder(validatedOrder)
	}

	return(
		<div className="flex flex-col gap-4">
			
			{/* Имя, компания, телефон */}
			<div className="w-full grid grid-cols-1 650:grid-cols-3 gap-x-2 700:gap-x-4 gap-y-4">

				<div className="flex flex-col gap-1 w-full">
					<p className="text-xs font-normal leading-5">Имя</p>
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.name = el;}} placeholder="Ваше имя" className="w-full text-sm 700:text-base placeholder:text-sm placeholder:700:text-base"/>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<p className="text-xs font-normal leading-5">Название компании</p>
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.companyName = el;}} placeholder="Имя вашей компании" className="w-full 700:text-base placeholder:text-sm placeholder:700:text-base"/>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<p className="text-xs font-normal leading-5">Номер телефона</p>
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.phone = el;}} maxLength={12} placeholder="+7 (_ _ _) _ _  _ _  _ _ _" type="tel" className="w-full 700:text-base placeholder:text-sm placeholder:700:text-base"/>
				</div>

			</div>
			
			{/* артикул, количество */}
			<div className="w-full grid grid-cols-1 650:grid-cols-3 gap-x-2 700:gap-x-4 gap-y-4">

				<div className="col-[1/3] flex flex-col gap-1">
					<p className="text-xs font-normal leading-5">Название товара</p>
					<div className="w-full relative">
						<Image src={iconSearch} alt="icon-search" width={16} height={16} className="absolute top-[50%] translate-y-[-50%] left-[16px]"/>
						<Input ref={(el: HTMLInputElement) => {inputsRef.current.searchBar = el}} readOnly={order.product?.sku !== undefined} onClick={handleSearchBarClick} onInput={(e: InputEvent) => {handleSearchInput((e.target as HTMLInputElement).value)}} placeholder="Введите название товара или артикул" className="w-full pl-10! 700:text-base placeholder:text-sm placeholder:700:text-base"/>
						<div style={{display: searchResult.active ? 'flex' : 'none'}} className="w-full absolute h-[150px] px-4 flex-col bg-white left-0 border-1 border-light-gray border-t-0 overflow-auto">
							{Array.isArray(searchResult.content) && searchResult.content.length > 0 ? 
							searchResult.content.map((item) => {
								return(
									<div onClick={() => {handleSearchItemSubmit(item.sku, item.name)}} key={item._id} className="w-full h-[30px] flex items-center cursor-pointer border-b-1 border-transparent hover:border-b-light-gray">
										{item.name}
									</div>
								)
							})
							:
							<div className="w-full h-[30px] flex items-center">
								Ничего не найдено
							</div>
							}
						</div>
						<Image onClick={handleSearchItemSubmitCancel} src={iconClose} alt="icon-close" width={16} height={16} className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-[16px]"/>
					</div>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<p className="text-xs font-normal leading-5">Количество</p>
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.quantity = el;}} options={{min: 100, max: 1000}} onInput={(e: InputEvent) => {handleQuantityInput(e)} } placeholder="Количество товара" type="number" className="w-full 700:text-base placeholder:text-sm placeholder:700:text-base"/>
				</div>
				
			</div>

			<InputRadio active={order.extras?.logoApply !== undefined && order.extras?.logoApply === true} onActivate={() => {setOrder({...order, extras: {...order.extras, logoApply: !order.extras?.logoApply}})}}>
				<p className="text-xs 700:text-base font-normal leading-[22px] 700:leading-[26px]">Нанесение персонального логотипа (бесплатно)</p>
			</InputRadio>

			<InputRadio active={order.extras?.installation !== undefined && order.extras?.installation === true} onActivate={() => {setOrder({...order, extras: {...order.extras, installation: !order.extras?.installation}})}}>
				<p className="text-xs 700:text-base font-normal leading-[22px] 700:leading-[26px]">Помощь в монтажных работах (бесплатно)</p>
			</InputRadio>

			<div className="mt-4 h-[50px] grid auto-rows-[50px] grid-cols-1 650:grid-cols-3 gap-x-2 700:gap-x-4 gap-y-4">

				<div className="flex flex-col gap-1 w-full col-[1/3]">
					<p className="text-xs font-normal leading-5">Приблизительная стоимость</p>
					<Input ref={(el: HTMLInputElement) => {inputsRef.current.price = el;}} className="w-full border-0! cursor-auto" readOnly/>
				</div>

				<Button onClick={handleOrderSubmit} className="w-full">Отправить заявку</Button>

			</div>

		</div>
	)
}
'use client'
import PageTitle from "@/components/ui/BlockTitle/PageTitle";
import Input from "@/components/ui/Input/Input";
import InputRadio from "@/components/ui/Input/InputRadio";
import IconPlus from "./IconPlus";
import IconMinus from "./iconMinus";
import Button from "@/components/ui/Button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import iconClose from './icon-close.svg';
import { Cart, useCartState } from "@/utils/CartState";
import { Order } from "@/types/types.order";
import { NotificationSystem } from "../Notifications/Notifications";
import { ClientValidation, FetchGet } from "@/utils/utils";
import { Product } from "@/types/types.products";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

function CartItem(props: {cartItem: Cart, productData: Product | null}){
	const {push, pull} = useCartState();

	function calcPrice(){
		const price = props.productData?.price || 0;
		const discount = props.productData?.discount || 0;
		return props.productData?.discount === 0 ? 
		<p className="text-xs 700:text-sm font-normal leading-5 700:leading-6">{price}₽</p>
	:
		<>
			<p className="text-xs 700:text-sm font-normal leading-5 700:leading-6">{price - (price*(discount/100))}₽</p>
			<p className="text-[10px] 700:text-xs font-normal leading-5 text-gray line-through">{price}₽</p>
		</>
	}

	return(
		<div className="w-full h-[70px] 550:h-[130px] grid grid-cols-[70px_1fr_16px] 550:grid-cols-[136px_1fr_16px] gap-x-2">

			{/* Картинка товара */}
			{props.productData ? <Image src={`/api/cdn/${props.productData.poster}`} alt="product-image" className="object-contain object-center w-full h-full" style={{aspectRatio: '136/120'}} width={136} height={120}/> : <div></div>}

			{/* Инфа о товаре */}
			<div className="w-full h-full flex flex-col justify-between">

				{/* Инфа */}
				<div className="w-full flex flex-col gap-[6px]">
					<p className="text-xs 550:text-sm font-normal leading-6">{props.productData?.name}</p>
					<p className="text-xs font-normal leading-5 hidden 550:inline">
						+ Подарок:<br></br>
						<span className="text-sm font-normal leading-5 text-main">“Приложение к замкам Golden Service”</span>
					</p>
				</div>

				{/* Кол-во, цена */}
				<div className="flex gap-4 items-center">

					{/* Количество */}
					<div className="flex items-center gap-2">
						<IconMinus active={true} onClick={() => {pull(props.cartItem)}} />
						<p className="w-[40px] 550:w-[60px] h-[23px] 550:h-8 flex items-center justify-center">{props.cartItem.quantity}</p>
						<IconPlus active={true} onClick={() => {push(props.cartItem)}} />
					</div>

					{/* Цена */}
					<div className="flex items-center gap-1">
						{calcPrice()}
					</div>

				</div>

			</div>

			<div className="cursor-pointer h-fit">
				<Image src={iconClose} width={16} height={16} style={{ aspectRatio: '1/1' }} alt="icon-close" />
			</div>

		</div>
	)
}

function OrderCreationBlock() {

	const [codeInputActive, setCodeInputActive] = useState(false);
	const [currentOrderData, setCurrentOrderData] = useState<Order>({});
	const [terminals, setTerminals] = useState<string[]>([]);
	const [terminalsOpened, setTerminalsOpened] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	const timerRef = useRef<NodeJS.Timeout>(undefined);
	const cityInputRef = useRef<HTMLInputElement>(null);
	const terminalInputRef = useRef<HTMLInputElement>(null);
	const promoInputRef = useRef<HTMLInputElement>(null);
	
	const router = useRouter();

	const { cart, remove } = useCartState();

	function deferContactsInput(e: InputEvent, inputField: 'name' | 'surname' | 'email' | 'phone') {

		clearTimeout(timerRef.current);

		const value = (e.target! as HTMLInputElement).value;

		const contacts = currentOrderData.contacts || {};
		contacts[inputField] = value;

		timerRef.current = setTimeout(() => {
			setCurrentOrderData({ ...currentOrderData, contacts: { ...contacts } })
		}, 150);

	}

	function setDelivery(type: 'post' | 'sdek' | 'delline') {
		setCurrentOrderData({ ...currentOrderData, delivery: type })
	}

	async function updateTerminals(city: string, query: string) {
		const agent = currentOrderData.delivery;
		if (agent === undefined || !['sdek', 'post', 'delline'].includes(agent)) {
			NotificationSystem.showError('Пожалуйста, выберите службу доставки')
			return
		}
		const terminals = await FetchGet(`/api/proxy/delivery/${city}/${agent}${query ? `?query=${query}` : ''}`).then((res) => res.json());
		setTerminals(terminals);
	}

	function handleTerminalInput(e: InputEvent) {
		const currentCity = cityInputRef.current?.value;
		if (currentCity === undefined || currentCity === '') {
			//@ts-ignore
			e.target.value = '';
			cityInputRef.current!.focus();
			setTerminalsOpened(false);
			NotificationSystem.showError('Пожалуйста, введите сперва город');
			return
		}
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			//@ts-ignore
			updateTerminals(currentCity, e.target.value);
		}, 250);
	}

	function selectTerminal(terminal: string){
		terminalInputRef.current!.value = terminal;
		setCurrentOrderData({...currentOrderData, postOffice: terminal});
		setTerminalsOpened(false);
	}

	function handleCommentInput(comment: string){
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setCurrentOrderData((prev) => {
				if(comment === ''){
					const {comment, ...rest} = prev;
					return rest
				}
				return {...prev, comment}
			})
		}, 500);
	}

	async function updateProducts(pids: string[]){
		if(pids.length === 0){setProducts([]); return}
		const lastPids = products.map(item => item._id);
		if(pids.sort().toString() === lastPids.sort().toString()){return}
		const rawProducts = await fetch(`/api/proxy/products?ids=${pids.join(',')}`).then((res) => res.json()) as any;
		setProducts(rawProducts);
	}

	function calcSum(){
		if(!products || products.length === 0){return 0}
		return cart.reduce((acc: number , current: Cart, i: number) => {
			const productData = products[i];
			if(!productData){return acc+0;}
			const price = productData.discount === 0 ? productData.price : productData.price-(productData.price*(productData.discount/100));
			const totalPrice = current.quantity*price;
			return acc+totalPrice;
		}, 0)
	}

	function handleExtrasInput(value: string){
		const index = currentOrderData.extras?.indexOf(value);
		const currentExtras = currentOrderData.extras || [];
		if(index === -1 || index === undefined){
			setCurrentOrderData({...currentOrderData, extras: [...currentExtras, value]})
		}
		else{
			currentExtras.splice(index, 1)
			setCurrentOrderData({...currentOrderData, extras: currentExtras})
		}
	}

	async function checkPromo(){
		if(currentOrderData.promocode !== undefined){return}
		const promo = promoInputRef.current!.value;
		const {status} = await fetch(`/api/proxy/promocodes/${promo}`).then((res) => res.json()) as {status: boolean};
		if(status){
			NotificationSystem.showSuccess('Промокод активирован');
			setCurrentOrderData({...currentOrderData, promocode: promo});
		}
		else{
			NotificationSystem.showError('Промокод не найден')
		}
	}

	const orderDataValid = useCallback(() => {

		const contacts = currentOrderData.contacts;
		if(contacts === undefined){return false}
		if(!ClientValidation.isInLengthRange(contacts.name, 2, 64) || !ClientValidation.isRussianText(contacts.name)){return false}
		if(!ClientValidation.isInLengthRange(contacts.surname, 2, 64)  || !ClientValidation.isRussianText(contacts.surname)){return false}
		if(!ClientValidation.isValidPhone(contacts.phone)){return false}
		if(!ClientValidation.isValidEmail(contacts.email)){return false}

		if(currentOrderData.delivery === undefined || !(['sdek', 'post', 'delline'].includes(currentOrderData.delivery))){return false}
		if(currentOrderData.postOffice === undefined || currentOrderData.postOffice === ''){return false}

		if(currentOrderData.payment === undefined || !(['card', 'pickup'].includes(currentOrderData.payment))){return false;}

		return true
	}, [currentOrderData])

	async function sendOrder(valid: boolean){
		if(!valid){NotificationSystem.showError('Проверьте корректность введенных данных'); return}
		const restructuredProducts = cart.map((item) => {
			const {color, ...newStructure} = item;
			return newStructure
		})
		const order_obj = {
			...currentOrderData,
			products: restructuredProducts
		}
		if(!order_obj.contacts!.phone!.startsWith('+7')){order_obj.contacts!.phone! = order_obj.contacts!.phone!.replace(/^8/, '+7')}
		order_obj.postOffice = `${cityInputRef.current!.value} ${order_obj.postOffice}`;
		const {status, message} = await fetch('/api/proxy/orders/', {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(order_obj)
		}).then((res) => res.json());
		if(!status){NotificationSystem.showError('Что-то пошло не так: '+message)}
		else{NotificationSystem.showSuccess('Заказ успешно создан')}
		cart.forEach((cartItem) => {
			remove(cartItem)
		})
		router.push('/');
	}

	useEffect(() => {
		const pids = cart.map((cartItem) => cartItem.pid);
		updateProducts(pids);
	}, [cart])

	return (
		<div className="w-full mt-10 flex flex-col gap-6">

			<PageTitle className="text-[22px] 750:text-[44px] font-semibold px-4! 750:px-25!">Оформление заказа</PageTitle>

			<div className="w-full px-4 750:px-25 grid grid-cols-1 1100:grid-cols-[1fr_500px] gap-x-[30px]">

				{/* Форма заказа*/}
				<div className="w-full h-auto flex flex-col px-0 750:px-8 py-6 gap-6">

					{/* Контактные данные */}
					<div className="w-full flex flex-col gap-3 550:gap-4">

						<p className="text-base 550:text-lg font-normal leading-[26px] 550:leading-8">1. Контактные данные</p>

						<div className="w-full grid grid-cols-1 1300:grid-cols-2 auto-rows-[68px] gap-x-5 gap-y-4">

							<div className="w-full flex flex-col gap-1">
								<p className="text-xs font-normal leading-5 text-gray">Фамилия</p>
								<Input onInput={(e: any) => { deferContactsInput(e, 'name') }} placeholder="Зайцев" />
							</div>

							<div className="w-full flex flex-col gap-1">
								<p className="text-xs font-normal leading-5 text-gray">Имя</p>
								<Input onInput={(e: any) => { deferContactsInput(e, 'surname') }} placeholder="Иван" />
							</div>

							<div className="w-full flex flex-col gap-1">
								<p className="text-xs font-normal leading-5 text-gray">Телефон</p>
								<Input onInput={(e: any) => { deferContactsInput(e, 'phone') }} type="tel" placeholder="+7 123 456 78 90" maxLength={12} />
							</div>

							<div className="w-full flex flex-col gap-1">
								<p className="text-xs font-normal leading-5 text-gray">Email</p>
								<Input onInput={(e: any) => { deferContactsInput(e, 'email') }} type="email" placeholder="Зайцев" />
							</div>

						</div>
					</div>

					{/* Выбор доставки */}
					<div className="w-full flex flex-col gap-3 550:gap-4">

						<p className="text-base 550:text-lg font-normal leading-[26px] 550:leading-8">2. Доставка</p>

						<div className="flex flex-col gap-3">
							<InputRadio active={currentOrderData.delivery === 'sdek'} onActivate={() => { setDelivery('sdek') }}>
								<p className="text-sm font-normal leading-6 text-gray">Сдек</p>
							</InputRadio>
							<InputRadio active={currentOrderData.delivery === 'post'} onActivate={() => { setDelivery('post') }}>
								<p className="text-sm font-normal leading-6 text-gray">Почта России</p>
							</InputRadio>
							<InputRadio active={currentOrderData.delivery === 'delline'} onActivate={() => { setDelivery('delline') }}>
								<p className="text-sm font-normal leading-6 text-gray">Деловые линии</p>
							</InputRadio>

							<div style={{display: currentOrderData.delivery !== undefined ? 'grid' : 'none'}} className="w-full h-fit grid-cols-1 1300:grid-cols-2 gap-x-5 gap-y-3">

								<div className="flex flex-col gap-1">
									<p className="text-xs font-normal leading-5">Город</p>
									<Input ref={cityInputRef} placeholder="Москва" />
								</div>

								<div className="w-full relative flex flex-col gap-1">
									<p className="text-xs font-normal leading-5">Выберите отделение</p>
									<Input ref={terminalInputRef} onInput={(e: InputEvent) => { handleTerminalInput(e) }} onClick={(e: InputEvent) => { setTerminalsOpened(true); handleTerminalInput(e); }} placeholder="Москва" />
									<div style={{display: terminalsOpened ? 'flex' : 'none'}} className="absolute w-full h-[200px] flex-col bg-white border-1 border-light-gray border-t-0 bottom-[-200px] overflow-auto">
										{Array.isArray(terminals) && terminals.length !== 0 ?
											terminals.map((terminal) => {
												return (
													<div onClick={() => {selectTerminal(terminal)}} className="w-full px-4 text-sm cursor-pointer" key={terminal}>
														<p className="w-full border-light-gray border-b-1 py-2">{terminal}</p>
													</div>
												)
											})
											:
											<div className="w-full px-4 text-sm">
												<p className="w-full border-light-gray border-b-1 py-2">Ничего не найдено</p>
											</div>}
									</div>
								</div>

							</div>
						</div>

					</div>

					{/* Оплата */}
					<div className="w-full flex flex-col gap-3 550:gap-4">

						<p className="text-base 550:text-lg font-normal leading-[26px] 550:leading-8">3. Оплата</p>

						<div className="flex flex-col gap-3">
							<InputRadio active={currentOrderData.payment === 'pickup'} onActivate={() => {setCurrentOrderData({...currentOrderData, payment: 'pickup'})}}>
								<p className="text-sm font-normal leading-6 text-gray">Оплата при получении товара</p>
							</InputRadio>
							<InputRadio active={currentOrderData.payment === 'card'} onActivate={() => {setCurrentOrderData({...currentOrderData, payment: 'card'})}}>
								<p className="text-sm font-normal leading-6 text-gray">Банковская карта</p>
							</InputRadio>
						</div>

					</div>

					{/* Комментарий */}
					<div className="w-full flex flex-col gap-3 550:gap-4">

						<p className="text-xs font-normal leading-5 text-gray">Комментарий</p>

						<textarea onInput={(e) => {handleCommentInput((e.target as HTMLTextAreaElement).value)}} className="w-full h-25 border-1 border-light-gray resize-none py-[10px] px-3 text-xs leading-6 font-normal placeholder:text-text-disable text-black outline-0" placeholder="Напишите комментарий"></textarea>

					</div>

				</div>

				{/* Блок "итого" */}
				<div className="flex flex-col gap-4 px-0 550:px-6 py-4">

					{/* Заголовок */}
					<h2 className="text-2xl font-semibold leading-[34px]">Итого</h2>

					{/* Блок товаров */}
					<div className="w-full flex flex-col gap-1 max-h-[240px] overflow-auto mt-4">

						{products.map((productData) => {
							const currentCartItem = cart.filter((item) => item.pid === productData._id)[0];
							return <CartItem key={`cartItem-${productData._id}`} cartItem={{pid: productData._id, quantity: currentCartItem?.quantity, color: currentCartItem?.color}} productData={productData}/>
						})}

					</div>

					{/* Блок итоговой цены */}
					<div className="w-full h-fit flex justify-end gap-3 items-center">
						<p className="text-sm font-normal leading-6">К оплате:</p>
						<p className="text-sm 550:text-base font-semibold leading-[26px]">{calcSum()}₽</p>
					</div>

					{/* Блок комплектации */}
					<div className="w-full flex flex-col gap-3 mt-4">

						<p className="text-sm font-medium leading-6">Комплектация</p>

						<div className="flex gap-6">

							<div className="flex items-center gap-3 cursor-pointer">
								{/* Цвет текста неактивный тоже меняется! */}
								<InputRadio active={currentOrderData.extras ? currentOrderData.extras.includes('setup') : false} onActivate={() => {handleExtrasInput('setup')}}>
									<p className="text-sm 550:text-base font-normal leading-[26px]">Нужна установка</p>
								</InputRadio>
							</div>

							<div className="flex items-center gap-3 cursor-pointer">
								<InputRadio active={currentOrderData.extras ? currentOrderData.extras.includes('setting') : false} onActivate={() => {handleExtrasInput('setting')}}>
									<p className="text-sm 550:text-base font-normal leading-[26px]">Настройка софта</p>
								</InputRadio>
								{/* Цвет текста неактивный тоже меняется! */}
							</div>

						</div>

					</div>

					<div className="w-full flex justify-center mt-6">
						<Button onClick={() => {sendOrder(orderDataValid())}} style={{opacity: orderDataValid() ? '100%':'45%', cursor: orderDataValid() ? 'pointer!':'not-allowed!'}} className="w-[300px]! h-11! flex items-center justify-center">Подтвердить заказ</Button>
					</div>

					<div className="w-full h-fit flex flex-col gap-4 mt-2 overflow-hidden">

						<div className="w-full flex justify-between items-center">
							<p className="text-base font-medium leading-[26px]">Промокод</p>
							{codeInputActive ?
								<Button onClick={() => { setCodeInputActive(false) }} className="bg-white! text-main! px-0!">Закрыть</Button>
								:
								<Button onClick={() => { setCodeInputActive(true) }} className="bg-white! text-main! px-0!">Добавить</Button>
							}
						</div>

						<div style={{ display: codeInputActive ? 'grid' : 'none'}} className="w-full grid-cols-1 550:grid-cols-[1fr_168px] grid-rows-2 550:grid-rows-1 gap-x-4 transition-all duration-200 gap-y-6">
							<Input readOnly={currentOrderData.promocode !== undefined} ref={promoInputRef} className="w-full! h-full" placeholder="Введите промокод" />
							<Button style={{cursor: currentOrderData.promocode === undefined ? 'pointer' : 'not-allowed', opacity: currentOrderData.promocode === undefined ? '100%' : '45%'}} onClick={checkPromo} className="w-full! h-full! flex items-center justify-center">Применить</Button>
						</div>

					</div>

				</div>

			</div>

		</div>
	)
}
export default dynamic(() => Promise.resolve(OrderCreationBlock), {ssr: false})
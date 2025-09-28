'use client'

import Image from 'next/image';
import { Rating } from "@mui/material";
import IconButton from "@/components/ui/IconButton/IconButton";
import Button from "@/components/ui/Button/Button";

import iconClose from './icon-close.svg';
import iconDelete from './icon-delete.svg';
import IconMinus from "./iconMinus";
import IconPlus from "./IconPlus";
import iconAdd from './icon-add.svg';
import { Cart, useCartState } from "@/utils/CartState";
import { useEffect, useState } from "react";
import { BFF } from "@/constants/constants";
import { Association, Product } from "@/types/types.products";
import dynamic from "next/dynamic";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink/ButtonLink";

interface Props{
	active: boolean,
	onClose: Function
}

function ModalCartProduct(props: {cartItem: Cart, productData: Product | null}){

	const {push, pull, remove} = useCartState();

	function calcPrice(){
		return props.productData ? props.productData.discount === 0 ? props.productData.price : props.productData.price-(props.productData.price*(props.productData.discount/100)) : 0
	}

	return(
		<div className="mt-4 w-fit max-w-full h-[120px] grid grid-cols-[auto_1fr_auto] 700:grid-cols-[140px_1fr_100px] grid-rows-1 gap-x-2 700:gap-x-3">

			{/* Картинка */}
			{props.productData?.poster ? <Image src={`/api/cdn/${props.productData.poster}`} className="object-contain object-center w-[70px] 700:w-[136px]" alt="product-image" width={136} height={120} style={{aspectRatio: '136/120'}}/> : <><div></div></>}
			

			{/* Текст, количество */}
			<div className="w-full h-full flex flex-col justify-between">

				{/* Название */}
				<div className="flex flex-col gap-1">
					<p className="text-xs 700:text-base font-normal leading-[18px] 700:leading-[26px]">{props.productData?.name}</p>
					<p className="text-xs 700:text-sm font-normal leading-[20px] 700:leading-6">+ Подарок: <span className="text-main">“Приложение к замкам Golden Service”</span></p>
				</div>

				{/* Количество */}
				<div className="w-fit h-8 grid grid-cols-[16px_60px_16px] gap-x-2 items-center">
					<IconMinus onClick={() => {pull({pid: props.cartItem.pid, color: props.cartItem.color})}} active={true}/>
					<div className="w-full h-full flex items-center justify-center">
						<p className="text-xs 700:text-sm font-medium leading-[20px] 700:leading-6 select-none">{props.cartItem.quantity}</p>
					</div>
					<IconPlus onClick={() => {push({pid: props.cartItem.pid, color: props.cartItem.color})}} active={true}/>
				</div>

			</div>
			{/* Кнопка удалить и цена за штуку */}
			<div className="w-full h-full flex flex-col justify-between items-end">
				<IconButton onClick={() => {remove({pid: props.cartItem.pid, color: props.cartItem.color})}} src={iconDelete} alt="icon-delete" width={24} height={24} className="text-main"><span className="hidden 700:block">Удалить</span></IconButton>
				<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px] select-none">{calcPrice()} ₽</p>
			</div>
		</div>
	)
}

function ModalCart(props: Props){

	const {cart, push} = useCartState();
	const [products, setProducts] = useState<{[key: string]: Product}>();
	const [associations, setAssociations] = useState<Product[]>([]);

	async function updateProducts(pids: string[]){
		if(pids.length === 0){setProducts({}); return}
		const rawProducts = await fetch(`/api/proxy/products?ids=${pids.join(',')}`).then((res) => res.json()) as any;
		const products: {[key: string]: Product} = {};
		for(let i = 0; i < rawProducts.length; i++){
			const currentId = rawProducts[i]._id;
			delete rawProducts[i]._id;
			products[currentId] = rawProducts[i];
		}
		setProducts(products)
	}

	async function updateAssociations(pids: string[]){
		const associations: {associations: Association}[] = await Promise.all(
			pids.map(async (pid) => {
				const response = await fetch(`/api/proxy/products/${pid}/associations`);
				const association = await response.json() as {associations: Association};
				return association;
			})
		);

		const associationsList = Array.from(new Set(associations.flatMap((association) => {
			return Object.keys(association.associations).map((key) => {
				return {[key] : association.associations[key]}
			})
		})))
		
		const sorted = associationsList.sort((association1, association2) => {
			const value1 = Object.values(association1)[0];
			const value2 = Object.values(association2)[0];
			return value1 === value2 ? 0 : value1 > value2 ? 1 : -1
		})

		const top3 = sorted.length >= 3 ? sorted.splice(0, 3) : [];
		const ids = top3.map((topItem) => Object.keys(topItem)[0]);
		const topAssociatedProducts = ids.length !== 0 ? await fetch(`/api/proxy/products?ids=${ids.join(',')}`).then((res) => res.json()) : [];
		setAssociations(topAssociatedProducts)
	}

	useEffect(() => {
		const pids = cart.map((cartItem) => cartItem.pid);
		updateProducts(pids)
		updateAssociations(pids)
	}, [cart])

	function calcSum(){
		if(!products || Object.keys(products).length === 0){return 0}
		return cart.reduce((acc: number , current: Cart) => {
			const productData = products[current.pid];
			if(!productData){return acc+0;}
			const price = productData.discount === 0 ? productData.price : productData.price-(productData.price*(productData.discount/100));
			const totalPrice = current.quantity*price;
			return acc+totalPrice;
		}, 0)
	}

	function calcPrice(product: Product){
		return product.discount === 0 ? 
			<p className="text-xs 700:text-sm font-normal leading-5 700:leading-6">{product.price}₽</p>
		:
			<>
				<p className="text-xs 700:text-sm font-normal leading-5 700:leading-6">{product.price - (product.price*(product.discount/100))}₽</p>
				<p className="text-[10px] 700:text-xs font-normal leading-5 text-gray line-through">{product.price}₽</p>
			</>
	}

	return(
		<div className="w-screenSmart h-[100dvh] fixed left-0 top-0 z-[9999] bg-[rgba(69,78,90,0.6)] items-center justify-center" style={{display: props.active ? 'flex' : 'none'}}>
			<div className="w-full max-w-full mx-4 px-4 700:w-210 h-[90%] bg-white py-4 flex flex-col gap-6 overflow-auto ">
				
				{/* Заголовок корзины */}
				<div className="w-full h-fit flex justify-between items-center">
					<h3 className="text-base 700:text-xl font-medium leading-[26px] 700:leading-[34px]">Корзина</h3>
					<IconButton onClick={() => {props.onClose()}} src={iconClose} alt="icon-close" className="font-medium text-base leading-[26px]" width={20} height={20}/>
				</div>

				{Array.isArray(cart) && cart.length>0 ?
					<>
					{
						cart.map((cartItem, i) => {
							return <ModalCartProduct key={`cart-item-${i}`} cartItem={cartItem} productData={products ? products[cartItem.pid] : null}/>
						})
					}

					{/* Функции корзины */}
					<div className="mt-2 w-full flex flex-col 700:flex-row justify-between items-start 700:items-end gap-2 700:gap-0">

						{/* Сумма и кнопка заказать */}
						<div className="w-full 700:w-fit flex flex-col gap-2">
							<div className="flex gap-2 items-center 700:items-end">
								<p className="text-xs 700:text-base font-normal leading-5 700:leading-[26px]">Итого:</p>
								<p className="text-base 700:text-xl font-medium leading-[26px] 700:leading-[30px]">{calcSum()} ₽</p>
							</div>
							<ButtonLink onClick={() => {props.onClose()}} href="/order" buttonClassName="py-[9px]! px-8! w-full! 700:w-fit!">Оформить заказ</ButtonLink>
						</div>

						{/* Кнопка закрытия корзины */}
						<div className="w-full 700:w-fit h-fit">
							<Button onClick={() => {props.onClose()}} className="bg-white border-1 border-light-blue py-[9px]! px-6! text-black! w-full! 700:w-fit!">Продолжить покупки</Button>
						</div>

					</div>

					{/* Блок ассоциаций */}
					{associations.length !== 0 ? 
						<div className="w-full h-[376px] pt-6 flex flex-col gap-4">
							
							<h3 className="text-base 700:text-xl font-medium leading-[26px] 700:leading-[34px]">С этим покупают</h3>
								
							{/* Контейнер ассоциаций */}
							<div className="w-full max-h-[302px] h-full flex flex-col gap-4">

								{associations.map((association) => {
									return(
										<div key={association._id} className="w-full h-[90px] grid grid-cols-[auto_1fr_auto] 700:grid-cols-[102px_1fr_107px] grid-rows-1 gap-x-4">
										
											{/* Картинка */}
											<Image src={`/api/cdn/${association.poster}`} alt="association-poster" width={102} height={90} style={{aspectRatio: "102/90"}} className="object-contain object-center w-[70px] 700:w-[102px]"/>
									
											{/* Информация */}
											<div className="w-full h-full flex flex-col justify-between">
									
												{/* Название и рейтинг */}
												<div className="w-full flex flex-col gap-[5px]">
													<p className="text-xs 700:text-sm font-normal leading-[18px] 700:leading-6">{association.name}</p>
													<div className="flex gap-1 700:gap-2">
														<Rating defaultValue={association.rates !== 0 ? association.rating/association.rates : 0} precision={0.5} readOnly/>
														<p className="text-xs 700:text-[13px] font-normal leading-4 700:leading-[21px] text-gray">({association.reviewsCount}) отзывов</p>
													</div>
												</div>
									
												{/* Цена */}
												<div className="flex items-center gap-1">
													{calcPrice(association)}
												</div>
									
											</div>
									
											{/* Кнопка добавить */}
											<Link onClick={() => {props.onClose()}} href={`/catalog/${association.category}/${association._id}`}>
												<IconButton src={iconAdd} alt="icon-add" width={24} height={24} className="text-main font-medium leading-[26px] h-fit!"><span className="hidden 700:block">Добавить</span></IconButton>
											</Link>
										
										</div>
									)
								})}

							</div>

						</div>
					: null}
					
					</>
				: 'Ваша корзина пуста'}

			</div>
		</div>
	)
}
export default dynamic(() => Promise.resolve(ModalCart), {ssr: false})
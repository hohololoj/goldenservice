'use client'
import Gallery from "@/components/ui/Gallery/Gallery"
import MountOnItem from "@/components/ui/MountOnItem/MountOnItem"
import { Product } from "@/types/types.products"
import { Rating } from "@mui/material"
import { useEffect, useState } from "react"

import iconMark from './icon-mark.svg';
import Image from "next/image"
import Button from "@/components/ui/Button/Button"
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton"
import Accordion from "@/components/ui/Accordion/Accordion"
import { LSManager } from "@/utils/LSManager"
import { useCartState } from "@/utils/CartState"

interface Props{
	product: Product
}
export default function ProductInfo(props: Props){

	const [selectedColor, setSelectedColor] = useState(props.product.colors[0].colorName);
	const {cart, push} = useCartState();

	function selectColor(val: string){
		setSelectedColor(val);
	}

	function calcPrice(){
		if(props.product.discount !== 0){
			return(
				<>
					<p className="text-[22px] font-semibold h-fit">{props.product.price - (props.product.price*(props.product.discount/100))}₽</p>
					<p className="text-xl font-light text-gray line-through h-fit">{props.product.price}₽</p>
				</>
			)
		}
		else{
			return(
				<p className="text-[22px] font-semibold h-fit">{props.product.price}₽</p>
			)
		}
	}

	useEffect(() => {
		const pids_set = new Set(JSON.parse(LSManager.db('recently_viewed').find('ids') || "[]"));
		pids_set.add(props.product._id);
		const pids = Array.from(pids_set);
		LSManager.db('recently_viewed').change('ids', JSON.stringify(pids));
	}, [])

	function handleBuyClick(){
		const product = {
			pid: props.product._id,
			color: selectedColor
		}
		push(product)
	}

	return(
		<div className="w-full mt-10 px-4 1230:px-25 grid grid-cols-1 930:grid-cols-2 gap-[30px]">
			<Gallery poster={props.product.poster} imgs={props.product.imgs}/>
			<div className="w-full h-fit flex flex-col gap-3">
				
				{/* sku и рейтинг */}
				<div className="w-full flex justify-between">
					<div className="flex gap-4 items-center">
						<p className="text-sm font-normal leading-[21px]">{props.product.sku}</p>
						<div className="flex items-center gap-2">
							<Rating name="rating" defaultValue={props.product.rates !== 0 ? props.product.rating/props.product.rates : 0} precision={0.5} readOnly/>
							<p className="text-[13px] font-normal text-gray leading-[21px]">({props.product.reviewsCount}) отзывов</p>
						</div>
					</div>
					<div className="block 930:hidden">
						<FavoriteButton  pid={props.product._id}/>
					</div>
				</div>

				{/* название товара */}
				<p className="mt-1 text-[22px] 550:text-2xl font-semibold leading-[30px]">{props.product.name}</p>

				{/* подходит для установки */}
				{Array.isArray(props.product.mountOn) && props.product.mountOn.length !== 0 ? 
					<div className="flex flex-col gap-2 h-auto">
						<p className="text-sm font-semibold leading-6">Подходит для установки на:</p>
						<div className="w-full flex flex-wrap gap-3">
							{props.product.mountOn.map((mountOnItem, i) => {
								return(
									<MountOnItem key={`mountOnItem-${i}`} text={mountOnItem}/>
								)
							})}
						</div>
					</div>
				: ''}

				{/* комплектация и цвет */}
				<div className="w-full flex flex-col-reverse 550:flex-row gap-[30px]">

					{/* комплектация */}
					<div className="flex flex-col gap-2 h-auto">
						<p className="font-semibold leading-6">Комплектация</p>
						<div className="w-72 h-10 flex flex-wrap items-center text-sm font-normal leading-6">
							{props.product.equipment.join(', ')}
						</div>
					</div>

					{/* цвет */}
					{Array.isArray(props.product.colors) && props.product.colors.length !== 0 ? 
						<div className="flex flex-col gap-2">
							<p className="font-semibold leading-6">Цвет</p>
							<div className="w-fit max-w-full h-10 flex flex-wrap gap-3">
								{props.product.colors.map((color) => {
									return(
										<div onClick={() => {selectColor(color.colorName)}} className={`w-10 h-10 flex items-center justify-center cursor-pointer outline-${selectedColor === color.colorName ? '1' : '0'} outline-main`} key={color.colorName} data-value={color.colorName} style={{background: `${color.hex}`}}>
											<Image src={iconMark} className={selectedColor === color.colorName ? '' : 'hidden'} alt="icon-mark" width={20} height={20}/>
										</div>
									)
								})}
							</div>
						</div>	
					: ''
					}

				</div>

				{/* Цена */}
				<div className="mt-3 flex items-center gap-3">
					{calcPrice()}
				</div>

				{/* Кнопки */}
				<div className="mt-1 flex gap-[30px] items-center">
					<Button onClick={handleBuyClick} className="px-[119px] py-4!">Купить</Button>
					<div className="hidden 930:block">
						<FavoriteButton pid={props.product._id}/>
					</div>
				</div>
				
				{/* Список аккордеонов */}
				<div className="mt-5 flex flex-col">
					<Accordion title="Оплата">
						<div className="w-full h-auto text-sm font-normal text-gray leading-6">
							Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении.
						</div>
					</Accordion>
					<Accordion title="Монтаж и доставка">
						<div className="w-full h-auto text-sm font-normal text-gray leading-6">
						Бесплатная доставка от 3000 руб., Самовывоз из пунктов выдачи заказов (ПВЗ), Курьером по Москве и СПб, Доставка в пункты выдачи Boxberry, Доставка курьером CDEK, Доставка Почтой России, Срочная доставка по Москве (в день заказа), Профессиональный монтаж нашими мастерами, Консультация по самостоятельной установке.
						</div>
					</Accordion>
					<Accordion title="Оплата">
						<div className="w-full h-auto text-sm font-normal text-gray leading-6">
						Официальная гарантия от 1 года до 5 лет, Возврат и обмен в течение 14 дней, Скидки постоянным клиентам, Накопительная бонусная программа, Рассрочка без процентов (от Тинькофф, СберБанк), Цены от производителя, Только сертифицированные товары, Бесплатная консультация и подбор замка, Проверка на брак перед отправкой.
						</div>
					</Accordion>
				</div>

			</div>
		</div>
	)
}
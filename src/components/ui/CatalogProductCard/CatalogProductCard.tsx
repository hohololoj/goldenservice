import { CatalogProduct } from "@/types/types.products";
import { Rating } from "@mui/material";
import Image from "next/image";

import IconMark from './icon-mark.svg';
import IconGift from './icon-gift.svg';

interface Props{
	product: CatalogProduct
}
export default function CatalogProductCard(props: Props){

	function calcPrice(){
		return props.product.discount !== 0 ?
		(
			<>
				<p className="text-lg 850:text-xl font-semibold">{props.product.price - (props.product.price * (props.product.discount/100))}₽</p>
				<p className="text-base 850:text-lg font-light text-gray line-through">{props.product.price}₽</p>
			</>
		)
		:
		(
			<p className="text-lg 850:text-xl font-semibold">{props.product.price}₽</p>
		)
	}

	return(
		<div className="w-full h-fit flex flex-col items-center 550:items-start cursor-pointer relative">
			
			{/* контейнер скидки */}
			<div className={`w-fit h-fit py-4 px-[10px] absolute top-3 right-[14px] ${props.product.discount === 0 && 'hidden'}`}>
				<p className="text-xs font-medium">SALE</p>
			</div>

			{/* Контейнер наличия и подарка */}
			<div className="w-fit h-fit flex flex-col gap-[10px] absolute left-3 top-[17px]">

				<div className="py-[2.5px] px-2 pl-0 flex gap-2 items-center bg-white">
					<Image src={IconMark} width={20} height={20} alt="icon-mark"/>
					<p className="text-sm font-normal leading-6 text-gray">В наличии</p>
				</div>
				
				<div className="px-2 py-[6px] flex gap-[10px] items-center w-fit h-fit bg-white">
					<Image src={IconGift} width={12} height={12} alt="icon-mark"/>
					<p className="text-xs font-normal">Подарок</p>
				</div>
				
			</div>

			<Image src={`/api/cdn/${props.product.poster}`} alt={props.product.name} width={288} height={320} style={{aspectRatio: "288/320"}} className="object-contain object-center"/>
			
			<div className="w-full py-[10px] px-3 flex flex-col">

				{/* Рейтинг */}
				<div className="flex items-center gap-2">
					<Rating name="rating" defaultValue={props.product.rates !== 0 ? props.product.rating/props.product.rates : 0} precision={0.5} readOnly/>
					<p className="text-[13px] font-normal text-gray leading-[21px]">({props.product.reviewsCount}) отзывов</p>
				</div>

				{/* Название */}
				<p className="text-sm 850:text-base font-normal leading-6 850:leading-[26px] text-gray max-w-full">
					{props.product.name}
				</p>

				{/* Цена */}
				<div className="h-fit flex gap-3 items-center">
					{calcPrice()}
				</div>

			</div>
		</div>
	)
}
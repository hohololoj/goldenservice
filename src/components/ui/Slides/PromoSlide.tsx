'use client';
import Image from 'next/image';
import ButtonLink from "../ButtonLink/ButtonLink";
interface Props{
	className?: string,
	poster: string,
	name: string,
	description: {type: string, content: string}[],
	price: number,
	discount: number,
	_id: string,
	category: string
}
export default function PromoSlide(props: Props){

	function calcPrice(){
		return props.discount!==0 ? 
		(
			<>
				<p className="text-2xl font-semibold">{props.price - props.price*(props.discount/100)}₽</p>
				<p className="text-[22px] font-light line-through">{props.price}₽</p>
			</>
		)
		:
		(
			<>
				<p className="text-2xl font-semibold">{props.price}₽</p>
			</>
		)
	}

	return(
		<div className="w-screenSmart h-auto flex flex-col 930:flex-row gap-16 justify-center items-center">
			
			<Image src={`/api/cdn/${props.poster}`} alt="promo-image" className="max-h-[50vh] max-w-[50vw] object-contain" style={{width: 'auto'}} width={530} height={530}/>

			<div className="flex flex-col gap-5 h-full justify-center px-4 800:px-0 items-start">
				<h2 className="text-[22px] 800:text-[44px] font-semibold leading-[34px] 800:leading-[62px] max-w-[604px]">{props.name}</h2>
				<div className="flex flex-col gap-8">
					
					<div className="flex flex-col gap-4">
						{props.description.map((descriptionItem) => {
							return(
								<p className="text-sm max-w-[287px]" key={descriptionItem.content}>{descriptionItem.content}</p>
							)
						})}
					</div>

					<div className="flex flex-col gap-4">
						
						<div className="flex flex-col gap-1">
							<p className="text-[12px]">Цена:</p>
							<div className="flex gap-3">
								{calcPrice()}
							</div>
						</div>

						<ButtonLink href={`/catalog/${props.category}/${props._id}`} buttonClassName="px-[37px]">Добавить в корзину</ButtonLink>

					</div>	

				</div>
			</div>

		</div>
	)
}
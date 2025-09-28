import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";
import { CategoryList } from "@/types/types.categories";
import { useState } from "react";
import ButtonLink from "../ButtonLink/ButtonLink";

interface Props{
	active: boolean,
	categories: CategoryList,
	onClose: Function
}
export default function CatalogMenu(props: Props){

	const [activeCategory, setActiveCategory] = useState('');

	return(
		<div className="absolute top-6 left-0 h-fit overflow-hidden z-1">
			<div className={`grid transition-all duration-500 parabola ${props.active ? 'grid-rows-[800px]' : 'grid-rows-[0px]'}`}>
				<div className="p-8 flex items-center gap-8 w-auto h-fit bg-white rounded-sm">
					<div className="flex flex-col gap-4 w-[343px] overflow-hidden">
						{props.categories.map((category) => {
							return(
								<Link onClick={() => {props.onClose()}} onMouseLeave={() => {setActiveCategory('')}} onMouseEnter={() => {setActiveCategory(category._id)}} key={category._id} className="w-fit text-base hover:text-main border-b-1 border-[rgba(0,0,0,0)] hover:border-main" href={`/catalog/${category._id}`}>{category.name}</Link>
							)
						})}
						<ButtonLink onClick={() => {props.onClose()}} href="/catalog">Смотреть все</ButtonLink>
					</div>
					<div className="w-[350px] h-[300px] relative">
						{props.categories.map((category) => {
							return(
								<Image className={`${(activeCategory === category._id) ? 'block' : 'hidden'} h-auto w-[350px]`} sizes="(max-width: 350px)" key={category._id} src={`/api/cdn/categories/${category.img}`} alt={category.name} fill/>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
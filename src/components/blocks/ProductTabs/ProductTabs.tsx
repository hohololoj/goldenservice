'use client'

import { Product } from "@/types/types.products"
import { useRef, useState } from "react"
import CharacteristicsTab from "./CharacteristicsTab";
import DescriptionTab from "./DescriptionTab";
import ReviewsTab from "./ReviewsTab";

interface Props{
	product: Product
}

export default function ProductTabs(props: Props){

	const [activeTab, setActiveTab] = useState(0);

	const tabRefs = useRef<Array<HTMLParagraphElement | null>>([null,null,null]);

	return(
		<div className="mt-10 w-full h-auto px-4 930:px-25 flex flex-col gap-6">

			<div className="flex flex-col gap-3">
				
				<div className="flex gap-4 600:gap-[62px]">
					<p onClick={() => {setActiveTab(0)}} ref={(el) => {tabRefs.current[0] = el}} style={{borderBottom: `2px solid ${activeTab === 0 ? '#4295E4': 'transparent'}`}} className="select-none text-base 600:text-xl font-medium leading-[26px] 600:leading-[30px] cursor-pointer transition-all duration-[250ms] linear">Характеристики</p>
					<p onClick={() => {setActiveTab(1)}} ref={(el) => {tabRefs.current[1] = el}} style={{borderBottom: `2px solid ${activeTab === 1 ? '#4295E4': 'transparent'}`}} className="select-none text-base 600:text-xl font-medium leading-[26px] 600:leading-[30px] cursor-pointer transition-all duration-[250ms] linear">Описание</p>
					<p onClick={() => {setActiveTab(2)}} ref={(el) => {tabRefs.current[2] = el}} style={{borderBottom: `2px solid ${activeTab === 2 ? '#4295E4': 'transparent'}`}} className="select-none text-base 600:text-xl font-medium leading-[26px] 600:leading-[30px] cursor-pointer transition-all duration-[250ms] linear">Отзывы</p>
				</div>

			</div>

			<div className="w-full h-auto">
				<CharacteristicsTab className={`${activeTab === 0 ? '' : 'hidden'}`} properties={props.product.properties}/>
				<DescriptionTab className={`${activeTab === 1 ? '' : 'hidden'}`} description={props.product.description} img={props.product.poster}/>
				<ReviewsTab className={`${activeTab === 2 ? '' : 'hidden'}`} pid={props.product._id}/>
			</div>

		</div>
	)
}
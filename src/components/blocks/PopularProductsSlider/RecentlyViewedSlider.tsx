'use client'
import { useEffect, useState } from "react";
import { LSManager } from "@/utils/LSManager";
import { BFF } from "@/constants/constants";
import PopularProductsSliderControls from "./PopularProductsSliderControls";
import Slider from "@/components/ui/Slider/Slider";
import PopularProductsSlide from "@/components/ui/Slides/PopularProductsSlide";
import { SliderControlsOptions } from "@/types/types.ui";

export default function RecentlyViewedSlider(){

	const [products, setProducts] = useState([]);
	
	async function loadProducts(ids: string[]){
		if(ids.length === 0){setProducts([]); return}
		const query = ids.join(',');
		const products = await fetch(`/api/proxy/products?ids=${query}`).then((res) => res.json());
		setProducts(products);
	}

	useEffect(() => {
		const ids = JSON.parse(LSManager.db('recently_viewed').find('ids') || '[]');
		loadProducts(ids);
	},[])

	const options: SliderControlsOptions = {
		customControlsLeft: 'popular-products-slider-arrow-left',
		customControlsRight: 'popular-products-slider-arrow-right',
	}

	return products.length === 0 ? null :(
		<div className="mt-25 w-full px-4 990:px-[100px] flex flex-col gap-16">
			<div className="flex justify-between items-center">
				<h2 className="text-[22px] 990:text-[44px] font-semibold leading-[34px] 990:leading-[62px]">Вы недавно посмотрели</h2>
				<PopularProductsSliderControls/>
			</div>

			<Slider options={options} sliderName="popular" slideWidth="(100dvw - var(--scrollbar-width) - 200px)">
				{
					<PopularProductsSlide products={products}/>
				}
			</Slider>
		</div>
	)
}
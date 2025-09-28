import Slider from "@/components/ui/Slider/Slider";
import PopularProductsSlide from "@/components/ui/Slides/PopularProductsSlide";
import { PopularProduct } from "@/types/types.products";
import PopularProductsSliderControls from "./PopularProductsSliderControls";
import { SliderControlsOptions } from "@/types/types.ui";

interface Props{
	products: PopularProduct[],
	title: string
}

export default function PopularProductsSlider(props: Props){

	const options: SliderControlsOptions = {
		customControlsLeft: 'popular-products-slider-arrow-left',
		customControlsRight: 'popular-products-slider-arrow-right',
	}

	return(
		<div className="mt-25 w-full px-4 990:px-[100px] flex flex-col gap-16">
			<div className="flex justify-between items-center">
				<h2 className="text-[22px] 990:text-[44px] font-semibold leading-[34px] 990:leading-[62px]">{props.title}</h2>
				<PopularProductsSliderControls/>
			</div>

			<Slider options={options} sliderName="popular" slideWidth="(100dvw - var(--scrollbar-width) - 200px)">
				{
					<PopularProductsSlide products={props.products}/>
				}
			</Slider>
		</div>
	)
}
import Slider from "@/components/ui/Slider/Slider";
import PromoSlide from "@/components/ui/Slides/PromoSlide";
import { PopularProduct, Product } from "@/types/types.products";

interface Props{
	popular: Product[]
}

export default async function PromoSlider(props: Props){

	return(
		<div className="w-screenSmart h-auto pt-[122px] pb-12 flex flex-col gap-[42px]">
			<Slider sliderName="promo" slideWidth="(100vw - var(--scrollbar-width))">
				{props.popular.map((popularProduct) => {
					return(
						<PromoSlide key={popularProduct._id} {...popularProduct}/>
					)
				})}
			</Slider>
		</div>
	)
}
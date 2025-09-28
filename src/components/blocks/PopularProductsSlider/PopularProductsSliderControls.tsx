import PopularProductsSliderArrow from "./PopularProductSliderArrow";

export default function PopularProductsSliderControls(){
	return(
		<div className="hidden 700:flex gap-10">
			<PopularProductsSliderArrow className="popular-products-slider-arrow-left" direction="left"/>
			<PopularProductsSliderArrow className="popular-products-slider-arrow-right" direction="right"/>
		</div>
	)
}
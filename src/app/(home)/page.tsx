import CategoriesPreview from "@/components/blocks/CategoriesPreview/CategoriesPreview";
import Feedback from "@/components/blocks/Feedback/Feedback";
import PopularProductsSlider from "@/components/blocks/PopularProductsSlider/PopularProductsSlider";
import PromoSlider from "@/components/blocks/PromoSlider/PromoSlider";
import Statistics from "@/components/blocks/Statistics/Statistics";
import WhyWe from "@/components/blocks/WhyWe/WhyWe";
import { API } from "@/constants/constants";
import { FetchGet } from "@/utils/utils";

export const dynamic = 'force-static'
export default async function Home() {

	const categories = await FetchGet(`${API}/categories`).then(res => res.json());
	const {products} = await FetchGet(`${API}/products?sort=popular`).then(res => res.json());

	return(
		<>
			<PromoSlider popular={products.slice(0, 4)}/>
			<Statistics/>
			<WhyWe/>
			<CategoriesPreview categories={categories}/>
			<PopularProductsSlider products={products} title="Наши популярные продукты"/>
			<Feedback/>
		</>
	)
}
import CategoryDescription from "@/components/blocks/CategoryDescription/CategoryDescription";
import Feedback from "@/components/blocks/Feedback/Feedback";
import RecentlyViewedSlider from "@/components/blocks/PopularProductsSlider/RecentlyViewedSlider";
import ProductsBlock from "@/components/blocks/ProductsBlock/ProductsBlock";
import PageTitle from "@/components/ui/BlockTitle/PageTitle";
import NavBar from "@/components/ui/NavBar/NavBar";
import { API } from "@/constants/constants";
import { FullCategoryInfo } from "@/types/types.categories";
import { CatalogProductResponse, ProductFiltersList } from "@/types/types.products";
import { FetchGet } from "@/utils/utils";
import { Metadata } from "next";

export async function generateMetadata({params} : {params: Promise<{cid: string}>}): Promise<Metadata>{
	const { cid } = await params;
	const category = await FetchGet(`${API}/categories/${cid}`).then((res) => res.json());
	return {
		title: category.name
	}
}

export default async function Products({params} : {params: Promise<{cid: string}>}){
	const { cid } = await params;
	const category = await FetchGet(`${API}/categories/${cid}`).then((res) => res.json()) as FullCategoryInfo;
	const {products, quantity} = await FetchGet(`${API}/products?cid=${cid}`).then((res) => res.json()) as CatalogProductResponse;
	const filters = await FetchGet(`${API}/products/${cid}/filters`).then((res) => res.json()) as ProductFiltersList;
	
	return(
		<>	
			<NavBar targetRoutes={[{name: category.name, href: ''}]}/>
			<PageTitle className="px-4! 800:px-25!">
				<h1 className="text-[28px] font-semibold leading-[42px]">{category.name}</h1>
				<p className="text-lg font-light leading-7 mb-[3px]">({quantity})</p>
			</PageTitle>
			<ProductsBlock cid={cid} products={products} filters={filters} maxPages={Math.ceil(quantity/12)}/>
			<RecentlyViewedSlider/>
			<CategoryDescription category={category}/>
			<Feedback/>
		</>
	)
}
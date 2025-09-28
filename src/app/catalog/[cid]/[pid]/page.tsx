import CategoryDescription from "@/components/blocks/CategoryDescription/CategoryDescription";
import Feedback from "@/components/blocks/Feedback/Feedback";
import RecentlyViewedSlider from "@/components/blocks/PopularProductsSlider/RecentlyViewedSlider";
import ProductInfo from "@/components/blocks/ProductInfo/ProductInfo";
import ProductTabs from "@/components/blocks/ProductTabs/ProductTabs";
import NavBar from "@/components/ui/NavBar/NavBar";
import { API } from "@/constants/constants";
import { FullCategoryInfo } from "@/types/types.categories";
import { Product } from "@/types/types.products";
import { FetchGet } from "@/utils/utils";
import { Metadata } from "next";

export async function generateMetadata(params: {params: Promise<{cid: string, pid: string}>}): Promise<Metadata>{
	const {pid} = await params.params;
	const [product] = await FetchGet(`${API}/products?ids=${pid}`).then((res) => res.json()) as Product[];
	return {
		title: product.name
	}
}

export default async function ProductPage(promise : {params: Promise<{cid: string, pid: string}>}){
	const {cid, pid} = await promise.params;
	
	const category = await FetchGet(`${API}/categories/${cid}`).then((res) => res.json()) as FullCategoryInfo;
	const [product] = await FetchGet(`${API}/products?ids=${pid}`).then((res) => res.json()) as Product[];
	
	return(
		<>
			<NavBar className="px-4! 800:px-25!" targetRoutes={[{name: category.name, href: `/catalog/${category._id}`}, {name: product.name, href: ''}]}/>
			<ProductInfo product={product}/>
			<ProductTabs product={product}/>
			<RecentlyViewedSlider/>
			<CategoryDescription category={category}/>
			<Feedback/>
		</>
	)
}
import Categories from "@/components/blocks/Categories/Categories";
import NavBar from "@/components/ui/NavBar/NavBar";
import { API } from "@/constants/constants";
import { FetchGet } from "@/utils/utils";

export default async function Catalog(){

	const categories = await FetchGet(`${API}/categories`).then(res => res.json());

	return(
		<>	
			<NavBar/>
			<Categories categories={categories}/>
		</>
	)
}
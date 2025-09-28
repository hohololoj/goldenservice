import { CategoryList } from "@/types/types.categories";
import Image from "next/image";
import Link from "next/link";

interface Props{
	categories: CategoryList
}

export default function Categories(props: Props){
	return(
		<div className="w-full mt-5 flex flex-col items-center gap-16 px-4 700:px-25 mb-25">

			<h1 className="text-[22px] 550:text-[44px] font-semibold leading-[34px] 550:leading-[62px]">Категории</h1>

			<div className="w-full h-fit grid auto-rows-auto gap-x-[30px] gap-y-[50px] justify-center
							1230:grid-cols-4
							930:grid-cols-3
							grid-cols-2">
				
				{props.categories.map((category) => {
					return(
						<Link href={`/catalog/${category._id}`} key={category._id} className="w-full h-full flex flex-col gap-4 items-center">
							<Image src={`/api/cdn/categories/${category.img}`} alt="category-image" style={{aspectRatio: "288/300"}} width={288} height={300}/>
							<p className="text-sm 550:text-base leading-6 550:leading-[26px] font-medium 550:font-normal">{category.name}</p>
						</Link>
					)
				})}

			</div>

		</div>
	)
}
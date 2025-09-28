import Button from "@/components/ui/Button/Button"
import { CategoryList } from "@/types/types.categories"
import Image from "next/image"
import ButtonLink from "@/components/ui/ButtonLink/ButtonLink";
import Link from "next/link";

interface Props{
	categories: CategoryList
}

export default function CategoriesPreview(props: Props){

	function fillCategories(){
		const jsx = [];

		for(let i = 0; i < 4; i++){
			jsx.push(
				<Link href={`/catalog/${props.categories[i]._id}`} className="w-full h-full p-0 930:p-10 flex flex-col items-center 930:block relative" key={props.categories[i]._id}>

					<Image src={`/api/cdn/categories/${props.categories[i].img}`} alt="" width={340} height={330} className="object-contain w-fit 930:h-[80%] 930:absolute right-0 top-0"/>
					<div className="flex flex-col gap-4 items-start self-start 930:absolute bottom-0 left-0 z-1">
						<p className="text-base 930:text-[22px] font-regular 930:font-medium leading-[24px] 930:leading-[34px]">{props.categories[i].name}</p>
						<Button className="hidden 930:block bg-white text-black! border-1 border-black rounded-[2px] py-3 px-[78px]">Перейти</Button>
					</div>

				</Link>
			)
		}

		return jsx
	}

	return(
		<div className="mt-[100px] w-full flex flex-col gap-16 items-center">

			<h2 className="text-[22px] 930:text-[44px] font-semibold leading-[34px] 930:leading-[62px]">Категории</h2>
			
			<div className="w-full h-fit px-4 930:px-[100px] grid grid-cols-2 grid-rows-2 930:grid-rows-[470px_470px]">

				{fillCategories()}

			</div>

			<div className="px-4 w-full 930:w-fit self-center">
				<ButtonLink href="/catalog" buttonClassName="flex w-full justify-center 930:block 930:w-fit py-3 px-[57px]">Все категории</ButtonLink>
			</div>

		</div>
	)
}
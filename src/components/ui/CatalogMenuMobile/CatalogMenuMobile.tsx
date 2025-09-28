'use client'

import { CategoryList } from "@/types/types.categories"
import Image from "next/image"
import Link from "next/link"

interface Props{
	active: boolean,
	onClose: Function,
	categories: CategoryList,
	onNavigate: Function
}
export default function CatalogMenuMobile(props: Props){
	return(
		<div className={`w-[100dvw] h-[100dvh] grid fixed transition-all duration-500 linear top-0 bg-white ${props.active ? 'left-0' : 'left-[-100dvw]'}`}>
			<div className="overflow-auto flex flex-col">

				<div className="w-full h-fit flex justify-center items-center relative py-5 border-b-1 border-light-gray" onClick={() => {props.onClose()}}>
					<p className="text-xl font-medium absolute left-4 select-none">{'<'}</p>
					<p className="text-2xl font-medium">Каталог</p>
				</div>

				<div className="w-full h-fit py-6 px-4 grid grid-cols-2 auto-rows-[200px] gap-y-6 gap-x-5">

					{props.categories.map((category) => {
						return(
							<Link onClick={() => {props.onNavigate()}} href={`/catalog/${category._id}`} className="w-full h-full flex flex-col gap-3 relative items-center" key={category._id}>
								<Image src={`/api/cdn/categories/${category.img}`} alt={category.name} style={{height: "161px", width: "auto"}} width={161} height={161}/>
								<p className="max-w-full font-medium text-sm">{category.name}</p>
							</Link>
						)
					})}
					
				</div>

			</div>
		</div>
	)
}
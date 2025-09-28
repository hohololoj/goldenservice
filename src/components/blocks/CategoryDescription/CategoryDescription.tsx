import { FullCategoryInfo } from "@/types/types.categories"
import Image from "next/image";

interface Props{
	category: FullCategoryInfo
}

function Title(props: {children: string}){
	return(
		<h2 className="text-base 550:text-[32px] font-bold leading-[26px] 550:leading-[42px] mt-6">{props.children}</h2>
	)
}
function SubTitle(props: {children: string}){
	return(
		<h3 className="text-base 550:text-[28px] font-semibold leading-[30px] 550:leading-[35px] mt-4">{props.children}</h3>
	)
}
function Text(props: {children: string}){
	return(
		<p className="text-sm 550:text-lg font-normal leading-6 550:leading-[32px] mt-2">{props.children}</p>
	)
}

export default function CategoryDescription(props: Props){

	const description = props.category.description;

	function fillDescription(){
		return description.map((descriptionItem, i) => {
			switch(descriptionItem.type){
				case 'title':{
					return <Title key={i}>{descriptionItem.content}</Title>
				}
				case 'subtitle':{
					return <SubTitle key={i}>{descriptionItem.content}</SubTitle>
				}
				case 'text':{
					return <Text key={i}>{descriptionItem.content}</Text>
				}
			}
		})
	}

	return(
		<div className="mt-25 800:px-25 px-4 700:block flex flex-col">
			<Image src={`/api/cdn/categories/${props.category.img}`} alt="category-img" width={605} height={564} className="object-contain object-center float-right 
			1100:w-auto
			700:w-[65%]
			w-full" style={{aspectRatio: '605/564'}}/>
			{fillDescription()}
		</div>
	)
}
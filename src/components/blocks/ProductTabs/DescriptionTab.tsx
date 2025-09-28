import Image from "next/image"

interface Props{
	description: {type: string, content: string}[],
	img: string,
	className?: string
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

export default function DescriptionTab(props: Props){

	function fillDescriptionContent(){
		return props.description.map((descriptionItem, i) => {
			switch(descriptionItem.type){
				case 'title':{
					return(
						<Title key={i}>{descriptionItem.content}</Title>
					)
				}
				case 'subtitle':{
					return(
						<SubTitle key={i}>{descriptionItem.content}</SubTitle>
					)
				}
				case 'text': {
					return(
						<Text key={i}>{descriptionItem.content}</Text>
					)
				}
			}
		})
	}

	return(
		<div className={`w-full h-auto grid grid-cols-1 930:grid-cols-[1fr_0.75fr] gap-x-[30px]${props.className ? (' '+props.className) : ''}`}>
			<div className="flex flex-col h-auto justify-center order-2 930:order-1">
				{fillDescriptionContent()}
			</div>
			<Image src={`/api/cdn/${props.img}`} alt="product-poster" width={500} height={600} style={{aspectRatio: "500/600"}} className="w-auto 930:w-full h-auto object-contain object-center order-1 930:order-2"/>
		</div>
	)
}
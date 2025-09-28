interface Props{
	properties: {[key: string]: string},
	className?: string
}
export default function CharacteristicsTab(props: Props){
	return(
		<div className={`w-full h-auto grid auto-rows-[auto] gap-x-[30px]
			1500:grid-cols-3
			600:grid-cols-2
			grid-cols-1
		${props.className ? (' '+props.className) : ''}`}>

			{Object.keys(props.properties).map((key) => {
				return(
					<div key={key} className="w-full h-full px-3 py-4 grid grid-cols-[1fr_auto] gap-x-[30px] items-center">
						<p className="text-sm 550:text-base font-medium leading-6 550:leading-[26px]">{key}</p>
						<p className="text-xs 550:text-sm font-normal leading-5 550:leading-6 text-gray">{props.properties[key]}</p>
					</div>
				)
			})}

		</div>
	)
}
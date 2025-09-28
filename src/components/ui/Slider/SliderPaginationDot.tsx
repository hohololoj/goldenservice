interface Props{
	active?: boolean,
	slideNum: number,
	onClick: (n: number) => void
}

export default function SliderPaginationDot(props: Props){
	const width = props.active ? 8 : 6;
	const bg = props.active ? 'main' : 'light-blue';
	const border = props.active ? 'border-[2px] border-transparent' : 'border-0'
	const dotWidth = props.active ? '24px' : '6px'; 

	function handlePaginationClick(){
		props.onClick(props.slideNum)
	}

	return(
		<div className={`w-[${width}px] h-[${width}px] bg-${bg} rounded cursor-pointer relative ${border} flex justify-center items-center transition-all duration-300 parabola`}>
			<div onClick={() => {handlePaginationClick()}} style={{width: dotWidth, height: dotWidth}} className="absolute rounded-full border-1 border-light-blue transition-all duration-300 parabola"></div>
		</div>
	)
}
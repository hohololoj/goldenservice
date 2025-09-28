import Image from "next/image"

import video from './video.png'

const style = {
	background: `
		no-repeat left top url('pattern-1.png'),
		no-repeat right bottom url('pattern-2.png')
	`
}

export default function AboutPromo(){
	return(
		<div className="w-full px-4 930:px-25 grid grid-cols-1 1400:grid-cols-[auto_auto] grid-rows-[260px] 700:grid-rows-[486px] gap-x-20 items-center">
			
			<div style={{...style, aspectRatio: '605/425'}} className="w-full h-full bg-no-repeat! bg-contain p-[10px] 750:p-[30px] bg-container">
				<Image src={video} alt="video" width={605} height={425} style={{aspectRatio: '605/425'}} className="w-full h-full object-cover"/>
			</div>

			<div className="flex flex-col items-start gap-3">
				
				<div className="flex flex-col items-center">
					<p className="w-fit text-sm 700:text-lg font-normal leading-6 700:leading-[38px] tracking-[6%] 700:tracking-[9%] uppercase text-main">о нас</p>
					<div className="w-[60px] h-[2px] bg-main rounded-4xl"></div>
				</div>

				<h1 className="flex gap-7 text-[22px] 700:text-[44px] font-semibold leading-[34px] 700:leading-[62px] mt-1">Компания <span className="text-main">Golden Soft</span></h1>

				<p className="text-sm font-normal leading-[22px] 700:leading-6 max-w-[420px]">Sit tempor ante justo amet duis. Ultricies cras eleifend elit, posuere et risus non. Id et ut pellentesque consequat, amet erat gravida euismod pharetra.</p>
				
			</div>
			
		</div>
	)
}
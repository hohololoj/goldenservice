import Image from "next/image";

import iconQuotes from './icon-quotes.svg';
import poster from './poster.png';
import subPoster from './subposter.png'

const style = {
	background: `
		no-repeat left top url('pattern-1.png'),
		no-repeat right bottom url('pattern-2.png')
	`
}

export default function AboutMission() {
	return (
		<div className="mt-10 700:mt-25" >
			<div className="w-full px-4 930:px-25 grid grid-cols-1 1400:grid-cols-[max-content_665px] grid-rows-[260px] 700:grid-rows-[486px] gap-x-20 justify-between items-center">

				<div className="flex flex-col items-start gap-3">

					<div className="flex w-fit flex-col items-center">
						<p className="w-fit text-sm 700:text-lg font-normal leading-6 700:leading-[38px] tracking-[6%] 700:tracking-[9%] uppercase text-main">наша миссия</p>
						<div className="w-full h-[2px] bg-main rounded-4xl"></div>
					</div>

					<Image src={iconQuotes} alt="icon-quotes" width={32} height={32}/>

					<p className="text-base 700:text-2xl font-normal italic leading-[24px] 700:leading-6 max-w-[420px] text-gray">Sit tempor ante justo amet duis. Ultricies cras eleifend elit, posuere et risus non. Id et ut pellentesque consequat, amet erat gravida euismod pharetra.</p>

				</div>

				<div style={{ ...style, aspectRatio: '605/425' }} className="w-full h-full bg-no-repeat! bg-contain p-[10px] 750:p-[30px] bg-container relative">
					<Image src={poster} alt="poster" width={605} height={425} style={{ aspectRatio: '605/425' }} className="w-full h-full object-cover" />
					<Image src={subPoster} alt="subposter" width={202} height={208} style={{aspectRatio: '202/280'}} className="w-[106px] 600:w-[150px] 750:w-[202px] h-auto border-r-[6px] border-t-[6px] border-white absolute left-0 bottom-0"/>
				</div>

			</div>
		</div>
	)
}
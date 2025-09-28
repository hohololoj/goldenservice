'use client'
import Image from "next/image";
import { useState } from "react";

interface Props{
	poster: string,
	imgs: string[],
}
export default function Gallery(props: Props){
	const [activeImage, setActiveImage] = useState(props.poster);
	const images = [props.poster, ...props.imgs];
	return(
		<div className="w-full h-fit grid grid-cols-1 grid-rows-[auto_auto] 550:grid-rows-[513px_133px] gap-y-5">
			
			<div className="w-full h-fit 550:h-full flex items-center justify-center">
				{images.map((img) => {
					return <Image key={`main-${img}`} src={`/api/cdn/${img}`} alt="poster" width={605} height={513} style={{aspectRatio: '605/513', display: activeImage === img ? 'block' : 'none'}} className="w-full 550:w-auto h-auto 550:h-full object-contain object-center"/>
				})}
			</div>

			<div className="w-full h-full grid grid-rows-[1fr] grid-cols-3 550:auto-cols-max grid-flow-col justify-center gap-x-3">
				{images.map((img) => {
					return <Image loading="lazy" onClick={() => {setActiveImage(img)}} key={`thumb-${img}`} src={`/api/cdn/${img}`} alt="poster" width={142} height={133} style={{aspectRatio: '142/133'}} className="cursor-pointer w-auto h-full max-h-[133px] object-contain object-center"/>
				})}
			</div>

		</div>
	)
}
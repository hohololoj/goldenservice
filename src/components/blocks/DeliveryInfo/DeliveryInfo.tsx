import Image from "next/image";

import posterPost from './poster-post.webp';
import posterDelline from './poster-delline.webp';
import posterSdek from './poster-sdek.webp';
import logoPost from './logo-post.svg';
import logoDelline from './logo-delline.jpg';
import logoSdek from './logo-sdek.svg';
import iconChecked from './icon-checked.svg';

export default function DeliveryInfo(){
	return(
		<div className="flex flex-col gap-6 px-4 600:px-12 1050:px-25">
			<h2 className="text-2xl 700:text-[32px] font-bold leading-[26px] 700:leading-[42px]">Доставка</h2>

			<div className="w-full grid grid-cols-1 1230:grid-cols-3 gap-x-[30px] gap-y-6 pb-8 700:pb-10 border-b-1 border-light-gray">

				<div className="w-full flex flex-col pt-[18px] 600:pt-[26px] gap-2 relative">
					<Image src={logoPost} alt="logo-post" width={123} height={53} style={{aspectRatio: '123/53'}} className="absolute right-4 top-0 w-[100px] 600:w-[123px]"/>
					<Image src={posterPost} alt="poster-post" width={393} height={212} style={{aspectRatio: '393/212'}} className="w-full object-contain object-center"/>
					<div className="mt-[6px] 700:mt-2 flex gap-4 items-center">
						<div className="w-[2px] h-5 bg-main"></div>
						<h2 className="text-base 700:text-xl font-medium leading-[26px] 700:leading-[30px]">Почта России</h2>
					</div>
					<div className="mt-1 700:mt-0 flex flex-col gap-2 700:gap-3">
						<div className="flex gap-2 items-center">
							<Image src={iconChecked} alt="icon-checked" width={14} height={14} style={{aspectRatio: '1/1'}}/>
							<p className="text-xs 700:text-sm font-normal leading-5 text-gray">Получение посылки согласно условиям перевозчика</p>
						</div>
						<div className="flex gap-2 items-center">
							<Image src={iconChecked} alt="icon-checked" width={14} height={14} style={{aspectRatio: '1/1'}}/>
							<p className="text-xs 700:text-sm font-normal leading-5 text-gray">Доставка в течении 1-2 дней</p>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col pt-[18px] 600:pt-[26px] gap-2 relative">
					<Image src={logoDelline} alt="logo-post" width={123} height={53} style={{aspectRatio: '123/53'}} className="absolute right-4 top-0 w-[100px] 600:w-[123px]"/>
					<Image src={posterDelline} alt="poster-post" width={393} height={212} style={{aspectRatio: '393/212'}} className="w-full object-contain object-center"/>
					<div className="mt-[6px] 700:mt-2 flex gap-4 items-center">
						<div className="w-[2px] h-5 bg-main"></div>
						<h2 className="text-base 700:text-xl font-medium leading-[26px] 700:leading-[30px]">Деловые линии</h2>
					</div>
					<div className="mt-1 700:mt-0 flex flex-col gap-2 700:gap-3">
						<div className="flex gap-2 items-center">
							<Image src={iconChecked} alt="icon-checked" width={14} height={14} style={{aspectRatio: '1/1'}}/>
							<p className="text-xs 700:text-sm font-normal leading-5 text-gray">Получение посылки согласно условиям перевозчика</p>
						</div>
						<div className="flex gap-2 items-center">
							<Image src={iconChecked} alt="icon-checked" width={14} height={14} style={{aspectRatio: '1/1'}}/>
							<p className="text-xs 700:text-sm font-normal leading-5 text-gray">Доставка в течении 1-2 дней</p>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col pt-[18px] 600:pt-[26px] gap-2 relative">
					<Image src={logoSdek} alt="logo-post" width={123} height={53} style={{aspectRatio: '123/53'}} className="absolute right-4 top-0 w-[100px] 600:w-[123px]"/>
					<Image src={posterSdek} alt="poster-post" width={393} height={212} style={{aspectRatio: '393/212'}} className="w-full object-contain object-center"/>
					<div className="mt-[6px] 700:mt-2 flex gap-4 items-center">
						<div className="w-[2px] h-5 bg-main"></div>
						<h2 className="text-base 700:text-xl font-medium leading-[26px] 700:leading-[30px]">СДЭК</h2>
					</div>
					<div className="mt-1 700:mt-0 flex flex-col gap-2 700:gap-3">
						<div className="flex gap-2 items-center">
							<Image src={iconChecked} alt="icon-checked" width={14} height={14} style={{aspectRatio: '1/1'}}/>
							<p className="text-xs 700:text-sm font-normal leading-5 text-gray">Получение посылки согласно условиям перевозчика</p>
						</div>
						<div className="flex gap-2 items-center">
							<Image src={iconChecked} alt="icon-checked" width={14} height={14} style={{aspectRatio: '1/1'}}/>
							<p className="text-xs 700:text-sm font-normal leading-5 text-gray">Доставка в течении 1-2 дней</p>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}
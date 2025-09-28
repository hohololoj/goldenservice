import Slider from "@/components/ui/Slider/Slider";

import poster from './poster.jpg';
import radissonLogo from './radisson-logo.svg'
import iconChecked from './icon-checked.svg';

import Image from "next/image";

export default function OurProjects(){
	return(
		<div className="w-screenSmart mt-25 flex flex-col gap-6 700:gap-16">
			<h2 className="text-[22px] 700:text-[44px] font-semibold leading-[34px] 700:leading-[62px] px-4 750:px-14 1400:ml-25">Наши крупные проекты</h2>
			<Slider sliderName="slider-projects" slideWidth="(100vw - var(--scrollbar-width))">
				<div className="w-screenSmart flex flex-col 930:flex-row justify-center gap-10 items-center px-4 750:px-0">
					<Image src={poster} alt="poster" width={511} height={328} style={{aspectRatio: '511/328'}}/>
					<div className="flex flex-col gap-8 max-w-[560px]">
						<Image src={radissonLogo} alt="radisson-logo" width={163.75} height={40} style={{aspectRatio: '163.75/40'}}/>
						<div className="flex flex-col gap-4">
							<h3 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Проект для гостиницы Radisson Hotels</h3>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Установлено 123 Вариативных замка Golden Soft для отеля</p>
							</div>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Было нанесено личный брендинг на все замки</p>
							</div>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Были проведны монтажные работы, также была произведена помощь в подключении замков к системе</p>
							</div>
							<h3 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Бюджет - <span className="text-main">$5000</span></h3>
						</div>
					</div>
				</div>
				<div className="w-screenSmart flex flex-col 930:flex-row justify-center gap-10 items-center px-4 750:px-0">
					<Image src={poster} alt="poster" width={511} height={328} style={{aspectRatio: '511/328'}}/>
					<div className="flex flex-col gap-8 max-w-[560px]">
						<Image src={radissonLogo} alt="radisson-logo" width={163.75} height={40} style={{aspectRatio: '163.75/40'}}/>
						<div className="flex flex-col gap-4">
							<h3 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Проект для гостиницы Radisson Hotels</h3>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Установлено 123 Вариативных замка Golden Soft для отеля</p>
							</div>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Было нанесено личный брендинг на все замки</p>
							</div>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Были проведны монтажные работы, также была произведена помощь в подключении замков к системе</p>
							</div>
							<h3 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Бюджет - <span className="text-main">$5000</span></h3>
						</div>
					</div>
				</div>
				<div className="w-screenSmart flex flex-col 930:flex-row justify-center gap-10 items-center px-4 750:px-0">
					<Image src={poster} alt="poster" width={511} height={328} style={{aspectRatio: '511/328'}}/>
					<div className="flex flex-col gap-8 max-w-[560px]">
						<Image src={radissonLogo} alt="radisson-logo" width={163.75} height={40} style={{aspectRatio: '163.75/40'}}/>
						<div className="flex flex-col gap-4">
							<h3 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Проект для гостиницы Radisson Hotels</h3>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Установлено 123 Вариативных замка Golden Soft для отеля</p>
							</div>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Было нанесено личный брендинг на все замки</p>
							</div>
							<div className="flex gap-3 items-center">
								<Image src={iconChecked} alt="icon-checked" width={16} height={16} style={{aspectRatio: '1/1'}}/>
								<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Были проведны монтажные работы, также была произведена помощь в подключении замков к системе</p>
							</div>
							<h3 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Бюджет - <span className="text-main">$5000</span></h3>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	)
}
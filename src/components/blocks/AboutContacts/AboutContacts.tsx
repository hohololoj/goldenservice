import AboutContactsFeedbackForm from "./AboutContactsFeedbackForm/AboutContactsFeedbackForm";

import poster1 from './poster-1.png';
import poster2 from './poster-2.png';
import poster3 from './poster-3.png';
import Image from "next/image";

export default function AboutContacts(){
	return(
		<div className="w-full px-4 930:px-25 py-14 700:py-25 mt-0 700:mt-25 grid grid-cols-1 1200:grid-cols-5 gap-x-10 1300:gap-x-20 h-auto 1200:h-[556px] grid-rows-[1fr] gap-y-8 min-h-0">
			
			<div className="col-[1] 1200:col-[1/3] w-full h-full max-h-[356px] flex flex-col gap-8">

				<div className="flex flex-col gap-6 h-fit">
					<h3 className="text-[22px] 700:text-2xl font-bold leading-[34px] 700:leading-[42px]">Остались вопросы?</h3>
					<p className="text-sm 700:text-base font-normal leading-8 700:leading-[26px] text-gray">Если у вас возникли какие-то вопросы по поводу оптовых заказов, заполните форму и мы Вам перезвоним.</p>
				</div>

				<AboutContactsFeedbackForm/>

			</div>

			<div className="col-[1] 1200:col-[3/6] h-full max-h-[356px] flex flex-col gap-6">

				<h2 className="text-[22px] 700:text-[32px] font-bold leading-[34px] 700:leading-[42px]">Контакты</h2>

				<div className="grid grid-cols-2 700:grid-cols-3 gap-y-4 gap-x-4">

					<div className="grid h-full grid-rows-2 grid-cols-1 700:grid-rows-[1fr_2fr]">
						<div className="flex flex-col gap-4 justify-between w-fit h-full">
							<h4 className="w-fit text-base 700:text-lg font-semibold leading-[26px] 700:leading-7">Наш адрес</h4>
							<p className="w-fit text-sm 700:text-base font-normal leading-5 700:leading-[26px]">Россия, Ростов-на-Дону ул. Богачева, 16</p>
						</div>
						<div className="w-full h-full relative">
							<Image src={poster1} alt="poster1" style={{aspectRatio: '209/156'}} fill={true} className="object-cover object-center"/>
						</div>
					</div>

					<div className="grid h-full grid-rows-2 grid-cols-1 700:grid-rows-[1fr_2fr]">
						<div className="flex flex-col gap-4 justify-between items-center w-full h-full">
							<h4 className="w-fit text-base 700:text-lg font-semibold leading-[26px] 700:leading-7">Телефоны</h4>
							<p className="w-fit text-sm 700:text-base font-normal leading-5 700:leading-[26px] text-center">+7 (988) 565 00 38<br/>+375 33 662 82 56</p>
						</div>
						<div className="w-full h-full relative">
							<Image src={poster2} alt="poster2" style={{aspectRatio: '209/156'}} fill={true} className="object-cover object-center"/>
						</div>
					</div>

					<div className="grid h-full grid-rows-2 grid-cols-1 700:grid-rows-[1fr_2fr]">
						<div className="flex flex-col gap-4 justify-between w-full items-end h-full">
							<h4 className="w-fit text-base 700:text-lg font-semibold leading-[26px] 700:leading-7">Email</h4>
							<p className="w-fit text-sm 700:text-base font-normal leading-5 700:leading-[26px] text-right">vladpertcev@mail.ru<br/>korobko416@gmail.com</p>
						</div>
						<div className="w-full h-full relative">
							<Image src={poster3} alt="poster3" style={{aspectRatio: '209/156'}} fill={true} className="object-cover object-center"/>
						</div>
					</div>

				</div>
				
			</div>
			
		</div>
	)
}
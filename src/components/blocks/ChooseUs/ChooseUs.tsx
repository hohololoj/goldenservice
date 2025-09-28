import Image from "next/image";

import chooseUpPoster from './poster.jpg';

import iconRefund from './icon-refund.svg';
import iconInstall from './icon-install.svg';
import iconBrand from './icon-brand.svg';

export default function ChooseUs(){
	return(
		<div className="w-full flex flex-col gap-5 700:gap-16 mt-16 700:mt-25">
			
			<h1 className="text-[22px] 700:text-[44px] font-semibold leading-[34px] 700:leading-[62px] ml-4 750:ml-14 1400:ml-25">Почему стоит выбрать нас</h1>

			<div className="w-full grid grid-cols-[1fr] 1100:grid-cols-[auto_1fr] 1450:grid-cols-[1fr_auto] gap-x-10 1450:gap-x-20 items-center justify-center px-4 750:px-14 1100:px-0 gap-y-[30px]">
			
				<Image src={chooseUpPoster} alt="choose-us-poster" width={705} height={560} style={{aspectRatio: "705/560"}} className="w-full h-auto object-contain object-center"/>

				<div className="w-fit flex flex-col gap-1 pr-4 justify-self-center 1450:pr-25">
					
					<div className="flex gap-4 items-center">
						<Image src={iconRefund} alt="icon-refund" width={56} height={56} style={{aspectRatio: '1/1'}} className="w-[42px] 700:w-[56px]"/>
						<h3 className="text-base 700:text-xl font-semibold leading-[26px] 700:leading-8">Возврат удвоенной стоимости</h3>
					</div>
					<div className="flex pl-[21px] 700:pl-[28px] gap-[44px]">
						<div className="w-[2px] h-[76px] bg-[#C4CDD5]"></div>
						<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px] max-w-[480px]">За каждый отправленный товар который окажется бракованным мы вернем вам двойную стоимость.</p>
					</div>
					
					<div className="flex gap-4 items-center">
						<Image src={iconInstall} alt="icon-install" width={56} height={56} style={{aspectRatio: '1/1'}} className="w-[42px] 700:w-[56px]"/>
						<h3 className="text-base 700:text-xl font-semibold leading-[26px] 700:leading-8">Монтаж</h3>
					</div>
					<div className="flex pl-[21px] 700:pl-[28px] gap-[44px]">
						<div className="w-[2px] h-[76px] bg-[#C4CDD5]"></div>
						<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px] max-w-[480px]">Проводим монтажные работы любой сложности и в любое удобное для Вас время</p>
					</div>

					<div className="flex gap-4 items-center">
						<Image src={iconBrand} alt="icon-brand" width={56} height={56} style={{aspectRatio: '1/1'}} className="w-[42px] 700:w-[56px]"/>
						<h3 className="text-base 700:text-xl font-semibold leading-[26px] 700:leading-8">Брендирование продукта</h3>
					</div>
					<div className="flex pl-[21px] 700:pl-[28px] gap-[44px]">
						<div className="w-[2px] h-[76px] bg-[#C4CDD5]"></div>
						<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px] max-w-[480px]">Мы нанесем Ваш логотип любой сложности на свою продукцию, чтобы прибавить ей эксклюзивности </p>
					</div>
					
					<div className="flex gap-4 items-center">
						<Image src={iconBrand} alt="icon-brand" width={56} height={56} style={{aspectRatio: '1/1'}} className="w-[42px] 700:w-[56px]"/>
						<h3 className="text-base 700:text-xl font-semibold leading-[26px] 700:leading-8">Брендирование продукта</h3>
					</div>
					<div className="flex pl-[21px] 700:pl-[28px] gap-[44px]">
						<div className="w-[2px] h-[76px] bg-transparent"></div>
						<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px] max-w-[480px]">Мы нанесем Ваш логотип любой сложности на свою продукцию, чтобы прибавить ей эксклюзивности </p>
					</div>

				</div>

			</div>

		</div>
	)
}
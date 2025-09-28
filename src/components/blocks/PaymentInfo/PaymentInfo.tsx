import Image from "next/image";

import iconCard from './icon-card.svg';
import iconCash from './icon-cash.svg';

export default function PaymentInfo() {
	return (
		<div className="mt-8 700:mt-10 px-4 600:px-12 1050:px-25">
			<div className="w-full flex flex-col gap-4 700:gap-6 pb-8 700:pb-10 border-b-1 border-light-gray">

				<h2 className="text-2xl 700:text-[32px] font-bold leading-[26px] 700:leading-[42px]">Оплата</h2>

				<div className="flex flex-col gap-2 700:gap-3 w-fit max-w-full 1230:max-w-[60%]">
					<div className="flex gap-2 700:gap-3 items-center">
						<Image src={iconCard} alt="icon-card" width={20} height={20} style={{ aspectRatio: '1/1' }} />
						<h3 className="text-base 700:text-xl font-semibold leading-[26px] 700:leading-[30px]">Банковская карта</h3>
					</div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray">Онлайн заказ можно оплатить с помощью банковской карты, выпущенной на территории России. Оформляя заказ на сайте, в пункте «Оплата» выберите «Банковская карта». После переадресации на страницу системы безопасных платежей, необходимо лишь подтвердить платеж.</p>
				</div>

				<div className="flex flex-col gap-3 w-fit max-w-full 1230:max-w-[60%]">
					<div className="flex gap-2 700:gap-3 items-center">
						<Image src={iconCash} alt="icon-card" width={24} height={24} style={{ aspectRatio: '1/1' }} />
						<h3 className="text-base 700:text-xl font-semibold leading-[26px] 700:leading-[30px]">Оплата при получении товара</h3>
					</div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray">Онлайн заказ можно оплатить с помощью банковской карты, выпущенной на территории России. Оформляя заказ на сайте, в пункте «Оплата» выберите «Банковская карта». После переадресации на страницу системы безопасных платежей, необходимо лишь подтвердить платеж.</p>
				</div>

			</div>
		</div>
	)
}
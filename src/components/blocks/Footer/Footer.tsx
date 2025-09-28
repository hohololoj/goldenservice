import Logo from "@/components/ui/Logo/Logo";

import iconVk from './icon-vk.svg';
import iconFacebook from './icon-facebook.svg';
import iconTwitter from './icon-twitter.svg';
import IconLink from "@/components/ui/IconLink/IconLink";
import Link from "next/link";


export default function Footer(){
	return(
		<footer className="w-full bg-[#0D2436] pt-[55px] p-6 700:p-25 pb-0! flex flex-col ">

			<div className="flex flex-col 1100:flex-row gap-6 1100:gap-0 justify-between border-b-1 border-[rgba(255,255,255,0.1)] pb-[50px]">

				<div className="flex flex-row 1100:flex-col justify-between items-center 1100:items-start">
					<Logo className="w-auto h-[57px] 700:h-22" logo="white"/>
					<div className="flex gap-6">
						<IconLink width={26} height={26} href="http://vk.com" src={iconVk}/>
						<IconLink width={26} height={26} href="http://twitter.com" src={iconTwitter}/>
						<IconLink width={26} height={26} href="http://facebook.com" src={iconFacebook}/>
					</div>
				</div>

				<div className="grid grid-cols-[repeat(2,auto)] 1100:grid-cols-[repeat(4,auto)] grid-rows-auto text-white gap-10 1300:gap-x-[97px]">

					<div className="flex flex-col gap-6">
						<h4 className="text-xl 700:text-lg leading-[30px] 700:leading-7 font-medium">Навигация</h4>
						<div className="flex flex-col gap-4">
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/">Главная</Link>
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/catalog">Каталог</Link>
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/bulk">Оптовая продажа</Link>
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/about">О нас</Link>
						</div>
					</div>

					<div className="flex flex-col gap-6">
						<h4 className="text-xl 700:text-lg leading-[30px] 700:leading-7 font-medium">Наши контакты</h4>
						<div className="flex flex-col gap-4">
							<h5 className="text-xs 700:text-sm font-light leading-6 text-light-gray">Телефоны</h5>
							<div className="flex flex-col gap-3">
								<a className="text-sm 700:text-base" href="tel:">+7 (988) 565 00 38</a>
								<a className="text-sm 700:text-base" href="tel:">+375 33 662 82 56</a>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<h5 className="text-xs 700:text-sm font-light leading-6 text-light-gray">Email</h5>
							<div className="flex flex-col gap-3">
								<a className="text-sm 700:text-base" href="mailto:">goldenservice@mail.ru</a>
								<a className="text-sm 700:text-base" href="mailto:">goldenservice@gmail.com</a>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-6">
						<h4 className="text-xl 700:text-lg leading-[30px] 700:leading-7 font-medium">Наш адрес</h4>
						<div className="flex flex-col gap-4">
							<a href="https://yandex.ru/maps/-/CHhJiAmW" target="_blank" className="max-w-[182px] text-sm 700:text-base">Уфа, 50-летия Октября, 34к1</a>
						</div>
					</div>

					<div className="flex flex-col gap-6">
						<h4 className="text-xl 700:text-lg leading-[30px] 700:leading-7 font-medium">Информация</h4>
						<div className="flex flex-col gap-4">
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/delivery">Доставка и оплата</Link>
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/delivery#guaranty">Гарантии</Link>
							<Link className="w-fit border-b-1 border-transparent hover:border-white text-sm 700:text-base" href="/delivery#refund">Возврат товара</Link>
						</div>
					</div>

				</div>

			</div>

			<div className="w-full py-4 700:py-6 flex justify-center">
				<p className="text-xs 700:text-sm font-regular text-light-gray">© 2021 Golden Soft All rights reserved.</p>
			</div>

		</footer>
	)
}
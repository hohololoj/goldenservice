'use client'
import { useState } from "react"
import NavItem from "../NavItem/NavItem"
import PhoneCopyButton from "../PhoneCopyButton/PhoneCopyButton"
import CatalogMenuMobile from "../CatalogMenuMobile/CatalogMenuMobile"
import { CategoryList } from "@/types/types.categories"

interface Props{
	className?: string,
	opened: boolean,
	categories: CategoryList,
	onNavigate: Function
}

export default function BurgerMenu(props: Props){
	const [catalogOpened, setCatalogOpened] = useState(false);

	function handleNavigation(){
		setCatalogOpened(false);
		props.onNavigate();
	}

	return(
		<div className={`bg-white flex flex-col py-6 px-4 justify-between w-screen h-[calc(100dvh-70px)] fixed transition-all transition-750 ease-in z-[49] left-0 ${props.opened ? 'top-[71px]' : 'top-[-100vh]'}`}>
			<div className="flex flex-col gap-4">
				<NavItem onClick={props.onNavigate} href="/">Главная</NavItem>
				<p className="cursor-pointer hover:text-main focus:text-main flex justify-between" onClick={() => {setCatalogOpened((prev) => !prev)}}>
					Каталог <span className="text-xl">{'>'}</span>
				</p>
				<NavItem onClick={props.onNavigate} href="/bulk">Оптовая продажа</NavItem>
				<NavItem onClick={props.onNavigate} href="/about">О нас</NavItem>
			</div>
			<div className="mb-4 flex justify-between">
				<PhoneCopyButton>+7 (966) 55 88 499</PhoneCopyButton>
				<p className="text-main">Обратный звонок</p>
			</div>
			<CatalogMenuMobile active={catalogOpened} categories={props.categories} onNavigate={handleNavigation} onClose={() => {setCatalogOpened(false)}}/>
		</div>
	)
}
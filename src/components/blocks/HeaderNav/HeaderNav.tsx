'use client'
import CatalogMenu from "@/components/ui/CatalogMenu/CatalogMenu";
import NavItem from "@/components/ui/NavItem/NavItem";
import { CategoryList } from "@/types/types.categories";
import { useCallback, useState } from "react";

interface Props{
	mode: 'desktop' | 'mobile',
	categories: CategoryList
}
const modes = {
	desktop: "flex items-center gap-4 930:gap-8",
	mobile: "flex flex-col gap-4"
}

export default function HeaderNav(props: Props){
	const [catalogOpened, setCatalogOpened] = useState(false);
	
	const handleClickAnywhere = useCallback((e: Event) => {}, [])

	function handleCatalogOpenClick(){
		setCatalogOpened((prev) => {
			if(!prev){
				document.addEventListener('click', handleClickAnywhere)
			}
			else{
				document.removeEventListener('click', handleClickAnywhere)
			}
			return !prev
		});
	}

	return(
		<nav className={modes[props.mode]}>
			<NavItem href="/">Главная</NavItem>
			<div className="relative">
				<button onClick={handleCatalogOpenClick} className="flex items-center gap-2 cursor-pointer text-base 930:text-xl hover:text-main">
					Каталог <span className={`text-sm align-middle select-none transition-all duration-250 linear ${catalogOpened ? "rotate-180" : 'rotate-0'}`}>v</span>
				</button>
				<CatalogMenu onClose={() => {handleCatalogOpenClick()}} active={catalogOpened} categories={props.categories}/>
			</div>
			<NavItem href="/bulk">Оптовая продажа</NavItem>
			<NavItem href="/about">О нас</NavItem>
		</nav>
	)
}
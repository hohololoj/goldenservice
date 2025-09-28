'use client'
import { ReactNode, useState } from "react"
import IconButton from "../IconButton/IconButton";

import IconBurger from './icon-burger.svg';
import IconClose from './icon-close.svg';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { CategoryList } from "@/types/types.categories";

interface Props{
	categories: CategoryList
}

export default function BurgerMenuController(props: Props){
	const [isOpened, setIsOpened] = useState(false);
	function toggleOpened(){
		setIsOpened(prev => !prev)
	}
	function handleNavigation(){
		setIsOpened(false)
	}
	return(
		<>
			<IconButton onClick={() => {toggleOpened()}} className={`${!isOpened ? 'block' : 'hidden'} 700:hidden`} width={24} height={24} src={IconBurger}/>
			<IconButton onClick={() => {toggleOpened()}} className={`${isOpened ? 'block' : 'hidden'} 700:hidden`} width={24} height={24} src={IconClose}/>
			<BurgerMenu onNavigate={handleNavigation} opened={isOpened} categories={props.categories}/>
		</>
	)
}
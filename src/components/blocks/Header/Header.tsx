import Logo from "@/components/ui/Logo/Logo";
import Container from "../../ui/Container/Container";
import HeaderNav from "../HeaderNav/HeaderNav";
import PhoneCopyButton from "@/components/ui/PhoneCopyButton/PhoneCopyButton";

import BurgerMenuController from "@/components/ui/BurgerMenuController/BurgerMenuController";
import { CategoryList } from "@/types/types.categories";
import ModalCartWrapper from "@/components/modals/Cart/ModalCartWrapper";
import FavoriteWrapper from "@/components/ui/FavoriteWrapper/FavoriteWrapper";

interface Props{
	categories: CategoryList
}

export default async function Header(props: Props){

	return(
		<header className="bg-white border-b-1 border-b-light-gray">
			<Container className="flex justify-between py-5 px-4 1100:px-25">
				<BurgerMenuController categories={props.categories}/>
				<div className="hidden 700:flex gap-5 930:gap-25 items-center">
					<Logo/>
					<HeaderNav mode="desktop" categories={props.categories}/>
				</div>
				<div className="flex gap-6 930:gap-8 items-center">
					<PhoneCopyButton className="hidden 700:flex">+7 (966) 55 88 499</PhoneCopyButton>
					<div className="flex items-center gap-4 930:gap-6">
						<FavoriteWrapper/>
						<ModalCartWrapper/>
					</div>
				</div>
			</Container>
		</header>
	)
}
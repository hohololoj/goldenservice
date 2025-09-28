'use client'
import IconButton from "@/components/ui/IconButton/IconButton"
import IconCart from './icon-cart.svg';
import ModalCart from "./ModalCart";
import { useEffect, useState } from "react";
import { useCartState } from "@/utils/CartState";

export default function ModalCartWrapper(){
	const [isModalActive, setIsModalActive] = useState(false);
	const [cartLength, setCartLength] = useState<number>(0);
	const {cart} = useCartState();

	useEffect(() => {
		setCartLength(cart.length)
	}, [cart])


	return(
		<>
			<div onClick={() => {setIsModalActive(true)}} className="w-8 h-8 relative">
				<IconButton src={IconCart} alt="IconCart" width={32} height={32}/>
				<div style={{display: cartLength === 0 ? 'none' : 'flex'}} className="w-[18px] h-[18px] rounded-full border-1 border-white bg-main flex items-center justify-center text-xs text-white absolute right-0 top-0 cursor-pointer">
					{cartLength}
				</div>
			</div>
			<ModalCart onClose={() => {setIsModalActive(false)}} active={isModalActive}/>
		</>
	)
}
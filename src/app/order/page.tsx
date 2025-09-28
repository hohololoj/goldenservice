import OrderCreationBlock from "@/components/blocks/OrderCreationBlock/OrderCreationBlock";
import NavBar from "@/components/ui/NavBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Оформление заказа'
}

export default function OrderPage(){
	return(
		<>
			<NavBar targetRoutes={[{name: 'Оформление заказа', href: ''}]}/>
			<OrderCreationBlock/>
		</>
	)
}
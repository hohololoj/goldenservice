import DeliveryInfo from "@/components/blocks/DeliveryInfo/DeliveryInfo";
import GuarantyInfo from "@/components/blocks/GuarantyInfo/GuarantyInfo";
import PaymentInfo from "@/components/blocks/PaymentInfo/PaymentInfo";
import RefundInfo from "@/components/blocks/RefundInfo/RefundInfo";
import NavBar from "@/components/ui/NavBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Доставка и оплата'
}

export default function Delivery(){
	return(
		<>
			<NavBar targetRoutes={[{name: 'Доставка и оплата', href: ''}]}/>
			<DeliveryInfo/>
			<PaymentInfo/>
			<GuarantyInfo/>
			<RefundInfo/>
		</>
	)
}
import BulkOrderInfo from "@/components/blocks/BulkOrderInfo/BulkOrderInfo";
import ChooseUs from "@/components/blocks/ChooseUs/ChooseUs";
import Feedback from "@/components/blocks/Feedback/Feedback";
import HowWeWork from "@/components/blocks/HowWeWork/HowWeWork";
import OurProjects from "@/components/blocks/OurProjects/OurProjects";
import NavBar from "@/components/ui/NavBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Оптовая продажа'
}

export default function Bulk(){
	return(
		<>
			<NavBar targetRoutes={[{name: 'Оптовая продажа', href: ''}]}/>
			<BulkOrderInfo/>
			<HowWeWork/>
			<ChooseUs/>
			<OurProjects/>
			<Feedback/>
		</>
	)
}
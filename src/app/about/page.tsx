import AboutContacts from "@/components/blocks/AboutContacts/AboutContacts"
import AboutMission from "@/components/blocks/AboutMission/AboutMission"
import AboutPromo from "@/components/blocks/AboutPromo/AboutPromo"
import AboutStatistics from "@/components/blocks/AboutStatistics/AboutStatistics"
import NavBar from "@/components/ui/NavBar/NavBar"
import { API } from "@/constants/constants"
import { StatisticsInterface } from "@/types/types.statistics"
import { FetchGet } from "@/utils/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'О нас'
}

export default async function About(){
	const statistics = await FetchGet(`${API}/statistics`).then((res) => res.json()) || {
		clients: 0,
		products: 0,
		avgSales: 0
	} as StatisticsInterface
	return(
		<>
			<NavBar targetRoutes={[{name: 'О нас', href: ''}]}/>
			<AboutPromo/>
			<AboutStatistics statistics={statistics}/>
			<AboutMission/>
			<AboutContacts/>
		</>
	)
}
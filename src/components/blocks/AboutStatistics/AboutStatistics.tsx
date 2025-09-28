import { StatisticsInterface } from "@/types/types.statistics"

interface Props{
	statistics: StatisticsInterface
}
export default function AboutStatistics(props: Props){
	return(
		<div className="w-full bg-[#0D2436] mt-15 700:mt-25 py-8 700:py-25 grid grid-cols-[repeat(2,max-content)] 700:grid-cols-[repeat(4,max-content)] gap-x-6 850:gap-x-[75px] 1050:gap-x-[125px] gap-y-8 justify-center">

			<div className="flex flex-col gap-3 items-center">
				<h2 className="text-5xl 700:text-7xl font-semibold leading-[58px] 700:leading-[72px] text-white">{props.statistics.clients}</h2>
				<p className="text-sm 700:text-lg font-normal leading-[22px] 700:leading-8 text-white">Счастливых клиентов</p>
			</div>
			
			<div className="flex flex-col gap-3 items-center">
				<h2 className="text-5xl 700:text-7xl font-semibold leading-[58px] 700:leading-[72px] text-white">{props.statistics.products}</h2>
				<p className="text-sm 700:text-lg font-normal leading-[22px] 700:leading-8 text-white">Продуктов на выбор</p>
			</div>

			<div className="flex flex-col gap-3 items-center">
				<h2 className="text-5xl 700:text-7xl font-semibold leading-[58px] 700:leading-[72px] text-white">{Math.ceil(props.statistics.avgSales)}</h2>
				<p className="text-sm 700:text-lg font-normal leading-[22px] 700:leading-8 text-white">Продаж в день</p>
			</div>

			<div className="flex flex-col gap-3 items-center">
				<h2 className="text-5xl 700:text-7xl font-semibold leading-[58px] 700:leading-[72px] text-white">20</h2>
				<p className="text-sm 700:text-lg font-normal leading-[22px] 700:leading-8 text-white">Лет на рынке</p>
			</div>

		</div>
	)
}
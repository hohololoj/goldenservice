import { API, BFF } from "@/constants/constants";
import { StatisticsInterface } from "@/types/types.statistics";
import { FetchGet } from "@/utils/utils"

export default async function Statistics(){
	
	const res = await FetchGet(`${API}/statistics`);
	const statistics = await res.json() as StatisticsInterface;

	return(
		<div className="w-full py-10 grid grid-cols-2 gap-x-5 px-8 800:px-0 800:flex 800:justify-center gap-[82px]">
			
			<div className="flex flex-col gap-4 items-center">
				<h3 className="text-center text-[32px] font-semibold leading-[38px]">{statistics.clients}</h3>
				<p className="text-center font-semibold leading-[26px] text-gray">Счастливых клиентов</p>
			</div>

			<div className="flex flex-col gap-4 items-center">
				<h3 className="text-center text-[32px] font-semibold leading-[38px]">{statistics.products}</h3>
				<p className="text-center font-semibold leading-[26px] text-gray">Продуктов на выбор</p>
			</div>

			<div className="flex flex-col gap-4 items-center">
				<h3 className="text-center text-[32px] font-semibold leading-[38px]">{Math.floor(statistics.avgSales)}</h3>
				<p className="text-center font-semibold leading-[26px] text-gray">Продаж в день</p>
			</div>

			<div className="flex flex-col gap-4 items-center">
				<h3 className="text-center text-[32px] font-semibold leading-[38px]">20</h3>
				<p className="text-center font-semibold leading-[26px] text-gray">Лет на рынке</p>
			</div>

		</div>
	)
}
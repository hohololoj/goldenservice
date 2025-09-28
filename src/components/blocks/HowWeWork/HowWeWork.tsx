import posterBid from './bid.jpg';
import posterAgreement from './agreement.jpg';
import posterSending from './sending.jpg';
import Image from "next/image";

export default function HowWeWork(){
	return(
		<div className="mt-[100px] px-4 750:px-14 1400:px-25 flex flex-col gap-3 930:gap-12">
			<h2 className="text-[22px] 700:text-[44px] font-semibold leading-[34px] 700:leading-[62px]">Как мы работаем</h2>
			<div className="w-full grid grid-cols-1 930:grid-cols-3 gap-x-[30px] gap-y-4">
				
				<div className="w-full pt-6 flex flex-col relative gap-3">

					<div className="absolute w-12 h-12 right-[10px] top-[14px] flex items-center justify-center bg-main">
						<p className="text-xl font-medium leading-[30px] text-white">1</p>
					</div>

					<Image src={posterBid} alt="poster-bid" width={393} height={260} className="object-contain object-center w-full" style={{aspectRatio: "393/260"}}/>

					<div className="flex items-center h-fit gap-[10px]">
						<div className="h-[20px] w-[2px] bg-main"></div>
						<h3 className="text-base 1050:text-xl font-medium leading-[26px] 700:leading-[30px]">Оформление заявки</h3>
					</div>

					<p className="text-sm font-normal leading-6 text-gray">Вы оставляете заявку на сайте или связываетесь с нами по указанному на сайте номеру телефона</p>

				</div>

				<div className="w-full pt-6 flex flex-col relative gap-3">

					<div className="absolute w-12 h-12 right-[10px] top-[14px] flex items-center justify-center bg-main">
						<p className="text-xl font-medium leading-[30px] text-white">2</p>
					</div>

					<Image src={posterAgreement} alt="poster-agreement" width={393} height={260} className="object-contain object-center w-full" style={{aspectRatio: "393/260"}}/>

					<div className="flex items-center h-fit gap-[10px]">
						<div className="h-[20px] w-[2px] bg-main"></div>
						<h3 className="text-base 1050:text-xl font-medium leading-[26px] 700:leading-[30px]">Согласование</h3>
					</div>

					<p className="text-sm font-normal leading-6 text-gray">Мы консультируем Вас, согласовываем стоимость и точное время приезда нашего специалиста</p>

				</div>

				<div className="w-full pt-6 flex flex-col relative gap-3">

					<div className="absolute w-12 h-12 right-[10px] top-[14px] flex items-center justify-center bg-main">
						<p className="text-xl font-medium leading-[30px] text-white">3</p>
					</div>

					<Image src={posterSending} alt="poster-sending" width={393} height={260} className="object-contain object-center w-full" style={{aspectRatio: "393/260"}}/>

					<div className="flex items-center h-fit gap-[10px]">
						<div className="h-[20px] w-[2px] bg-main"></div>
						<h3 className="text-base 1050:text-xl font-medium leading-[26px] 700:leading-[30px]">Отправка товара и установка</h3>
					</div>

					<p className="text-sm font-normal leading-6 text-gray">Наш специалист по монтажу замков выезжает к Вам в точно назначенное время по согласованному адресу</p>

				</div>
				

			</div>
		</div>
	)
}
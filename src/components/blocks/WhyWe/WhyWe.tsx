import IconRefund from './icon-refund.svg';
import IconLike from './icon-like.svg';
import Image from 'next/image';

export default function WhyWe(){
	return(
		<div className="mt-[100px] w-full px-4 1100:px-[100px] flex flex-col gap-14 items-center">

			<h1 className="text-[22px] 550:text-[44px] font-semibold leading-[34px] 550:leading-[62px]">Почему GoldenService?</h1>

			<div className="flex w-full gap-0 800:gap-[30px] flex-col 800:flex-row">

				<div className="p-6 w-full flex flex-col gap-8 items-center border-t-1 800:border-t-0 800:border-l-1 800:border-r-1 border-light-gray">
					<Image className="w-auto h-auto" src={IconRefund} alt="IconRefund" width={76} height={70}/>
					<p className="text-base 550:text-xl text-gray leading-[32px] max-w-[345px] text-center">Возврат удвоенной стоимости каждого замка в случае брака</p>
				</div>

				<div className="p-6 w-full flex flex-col gap-8 items-center border-t-1 800:border-t-0 800:border-l-1 800:border-r-1 border-light-gray">
					<Image className="w-auto h-auto" src={IconLike} alt="IconRefund" width={76} height={70}/>
					<p className="text-base 550:text-xl text-gray leading-[32px] max-w-[345px] text-center">Наносим ваш логотип компании на наш продукт</p>
				</div>

				<div className="p-6 w-full flex flex-col gap-8 items-center border-t-1 border-b-1 800:border-t-0 800:border-b-0 800:border-l-1 800:border-r-1 border-light-gray">
					<Image className="w-auto h-auto" src={IconRefund} alt="IconRefund" width={76} height={70}/>
					<p className="text-base 550:text-xl text-gray leading-[32px] max-w-[345px] text-center">Возврат удвоенной стоимости каждого замка в случае брака.</p>
				</div>

			</div>

		</div>
	)
}
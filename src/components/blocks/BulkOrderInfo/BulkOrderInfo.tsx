import BulkOrderForm from "./BulkOrderForm";

export default function BulkOrderInfo(){
	return(
		<div className="w-full h-auto px-4 750:px-14 1400:px-25 py-0 700:py-20 grid grid-cols-1 1300:grid-cols-[450px_1fr] 1500:grid-cols-[500px_1fr] gap-x-[48px] 1500:gap-x-[64px] items-center gap-y-12">

			<div className="w-full h-fit flex flex-col items-center 700:items-start gap-6">
				<h1 className="text-[22px] 700:text-[44px] font-semibold leading-[34px] 700:leading-[62px]">Оформите заявку и мы вам перезвоним</h1>
				<p className="text-sm 700:text-base font-normal leading-6 700:leading-[26px]">Vitae, urna, massa dictumst morbi ut id dui nulla. Purus a velit sem viverra. Nunc ac quis donec nunc eu blandit ante nibh. Sit felis nulla donec mauris quis nulla velit.</p>
			</div>

			<div className="w-full flex flex-col gap-3 700:gap-8 p-0 1300:p-8">

				<h2 className="text-base 700:text-2xl font-semibold leading-[26px] 700:leading-[34px]">Оформление заявки</h2>

				<BulkOrderForm/>
				
			</div>
		
		</div>
	)
}
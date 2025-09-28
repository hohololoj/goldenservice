export default function GuarantyInfo(){
	return(
		<div className="mt-8 700:mt-10 px-4 600:px-12 1050:px-25" id="guaranty">
			<div className="w-full flex flex-col gap-3 pb-8 700:pb-10 border-b-1 border-light-gray">
				<h2 className="text-2xl 700:text-[32px] font-bold leading-[26px] 700:leading-[42px]">Гарантии</h2>
				<p className="text-sm 700:text-base font-medium leading-6 700:leading-[26px] mt-1">На все товары, приобретенные в нашем магазине, предоставляется гарантия, дающая право на:</p>
				<div className="w-full flex flex-col gap-2">
					<div className="w-fit flex gap-3 items-start">
						<div className="w-2 h-2 rounded-full bg-main mt-2"></div>
						<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit max-w-full 1230:max-w-[60vw]">обмен или возврат товара в срок до 14 дней с момента приобретения;</p>
					</div>
					<div className="w-fit flex gap-3 items-start">
						<div className="w-2 h-2 rounded-full bg-main mt-2"></div>
						<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit max-w-full 1230:max-w-[60vw]">обмен или возврат товара на основании акта, выданного Авторизованным сервисным центром по результатам гарантийного обслуживания (в соответствии с Законом РФ «О защите прав потребителей»).</p>
					</div>
				</div>
			</div>
		</div>
	)
}
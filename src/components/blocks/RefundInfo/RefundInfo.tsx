export default function RefundInfo() {
	return (
		<div className="mt-8 700:mt-10 px-4 600:px-12 1050:px-25 flex flex-col gap-4 mb-25" id="refund">
			<h2 className="text-2xl 700:text-[32px] font-bold leading-[26px] 700:leading-[43px]">Возврат товара</h2>
			<div className="flex flex-col gap-2">
				<p className="text-sm 700:text-base font-medium leading-6 700:leading-[26px] mb-0 700:mb-1">Подготовьте, пожалуйста, все необходимые документы:</p>

				<div className="w-fit h-auto flex gap-3 items-start">
					<div className="w-2! h-2 rounded-full bg-main mt-2"></div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit">выданный продавцом расчетный документ (чек / акт приема-передачи / накладная или др.), подтверждающий факт приобретения;</p>
				</div>

				<div className="w-fit h-auto flex gap-3 items-start">
					<div className="w-2! h-2 rounded-full bg-main mt-2"></div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit">гарантийный талон;</p>
				</div>

				<div className="w-fit h-auto flex gap-3 items-start">
					<div className="w-2! h-2 rounded-full bg-main mt-2"></div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit">документ, удостоверяющий личность;</p>
				</div>

				<div className="w-fit h-auto flex gap-3 items-start">
					<div className="w-2! h-2 rounded-full bg-main mt-2"></div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit">идентификационный налоговый номер (ИНН);</p>
				</div>

				<div className="w-fit h-auto flex gap-3 items-start">
					<div className="w-2! h-2 rounded-full bg-main mt-2"></div>
					<p className="text-sm font-normal leading-[22px] 700:leading-6 text-gray w-fit">в случае оплаты покупки банковской картой – актуальные реквизиты карточного счета.</p>
				</div>

			</div>
			<div className="flex flex-col gap-2 mt-2 700:mt-0">
				<p className="text-sm 700:text-base font-medium leading-6 700:leading-[26px] mb-2">Передайте товар на гарантийное обслуживание, обязательно приложите указанные выше документы.</p>
				<p className="text-sm font-normal leading-[22px] 700:leading-6 max-w-[826px] text-gray">Полезная информация о правах потребителя в случае приобретения им товара ненадлежащего качества – <a className="underline" target="_blank" href="https://www.consultant.ru/document/cons_doc_LAW_305/">Закона РФ «О защите прав потребителей»</a>.</p>
				<p className="text-sm font-normal leading-[22px] 700:leading-6 max-w-[826px] text-gray">Уважаемый покупатель, приносим извинения за неудобства, случившиеся в связи с выходом из строя. По вашему обращению будут приняты все меры для быстрого решения вашей проблемы.</p>
			</div>
		</div>
	)
}
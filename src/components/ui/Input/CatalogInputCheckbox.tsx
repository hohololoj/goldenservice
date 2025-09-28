'use client'
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

interface Props{
	name: string,
	quantity: number,
	onCheck: Function,
	active: boolean
}
export default function CatalogInputCheckbox(props: Props){
	const [active, setActive] = useState(props.active);

	useEffect(() => {
		setActive(props.active)
	}, [props.active])

	function handleCheckboxClick(){
		props.onCheck(!active)
		setActive((prev) => !prev);
	}

	return(
		<div onClick={handleCheckboxClick} className="w-full flex gap-8 items-start h-fit cursor-pointer justify-between">
			<div className="flex gap-2">
				<div className="pt-[3px] w-4 h-4">
					<Checkbox checked={active} className="w-full h-full"/>
				</div>
				<p className="max-w-[184px] h-fit text-sm font-normal leading-6">{props.name}</p>
			</div>
			<p className="text-xs font-thin leading-6 text-gray">({props.quantity})</p>
		</div>
	)
}
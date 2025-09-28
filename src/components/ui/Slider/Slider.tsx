import { ReactNode } from "react"
import SliderControls from "./SliderControls"
import { SliderControlsOptions } from "@/types/types.ui"

interface Props{
	children: ReactNode | ReactNode[],
	options?: SliderControlsOptions,
	max?: number,
	sliderName: string,
	slideWidth: string,
}
export default function Slider(props: Props){
	return(
		<div className={`w-full h-full overflow-hidden flex flex-col gap-[42px] slider-window-${props.sliderName}`} >
			<SliderControls options={props.options} slideWidth={props.slideWidth} sliderName={props.sliderName}>
				{props.children}
			</SliderControls>
		</div>
	)
}
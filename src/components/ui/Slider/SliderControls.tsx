'use client'
import { ReactNode, useEffect, useRef, useState } from "react"
import { useSwipeable } from "react-swipeable";

import SliderPaginationDot from "./SliderPaginationDot";
import IconButton from "../IconButton/IconButton";

import IconArrowLeft from './icon-arrow-left.svg'
import IconArrowRight from './icon-arrow-right.svg'
import { SliderControlsOptions } from "@/types/types.ui";

interface Props{
	children: ReactNode | ReactNode[],
	options: SliderControlsOptions | undefined,
	sliderName: string,
	slideWidth: string
}

export default function SliderControls(props: Props){
	const [currentActive, setCurrentActive] = useState(1);
	const [paginationDots, setPaginationDots] = useState(0);
	const sliderLine = useRef<HTMLElement | null>(null);
	const max = useRef(0);
	
	useEffect(() => {
		sliderLine.current = document.querySelector(`.slider-line-${props.sliderName}`);
		if(props.options?.customControlsLeft !== undefined && props.options?.customControlsRight !== undefined){
			document.querySelector(`.${props.options.customControlsLeft}`)?.addEventListener('click', () => {handleClick(-1)})
			document.querySelector(`.${props.options.customControlsRight}`)?.addEventListener('click', () => {handleClick(1)})
		}
		calcMax()
	}, [])
	useEffect(() => {
		changeSliderLinePos()
	}, [currentActive])
	useEffect(() => {
		setPaginationDots(max.current)
	}, [max.current])

	function calcMax(){
		const slideWidth = document.querySelector(`.slider-window-${props.sliderName}`)?.clientWidth;
		const sliderLineWidth = document.querySelector(`.slider-line-${props.sliderName}`)?.clientWidth;
		max.current = Math.ceil(sliderLineWidth!/slideWidth!);
	}

	function handleClick(shift: number){
		calcMax()
		setCurrentActive(prev => {
			if (prev + shift < 1) {
			  	return max.current;
			} else if (prev + shift > max.current) {
				return 1;
			} else {
				return prev + shift;
			}
		});
	}

	function getSlideWidth(){
		return document.querySelector(`.slider-window-${props.sliderName}`)?.clientWidth;
	}

	function changeSliderLinePos(){
		sliderLine.current!.style.transform = `translateX(calc(-${(currentActive - 1)} * ${getSlideWidth()}px))`
	}

	function handlePaginationClick(num: number){
		setCurrentActive(num+1);
	}

	function fillPaginationDots(){
		const arr = [];
		for(let i = 0; i < paginationDots; i++){
			arr.push(
				<SliderPaginationDot onClick={(num:number) => {handlePaginationClick(num)}} key={i} slideNum={i} active={i === currentActive-1}/>
			)
		}
		return arr
	}

	function handleSliderSwipe(direction: string){
		direction === 'left' ? handleClick(1) : handleClick(-1)
	}
	
	const swiperHandlers = useSwipeable({
		onSwipedLeft: () => {handleSliderSwipe('left')},
		onSwipedRight: () => {handleSliderSwipe('right')},
		trackTouch: true
	})

	return (
		<>	
			<div className={`w-fit h-fit flex transition-transform duration-300 parabola ${`slider-line-${props.sliderName}`}`} {...swiperHandlers}>
				{props.children}
			</div>

			<div className={`flex gap-6 items-center self-center${props.options?.customControlsLeft !== undefined && props.options?.customControlsRight !== undefined ? ' hidden' : ''}`}>
				<IconButton onClick={() => {handleClick(-1)}} src={IconArrowLeft} width={32} height={32}/>
				<div className="flex gap-6 items-center">
					{fillPaginationDots()}
				</div>
				<IconButton onClick={() => {handleClick(1)}} src={IconArrowRight} width={32} height={32}/>
			</div>
		</>
	)
}
'use client'
import { useEffect, useRef, useState } from "react";
import InputStaticPlaceholder from "../Input/InputStaticPlaceholder"
import { Slider, SliderPropsColorOverrides } from "@mui/material";

interface Props{
	min: number,
	max: number,
	value?: any,
	onChange: Function,
	placeholder: string
}
export default function RangeInput(props: Props){
	const [value, setValue] = useState([props.min, props.max]);
	
	const timer = useRef<NodeJS.Timeout | undefined>(undefined);

	const inputMinRef = useRef<HTMLInputElement>(null);
	const inputMaxRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputMinRef.current!.value = props.min.toString(); 
		inputMaxRef.current!.value = props.max.toString();
	}, [])
	useEffect(() => {
		if(props.value[0] !== undefined && props.value[1] !== undefined){
			setValue([props.value[0], props.value[1]])
			inputMinRef.current!.value = props.value[0].toString();
			inputMaxRef.current!.value = props.value[1].toString();
		}
		else{
			setValue([props.min, props.max]);
			inputMinRef.current!.value = props.min.toString();
			inputMaxRef.current!.value = props.max.toString();
		}
	}, [props.value])

	function updateFilter(filter: {[key: string]: string}){
		props.onChange(filter)
	}

	function handlePriceInput(val: string, type: string){

		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			if(type === 'min'){
				if(parseFloat(val) > parseFloat(inputMaxRef.current!.value)){inputMinRef.current!.value = inputMaxRef.current!.value; setValue([parseFloat(inputMaxRef.current!.value), value[1]]); return}
				if(parseFloat(val) < props.min || val === ''){inputMinRef.current!.value = props.min.toString(); setValue([props.min, value[1]]); return}
				setValue([parseFloat(val), value[1]])
			}
			if(type === 'max'){
				if(parseFloat(val) < parseFloat(inputMinRef.current!.value)){inputMaxRef.current!.value = inputMinRef.current!.value; setValue([value[0], parseFloat(inputMinRef.current!.value)]); return}
				if(parseFloat(val) > props.max || val === ''){inputMaxRef.current!.value = props.max.toString(); setValue([value[0], props.max]); return}
				setValue([value[0], parseFloat(val)])
			}
	
			const filter_obj = {
				min: inputMinRef.current!.value,
				max: inputMaxRef.current!.value
			};

			updateFilter(filter_obj)
		}, 750);
	}

	function handleSliderInput(e: Event, newValue: number[]){
		setValue(newValue);

		const minValue = newValue[0].toString();
		const maxValue = newValue[1].toString()

		inputMinRef.current!.value = minValue; 
		inputMaxRef.current!.value = maxValue;

		clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			updateFilter({min: minValue, max: maxValue})
		}, 750);
	}

	return(
		<div className="w-full flex flex-col gap-4">
			<div className="w-full grid grid-cols-2 grid-rows-[44px]">
				<InputStaticPlaceholder ref={inputMinRef} delay={750} inputSettings={{min: props.min, max: props.max}} onInput={(val: string) => {handlePriceInput(val, 'min')}} placeholder={props.placeholder}/>
				<InputStaticPlaceholder ref={inputMaxRef} delay={750} inputSettings={{min: props.min, max: props.max}} onInput={(val: string) => {handlePriceInput(val, 'max')}} placeholder={props.placeholder}/>
			</div>
			{/* <InputRange/> */}
			<div className="px-[12px]">
				<Slider min={props.min} max={props.max} step={1} value={value} onChange={handleSliderInput}/>
			</div>
		</div>
	)
}
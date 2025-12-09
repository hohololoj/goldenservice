'use client'

import Button from "@/components/ui/Button/Button";
import IconButton from "@/components/ui/IconButton/IconButton";
import { CatalogProduct, CatalogProductResponse, ProductFiltersList } from "@/types/types.products";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";

import Select from "@/components/ui/Select/Select";
import CatalogFilter from "@/components/ui/CatalogFilter/CatalogFilter";
import CatalogInputCheckbox from "@/components/ui/Input/CatalogInputCheckbox";
import RangeInput from "@/components/ui/RangeInput/RangeInput";
import CatalogProductCard from "@/components/ui/CatalogProductCard/CatalogProductCard";
import { Pagination } from "@mui/material";

import IconClose from './icon-close.svg';
import iconArrowBack from './icon-arrow-back.svg';
import Link from "next/link";

interface Props{
	cid: string,
	products: CatalogProduct[],
	filters: ProductFiltersList,
	maxPages: number
}

export default function ProductsBlock(props: Props){
	const [products, setProducts] = useState<[] | CatalogProduct[]>(props.products);
	const [activeFilters, setActiveFilters] = useState<any>({});
	const [maxPages, setMaxPages] = useState<number>(props.maxPages);
	const [openedFilters, setOpenedFilters] = useState(false);
	const urlFilters = useRef<any>(null);
	const params = useSearchParams();
	const router = useRouter();

	function parseParams(){
		return Object.fromEntries(Array.from(params.entries()).map(([key, value]) => {
			return [key, value.includes(',') ? value.split(',') : [value]]
		}))
	}

	useEffect(() => {
		urlFilters.current = parseParams();
		if(Object.keys(urlFilters.current).length !== 0){
			requestNewProducts();
		}
		else{
			setProducts(props.products)
		}
		setActiveFilters(urlFilters.current);
	}, [params])

	async function requestNewProducts(){
		const requestQuery = new URLSearchParams(urlFilters.current).toString();
		const {products, quantity} = await fetch(`/api/proxy/products?cid=${props.cid}&${requestQuery}`).then(res => res.json()) as CatalogProductResponse;
		setMaxPages(Math.ceil(quantity/12))
		setProducts(products)
	}

	function activateFilters(filter: {[key: string]: string | number | boolean}, ref: string){

		function fillStaticRange(min: number | boolean, max: number | boolean, field: string){
			if(min === false && max === false){
				delete urlFilters.current[`min${field}`];
				delete urlFilters.current[`max${field}`];
				return
			}
			urlFilters.current[`min${field}`] = min.toString();
			urlFilters.current[`max${field}`] = max.toString();
		}

		function pushValue(value: string, field: string){
			let initialValue = Array.isArray(urlFilters.current[field]) ? urlFilters.current[field] : [] as string[];
			urlFilters.current[field] = [...initialValue, value];
		}
		function pullValue(value: string, field: string){
			const initialValue = urlFilters.current[field] as string[] || [];
			if(initialValue.length === 0){return}
			if(initialValue.length === 1){urlFilters.current[field] = []; return}
			urlFilters.current[field] = initialValue.filter((activeValue) => {
				return activeValue !== value 
			})
		}

		function processArrayValueFilter(value: string, add: boolean, field: string){
			if(add){pushValue(value, field)}
			else{pullValue(value, field)}
		}

		function getFilterType(filterName: string){
			const rangeFilters = ['minPrice', 'maxPrice', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'minThickness', 'maxThickness'];
			const arrayFilters = ['features', 'colors', 'material'];
			if(filterName === 'sort'){return 'sort'}
			if(filterName === 'page'){return 'page'}
			if(rangeFilters.includes(filterName)){return 'range'}
			if(arrayFilters.includes(filterName)){return 'array'}
			return undefined
		}

		function parseFilters(){
			const totalQuery_arr = [];
			for(let key in urlFilters.current){
				const type = getFilterType(key);
				switch(type){
					case 'sort':{
						totalQuery_arr.push(`sort=${urlFilters.current.sort}`);
						break;
					}
					case 'page':{
						totalQuery_arr.push(`page=${urlFilters.current.page}`);
					}
					case 'array':{
						if(Array.isArray(urlFilters.current[key]) && urlFilters.current[key].length !== 0){
							totalQuery_arr.push(`${key}=${(urlFilters.current[key] as string[]).join(',')}`)
						}
						break;
					}
					case 'range':{
						totalQuery_arr.push(`${key}=${urlFilters.current[key]}`)
						break;
					}
				}
			}
			const totalQuery_str = totalQuery_arr.join('&');
			router.push(`/catalog/${props.cid}?${totalQuery_str}`);
		}

		delete urlFilters.current['page'];
		switch(ref){
			case 'sort':{
				const currentSort = params.get('sort');
				const sortAction = filter.sort as string;
				if((!currentSort && sortAction === 'popular') || currentSort === sortAction){return}
				urlFilters.current['sort'] = sortAction;
				break;
			}
			case 'page':{
				const page = filter.page;
				urlFilters.current['page'] = page;
				break;
			}
			case 'price':{
				fillStaticRange(filter.min as number, filter.max as number, 'Price');
				break;
			}
			case 'height':{
				fillStaticRange(filter.min as number, filter.max as number, 'Height');
				break;
			}
			case 'width':{
				fillStaticRange(filter.min as number, filter.max as number, 'Width');
				break;
			}
			case 'thickness':{
				fillStaticRange(filter.min as number, filter.max as number, 'Thickness');
				break;
			}
			case 'features':{
				const value = filter.name as string;
				const add = filter.value as boolean;
				processArrayValueFilter(value, add, 'features');
				break;
			}
			case 'colors':{
				const value = filter.name as string;
				const add = filter.value as boolean;
				processArrayValueFilter(value, add, 'colors');
				break;
			}
			case 'material':{
				const value = filter.name as string;
				const add = filter.value as boolean;
				processArrayValueFilter(value, add, 'material');
				break;
			}
		}

		parseFilters();
	}
	
	function displayActiveFilters(){

		function displayRange(fieldMin: string, fieldMax: string, filterName: string, unit: string, filterFieldName: string){

			function deleteRangeFilter(){
				activateFilters({min: false, max: false}, filterFieldName)
			}

			return(
				<div key={`${filterName}`} className="h-10 w-fit flex items-center gap-2">
					{filterName}: {activeFilters[fieldMin]}{unit}-{activeFilters[fieldMax]}{unit}
					<IconButton onClick={deleteRangeFilter} src={IconClose} width={14} height={14} alt="icon-close"/>
				</div>
			)
		}
		function displayArray(arr: string[], filterName: string){
			return arr.map((item, i) => {
				return(
					<div key={`${filterName}-${i}`} className="h-10 w-fit flex items-center gap-2">
						{item}
						<IconButton src={IconClose} width={14} height={14} alt="icon-close"/>
					</div>
				)
			})
		}

		return Object.keys(activeFilters).flatMap((key) => {
			if(key === 'minPrice'){
				return displayRange('minPrice', 'maxPrice', 'Цена', '₽', 'price')
			}
			if(key === 'features'){
				const features = activeFilters.features;
				return displayArray(features, 'features');
			}
			if(key === 'colors'){
				const colors = activeFilters.colors;
				return displayArray(colors, 'colors')
			}
			if(key === 'material'){
				const material = activeFilters.material;
				return displayArray(material, 'material')
			}
			if(key === 'minHeight'){
				return displayRange('minHeight', 'maxHeight', 'Высота', 'мм', 'height');
			}
			if(key === 'minWidth'){
				return displayRange('minWidth', 'maxWidth', 'Ширина', 'мм', 'width');
			}
			if(key === 'minThickness'){
				return displayRange('minThickness', 'maxThickness', 'Толщина', 'мм', 'thickness');
			}
		})
	}

	function getInitialSort(){
		const index = ['popular', 'new', 'old', 'price_asc', 'price_desc'].indexOf(activeFilters.sort ? activeFilters.sort[0] : 'popular');
		return index === -1 ? 0 : index;
	}

	function resetFilters(){
		setActiveFilters((prev: any) => {return {...prev, page: 1}})
		router.push(`/catalog/${props.cid}`);
	}

	function onPaginationChange(e: React.ChangeEvent<unknown>, val: number){
		activateFilters({page: val}, 'page');
	}

	return(
		<div className="mt-8 h-auto grid gap-x-[30px] gap-y-8
		1300:px-25
		1230:px-15
		1100:px-8
		px-4
		850:grid-cols-[288px_1fr]
		800:grid-cols-[230px_1fr] 800:grid-rows-[min-content_auto]
		grid-cols-1 grid-rows-[50px_40px_auto]">

			<Button onClick={resetFilters} className="bg-white border-1 border-light-blue text-black! w-full hidden 800:block">Сбросить фильтры</Button>
			<Button onClick={() => {setOpenedFilters(prev => !prev)}} className="w-full block 800:hidden">Фильтр</Button>

			<div className="flex gap-[30px]">
				<div className="w-full max-w-full hidden 800:flex flex-wrap gap-4">

					{displayActiveFilters()}
					
				</div>
				<div className="w-full 800:w-71 min-w-71 h-10">
					<Select onSelect={(value: string) => {activateFilters({sort: value}, 'sort')}} initial={getInitialSort()} className="border-b-1 border-t-1 border-light-gray cursor-pointer" windowClassName="border-1 border-t-0 border-light-gray">
						<div data-value="popular" className="bg-white w-full h-10 pt-[7px] px-4">Популярные</div>
						<div data-value="new" className="bg-white w-full h-10 pt-[7px] px-4">Новые</div>
						<div data-value="old" className="bg-white w-full h-10 pt-[7px] px-4">Старые</div>
						<div data-value="price_asc" className="bg-white w-full h-10 pt-[7px] px-4">Дешевле</div>
						<div data-value="price_desc" className="bg-white w-full h-10 pt-[7px] px-4">Дороже</div>
					</Select>
				</div>

			</div>
			<div style={{left: openedFilters ? '0' : '-100%'}} className={`h-[100dvh] fixed transition-all linear duration-[250ms] top-0 w-screenSmart flex flex-col p-6 gap-6 bg-white z-10
				800:h-auto 800:static 800:w-full 800:px-6 px-4
				`}>

				<div onClick={() => {setOpenedFilters(() => false)}} className="800:w-fit 800:h-fit 800:cursor-auto relative
					w-full h-[70px] flex items-center justify-center cursor-pointer">
					<h2 className="text-[22px] font-semibold leading-8">Фильтры</h2>
					<div className="absolute left-0 block 800:hidden z-10 w-fit h-fit">
						<IconButton src={iconArrowBack} width={20} height={20}/>	
					</div>
				</div>

				<div className="flex flex-col w-full h-full 800:h-auto gap-4 max-h-full relative">
					
					<CatalogFilter name="Цена">
						<RangeInput placeholder="₽" value={[activeFilters.minPrice, activeFilters.maxPrice]} onChange={(filter: {[key: string]: string | number}) => {activateFilters(filter, 'price')}} min={props.filters.priceRange?.min || 0} max={props.filters.priceRange?.max || 100}/>
					</CatalogFilter>

					{props.filters.features ? 
						<CatalogFilter name="Особенности">			
						{
							Object.entries(props.filters.features).map(([name, value]) => {
								return(
									<CatalogInputCheckbox active={activeFilters.features ? activeFilters.features.includes(name) : false} key={name} onCheck={(val: boolean) => {activateFilters({name: name, value: val}, 'features')}} name={name} quantity={value}/>
								)
							})
						}
						</CatalogFilter>
					: ''
					}

					{props.filters.colors ? 
						<CatalogFilter name="Цвет">			
						{
							Object.entries(props.filters.colors).map(([name, value]) => {
								return(
									<CatalogInputCheckbox active={activeFilters.colors ? activeFilters.colors.includes(name) : false} key={name} onCheck={(val: boolean) => {activateFilters({name: name, value: val}, 'colors')}} name={name} quantity={value}/>
								)
							})
						}
						</CatalogFilter>
					: ''
					}

					{props.filters.materials ? 
						<CatalogFilter name="Материал">			
						{
							Object.entries(props.filters.materials).map(([name, value]) => {
								return(
									<CatalogInputCheckbox active={activeFilters.material ? activeFilters.material.includes(name) : false} key={name} name={name} onCheck={(val: boolean) => {activateFilters({name: name, value: val}, 'material')}} quantity={value}/>
								)
							})
						}
						</CatalogFilter>
					: ''
					}

					<CatalogFilter name="Размеры" maxHeight={600}>

						<div className="w-full pl-3 flex flex-col gap-1">
							<CatalogFilter name="Высота">
								<RangeInput value={[activeFilters.minHeight, activeFilters.maxHeight]} placeholder="мм" onChange={(filter: {[key: string]: string | number}) => {activateFilters(filter, 'height')}} min={props.filters.sizes?.height?.min || 0} max={props.filters.sizes?.height?.max || 100}/>
							</CatalogFilter>

							<CatalogFilter name="Ширина">
								<RangeInput value={[activeFilters.minWidth, activeFilters.maxWidth]} placeholder="мм" onChange={(filter: {[key: string]: string | number}) => {activateFilters(filter, 'width')}} min={props.filters.sizes?.width?.min || 0} max={props.filters.sizes?.width?.max || 100}/>
							</CatalogFilter>

							<CatalogFilter name="Толщина">
								<RangeInput value={[activeFilters.minThickness, activeFilters.maxThickness]} placeholder="мм" onChange={(filter: {[key: string]: string | number}) => {activateFilters(filter, 'thickness')}} min={props.filters.sizes?.thickness?.min || 0} max={props.filters.sizes?.thickness?.max || 100}/>
							</CatalogFilter>
						</div>

					</CatalogFilter>
					
					<div className="absolute bottom-0 flex flex-col gap-4 w-full 800:hidden">
						<Button onClick={() => {setOpenedFilters(() => false)}} className="w-full h-[50px]">Показать</Button>
						<Button onClick={() => {resetFilters(); setOpenedFilters(() => false)}} className="bg-white border-1 border-light-blue text-black! w-full">Сбросить фильтры</Button>
					</div>

				</div>

			</div>
			
			<div className="w-full h-auto flex flex-col gap-[30px]">
				<div className="grid auto-rows-min
				1500:grid-cols-4
				1300:gap-x-[30px] 1300:gap-y-10
				1100:grid-cols-3 gap-x-[15px] gap-y-5
				550:grid-cols-2
				grid-cols-1">
					{products.map((product) => {
						return(
							<Link key={product._id} href={`/catalog/${props.cid}/${product._id}`}><CatalogProductCard product={product}/></Link>
						)
					})}
				</div>
				<div className="w-full h-auto flex justify-center">
					<Pagination page={parseInt(activeFilters.page) || 1} onChange={onPaginationChange} count={maxPages} shape="rounded" variant="text" color="primary" size="large"/>
				</div>
			</div>

		</div>
	)
}
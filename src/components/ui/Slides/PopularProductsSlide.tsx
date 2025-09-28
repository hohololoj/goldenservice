import { PopularProduct } from "@/types/types.products"
import Image from "next/image"
import Link from "next/link"

interface Props{
	products: PopularProduct[]
}

export default function PopularProductsSlide(props: Props){

	function calcPrice(price: number, discount: number){
		return discount !== 0 ?
		<>
		<p className="text-xl font-semibold">{price - price*(discount/100)}₽</p>
		<p className="text-lg font-light line-through">{price}₽</p>
		</>
		:
		<p className="text-xl font-semibold">{price}₽</p>
	}

	return(
		<div className="h-[426px] grid grid-rows-[426px] grid-flow-col
			1230:auto-cols-[calc((100vw-var(--scrollbar-width)-200px)/4)]
			990:auto-cols-[calc((100vw-var(--scrollbar-width)-200px)/3)]
			700:auto-cols-[calc((100vw-var(--scrollbar-width)-32px)/2)]
			auto-cols-[calc((100vw-var(--scrollbar-width)-32px))]
		">

			{props.products.map((product) => {
				return(
					<Link href={`/catalog/${product.category}/${product._id}`} className="w-full h-full grid grid-rows-[1fr_auto] relative px-[15px]" key={product._id}>
						<Image src={`/api/cdn/${product.poster}`} alt="poster" height={320} width={288} style={{width: 'auto', height: '320px', aspectRatio:'288/320'}} className="object-contain" unoptimized/>
						<div className="py-[10px] px-3 flex flex-col gap-[10px]">
							<p className="max-w-full leading-[26px]">{product.name}</p>
							<div className="flex items-center gap-3">
								{calcPrice(product.price, product.discount)}
							</div>
						</div>
					</Link>
				)
			})}

		</div>
	)
}
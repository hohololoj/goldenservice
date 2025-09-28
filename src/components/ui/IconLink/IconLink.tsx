import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"

interface Props{
	href: string,
	src: string | StaticImport,
	alt?: string,
	width: number,
	height: number,
	target?: string
}
export default function IconLink(props: Props){
	return(
		<Link href={props.href} target={props.target || '_blank'}>
			<Image src={props.src} alt={props.alt || ''} width={props.width} height={props.height}/>
		</Link>
	)
}
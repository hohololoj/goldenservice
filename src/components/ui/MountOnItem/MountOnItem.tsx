import Image from 'next/image';
import iconChecked from './icon-checked.svg';

interface Props{
	text: string
}
export default function MountOnItem(props: Props){
	return(
		<div className="flex gap-2 items-center h-fit w-fit">
			<Image src={iconChecked} width={14} height={14} alt="icon-checked"/>
			<p className="text-sm font-normal leading-6 text-gray">{props.text+' дверь'}</p>
		</div>
	)
}
import Image from 'next/image';
import LogoImage from './logo.svg';
import LogoImageWhite from './logo-white.svg';

interface Props{
	className?: string,
	logo?: string
}

export default function Logo(props: Props){
	return(
		<Image className={props.className || ''} src={props.logo === "white" ? LogoImageWhite : LogoImage} alt="Logo"/>
	)
}
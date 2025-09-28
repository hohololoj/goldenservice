import Image from "next/image";
import loading from './loading.svg';
export default function Loading(){
	return(
		<div className="fixed left-0 top-0 w-screenSmart h-[100vh] bg-white flex items-center justify-center">
			<Image src={loading} width={200} height={200} alt="loading"/>
		</div>
	)
}
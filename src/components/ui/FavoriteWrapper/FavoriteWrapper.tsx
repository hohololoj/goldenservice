'use client'
import { useEffect, useState } from "react";
import IconButton from "../IconButton/IconButton";
import IconFavorite from './icon-favorite.svg';
import { LSManager } from "@/utils/LSManager";

export default function FavoriteWrapper(){
	const [favoriteListLength, setFavoriteListLength] = useState<number>(0)
	
	useEffect(() => {
		const favLength = LSManager.db('favorites').find('ids');
		if(favLength !== undefined){
			setFavoriteListLength(favLength.length)
		}
	}, [])

	return(
		<div className="w-fit h-fit relative">
			<IconButton src={IconFavorite} alt="IconFavorite" width={32} height={32}/>
			<div style={{display: favoriteListLength === 0 ? 'none' : 'flex'}} className="w-[18px] h-[18px] rounded-full border-1 border-white bg-main flex items-center justify-center text-xs text-white absolute right-0 top-0 cursor-pointer">
				{favoriteListLength}
			</div>
		</div>
	)
}
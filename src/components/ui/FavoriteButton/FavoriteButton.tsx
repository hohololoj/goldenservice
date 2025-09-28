'use client'
import { useEffect, useState } from 'react';

import IconFavorite from './iconFavorite';
import { LSManager } from '@/utils/LSManager';

interface Props{
	pid: string;
}

export default function FavoriteButton(props: Props){
	const [isFavorite, setIsFavorite] = useState(false);

	function toggleFavorite(){
		setIsFavorite(prev => {
			let prevList = LSManager.db('favorites').find('ids') as string[];
			if(prev === false){prevList.push(props.pid)}
			else{prevList = prevList.filter((pid) => {return pid !== props.pid})}
			LSManager.db('favorites').change('ids', prevList)
			return !prev
		});
	}

	useEffect(() => {
		const favoriteList = LSManager.db('favorites').find('ids') as string[] | undefined;
		if(favoriteList === undefined){LSManager.db('favorites').change('ids', []); return}
		if(favoriteList.includes(props.pid)){setIsFavorite(true)}
	}, [])

	return(
		<div onClick={toggleFavorite} className="w-fit h-fit py-[2px] flex items-center gap-2 cursor-pointer">
			<IconFavorite favorite={isFavorite}/>
			{isFavorite ? 
				<p className="text-sm font-normal leading-6 text-main hidden 550:block">В избранном</p>
			:
				<p className="text-sm font-normal leading-6 text-gray hidden 550:block">В избранное</p>
			}
		</div>
	)
}
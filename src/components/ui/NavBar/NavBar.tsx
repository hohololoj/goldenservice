'use client'
import { usePathname } from "next/navigation"
import { staticRoutes } from "@/constants/staticRoutes";
import Link from "next/link";
import React from "react";
import IconButton from "../IconButton/IconButton";

import iconHome from './icon-home.svg';

interface Props{
	targetRoutes?: {name: string, href: string}[],
	className?: string
}

export default function NavBar(props: Props){
	const pathName = usePathname();

	const routes = pathName.split('/');

	const validRoutes = routes.filter((route) => staticRoutes[route] !== undefined);
	let parsedRoutes = validRoutes.map((route) => staticRoutes[route]);
	if(props.targetRoutes){parsedRoutes = [...parsedRoutes, ...props.targetRoutes]}

	return pathName === '/' ? '' : (
		<div className={`mt-5 mb-10 px-4 550:px-[100px] flex gap-1 flex-wrap items-center${props.className ? (' '+props.className) : ''}`}>
			{parsedRoutes.map((parsedRoute, index) => {
				return parsedRoute === undefined ? null :(
					index+1 !== parsedRoutes.length ? 
							parsedRoute!.href === '/' ? 
								<React.Fragment key={parsedRoute!.name}>
									<Link href={parsedRoute!.href} className="leading-[26px] font-normal">
										<p className="hidden 550:block">{parsedRoute!.name}</p>
										<IconButton className="550:hidden" width={20} height={20} src={iconHome} alt="icon-home"/>
									</Link>
									<p className="leading-[26px] font-normal">/</p>
								</React.Fragment>
							:
								<React.Fragment key={parsedRoute!.name}>
									<Link href={parsedRoute!.href} className="leading-[26px] font-normal">{parsedRoute!.name}</Link>
									<p className="leading-[26px] font-normal">/</p>
								</React.Fragment>
					:
					<p key={parsedRoute!.name} className="leading-[26px] font-normal text-gray">{parsedRoute!.name}</p>
				)
			})}
		</div>
	)
}
import { API } from "@/constants/constants";
import { FetchGet } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request){
	const url = new URL(req.url);
	const path = url.pathname.replace(/\/api\/proxy\//, '');
	const response = await FetchGet(`${API}/${path}${url.search}`).then((res) => res.json());
	return NextResponse.json(response)
}
export async function POST(req: Request){
	const url = new URL(req.url);
	const path = url.pathname.replace(/\/api\/proxy\//, '');
	
	const body = await req.json();

	const response = await fetch(`${API}/${path}${url.search}`, 
	{
		method: 'POST',
		body: JSON.stringify(body),
		//@ts-expect-error ts не знает о поле duplex
		duplex: 'half', 
		headers: {
            'Content-Type': 'application/json'
        },
	})
	.then((res) => res.json());
	return NextResponse.json(response)
}
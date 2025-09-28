import { API } from "@/constants/constants";
import { FetchGet } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request){
	const param = new URL(req.url).pathname.replace(/\/api/, '');
	
	const path = API+param
	const category = await FetchGet(path).then((res) => res.json());

	return NextResponse.json(category)
}
import { API } from "@/constants/constants";
import { FetchGet } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request){
	const urlObj = new URL(req.url);
	const query = urlObj.searchParams.toString();
	const products = await FetchGet(`${API}/products?${query}`).then((res) => res.json());
	return NextResponse.json(products)
}
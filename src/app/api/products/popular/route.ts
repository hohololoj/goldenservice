import { API } from "@/constants/constants";
import { FetchGet } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(){
	const res = await FetchGet(`${API}/products?sort=popular`)
	const popularProducts = await res.json();
	return NextResponse.json(popularProducts)
}
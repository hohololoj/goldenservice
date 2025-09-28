import { FetchGet } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(){
	const res = await FetchGet('http://localhost:3001/statistics');
	const statistics = await res.json();
	return NextResponse.json(statistics);
}
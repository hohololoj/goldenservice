import { NextResponse } from "next/server";

export async function GET(){
	const response = await fetch('http://localhost:3001/categories', {
		method: "GET",
		cache: "force-cache",
		next: {revalidate: 3600}
	})
	const categories = await response.json();
	return NextResponse.json(categories)
}
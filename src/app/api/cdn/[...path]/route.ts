export async function GET(req: Request){
	const url = new URL(req.url);
	const path = url.pathname.split('/api/cdn/')[1];
	const res = await fetch(`http://localhost:3001/cdn/${path}`, {
		method: "GET",
		cache: "force-cache",
		next: {revalidate: 3600}
	});
	return res;
}
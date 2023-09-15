import { NextResponse } from "next/server";

export async function GET() {
	const url: string = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
		},
	};

	const res = await fetch(url, options);

	const data = await res.json();

	return NextResponse.json(data);
}

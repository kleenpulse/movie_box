export async function fetchFilmDetails(
	filmId: string,
	isMovie: boolean = false
) {
	const getType = isMovie ? "movie" : "tv";
	const url: string = `https://api.themoviedb.org/3/${getType}/${filmId}?language=en-US&append_to_response=credits,videos`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
		},
		caches: "force-cache",
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function fetchFeaturedMovies(isMovie: boolean = false) {
	const getType = isMovie ? "movie" : "tv";
	const url: string = `https://api.themoviedb.org/3/${getType}/top_rated?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
		},
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function fetchTrendingMovies(isMovie: boolean = false) {
	const getType = isMovie ? "movie" : "tv";
	const url: string = `https://api.themoviedb.org/3/${getType}/popular?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
		},
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

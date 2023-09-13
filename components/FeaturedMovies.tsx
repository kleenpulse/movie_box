import axios from "axios";
import { MovieCard } from "./cards/MovieCard";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingAnimation from "./LoadingAnimation";

const baseUrl = "http://image.tmdb.org/t/p";
export default function FeaturedMovies() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
			},
		};
		const fetchDetails = async () => {
			try {
				await axios
					.request(options)
					.then(function (response) {
						console.log(response.data);
						setMovies(response.data.results);
					})
					.catch(function (error) {
						console.error(error);
					});
			} catch (error) {
				console.error(error);
			}
		};
		fetchDetails();
	}, []);

	return (
		<section className="max-container pt-6 px-6 xl:px-12 min-h-screen w-full flex justify-center items-center flex-col pb-6">
			<div className="flex w-full justify-between items-center">
				<p className="font-bold text-[2.25rem] text-slate-800 ">
					Featured Movies
				</p>
				<Link
					href={"/movies"}
					className="flex items-center gap-2 text-rose-700  text-[1.25rem]"
				>
					See more <span>&gt;</span>
				</Link>
			</div>

			{!movies ? (
				<LoadingAnimation text="Loading Movies..." />
			) : (
				<div className=" pl-3  mt-12 grid grid-cols-1 gap-6  lg:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 relative w-full">
					{movies.slice(0, 10).map((movie: any) => (
						<MovieCard
							key={movie.id}
							poster={`${baseUrl}/w300${movie.poster_path}`}
							title={movie.title}
							release_date={movie.release_date}
							overview={movie.overview}
							imdb={movie.vote_average}
							tags={movie.genre_ids}
							movieId={movie.id}
						/>
					))}
				</div>
			)}
		</section>
	);
}
